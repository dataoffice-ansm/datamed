import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import { readFileSync } from 'fs';
import type { PostgresOperations } from './datasources/postgres/postgresOperations';
import type { NextApiRequest } from 'next';

export type ContextValue = {
  dataSources: {
    postgresOperations: PostgresOperations;
  };
  // for later usage maybe
  req: NextApiRequest;
  token?: string;
};

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./src/api/graphql/schema/schema.graphql', { encoding: 'utf-8' });

export const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});
