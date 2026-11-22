import 'dotenv/config';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { closeDatabasePool } from './server/database';
import { listarCatalogoPublico } from './server/catalogo-publico.repository';
import { obtenerConfiguracionPortada } from './server/portada.repository';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  const catalogImageDirectory = resolve(
    process.cwd(),
    process.env['CATALOG_IMAGE_DIR'] || 'uploads/catalogo'
  );
  server.use(
    '/uploads/catalogo',
    express.static(catalogImageDirectory, { maxAge: '1d' })
  );

  const heroImageDirectory = resolve(
    process.cwd(),
    process.env['HERO_IMAGE_DIR'] || 'uploads/portada'
  );
  server.use('/uploads/portada', express.static(heroImageDirectory, { maxAge: '1d' }));

  server.get('/api/configuracion-portada', async (_req, res) => {
    try {
      return res.json(await obtenerConfiguracionPortada());
    } catch {
      console.error('No se pudo consultar la configuración de portada en MySQL.');
      return res.status(503).json({ error: 'La portada no está disponible en este momento.' });
    }
  });

  server.get('/api/catalogo-publico', async (_req, res) => {
    try {
      const productos = await listarCatalogoPublico();
      return res.json(productos);
    } catch {
      console.error('No se pudo consultar el catálogo público en MySQL.');
      return res.status(503).json({
        error: 'El catálogo no está disponible en este momento.'
      });
    }
  });

  server.get('/uploads/catalogo/*', (_req, res) => res.sendStatus(404));
  server.get('/uploads/portada/*', (_req, res) => res.sendStatus(404));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  const httpServer = server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  const shutdown = () => {
    httpServer.close(() => {
      void closeDatabasePool().finally(() => process.exit(0));
    });
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

run();
