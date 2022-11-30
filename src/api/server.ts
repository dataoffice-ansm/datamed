import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import { readFileSync } from 'fs';
import type { PostgresOperations } from './datasources/postgres/postgresOperations';
import type { NextApiRequest } from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyUpperSchemaTransform } from './directives/upperCaseDirective';
import { applyLowerSchemaTransform } from './directives/lowerCaseDirective';
import { applyCapitalizeSchemaTransform } from './directives/capitalizeDirective';
import { unwrapResolverError, ApolloServerErrorCode } from '@apollo/server/errors';

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

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = applyUpperSchemaTransform(schema);
schema = applyLowerSchemaTransform(schema);
schema = applyCapitalizeSchemaTransform(schema);

export const server = new ApolloServer<ContextValue>({
  schema,
  formatError(formattedError, _error) {
    if (formattedError.message.startsWith('Database Error: ')) {
      return { message: 'Internal server error' };
    }

    // Return a different error message
    if (formattedError?.extensions?.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
      return {
        ...formattedError,
        message: "Your query doesn't match the schema. Try double-checking it!",
      };
    }

    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
  },
});
