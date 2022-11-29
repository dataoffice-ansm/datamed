import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/api/graphql/schema/schema.graphql',
  generates: {
    './src/api/graphql/__generated__/generated-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../../server#ContextValue',
      },
      hooks: {
        afterOneFileWrite: ['eslint --fix', 'prettier --write'],
      },
    },
    './src/graphql/__generated__/generated-documents.ts': {
      documents: './src/graphql/**/*.graphql',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      hooks: {
        afterOneFileWrite: ['eslint --fix', 'prettier --write'],
      },
    },
  },
};

export default config;
