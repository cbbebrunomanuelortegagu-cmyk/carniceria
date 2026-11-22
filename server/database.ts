import { createPool, Pool } from 'mysql2/promise';
import { loadServerConfig } from './config';

let pool: Pool | undefined;

export function getDatabasePool(): Pool {
  if (pool) return pool;

  const { database } = loadServerConfig();
  pool = createPool({
    host: database.host,
    port: database.port,
    database: database.name,
    user: database.user,
    password: database.password,
    ssl: database.ssl ? {} : undefined,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });
  return pool;
}

export async function closeDatabasePool(): Promise<void> {
  if (!pool) return;
  const currentPool = pool;
  pool = undefined;
  await currentPool.end();
}
