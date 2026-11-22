import { RowDataPacket } from 'mysql2';
import { getDatabasePool } from './database';

export interface ConfiguracionPortada {
  imagenRuta: string | null;
  colorFondo: string;
}

interface ConfiguracionPortadaRow extends RowDataPacket {
  imagen_ruta: string | null;
  color_fondo: string;
}

export async function obtenerConfiguracionPortada(): Promise<ConfiguracionPortada> {
  const [rows] = await getDatabasePool().execute<ConfiguracionPortadaRow[]>(
    'SELECT imagen_ruta, color_fondo FROM configuracion_portada WHERE id = 1 LIMIT 1'
  );
  const config = rows[0];

  return {
    imagenRuta: config?.imagen_ruta ?? null,
    colorFondo: config?.color_fondo ?? '#DDF3FF'
  };
}
