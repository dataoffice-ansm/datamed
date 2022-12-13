import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
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
