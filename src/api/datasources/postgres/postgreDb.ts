import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from './schema.introspection';

export const createDbInstance = (enableSSL: boolean) =>
  new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: enableSSL ? { rejectUnauthorized: false } : false,
      }),
    }),
  });
