import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { ContextValue } from '../../api/graphql/server';
import { server } from '../../api/graphql/server';
import { PostgresDb } from '../../api/datasources/postgres/PostgresClass';

export default startServerAndCreateNextHandler(server, {
  async context(req) {
    const context: ContextValue = {
      dataSources: {
        postgresDB: new PostgresDb(),
      },
      req,
      token: req.headers.authorization,
    };
    return context;
  },
});
