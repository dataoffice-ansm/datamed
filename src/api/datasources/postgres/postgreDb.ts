import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from './schema.introspection';
import { config } from '../../../config/config';

export const dbInstance = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: async () =>
      new Pool({
        connectionString: config.ssr?.dbUrl,
        ssl: config.ssr?.dbEnableSsl ? { rejectUnauthorized: false } : false,
      }),
  }),
  log: [
    //'query',
    'error',
  ],
});
