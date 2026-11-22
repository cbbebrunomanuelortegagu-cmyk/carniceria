export interface ServerConfig {
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    ssl: boolean;
  };
}

/** Lee y valida la configuración exclusivamente del entorno del servidor. */
export function loadServerConfig(
  environment: NodeJS.ProcessEnv = process.env
): ServerConfig {
  const required = [
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_USER',
    'DATABASE_PASSWORD'
  ] as const;
  const missing = required.filter((key) => !environment[key]?.trim());
  if (missing.length > 0) {
    throw new Error(`Falta configurar el entorno del servidor: ${missing.join(', ')}.`);
  }

  const port = Number(environment['DATABASE_PORT'] || 3306);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DATABASE_PORT debe ser un puerto válido.');
  }

  return {
    database: {
      host: environment['DATABASE_HOST']!,
      port,
      name: environment['DATABASE_NAME']!,
      user: environment['DATABASE_USER']!,
      password: environment['DATABASE_PASSWORD']!,
      ssl: environment['DATABASE_SSL']?.toLowerCase() === 'true'
    }
  };
}
