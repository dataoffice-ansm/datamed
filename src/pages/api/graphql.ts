import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { ContextValue } from '../../api/server';
import { server } from '../../api/server';
import { PostgresOperations } from '../../api/datasources/postgres/postgresOperations';

export default startServerAndCreateNextHandler(server, {
  async context(req) {
    const context: ContextValue = {
      dataSources: {
        postgresOperations: new PostgresOperations(),
      },
      req,
      token: req.headers.authorization,
    };
    return context;
  },
});
