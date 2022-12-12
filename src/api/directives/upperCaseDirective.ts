import type { GraphQLSchema } from 'graphql';
import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

function upperDirective(directiveName: string): (_schema: GraphQLSchema) => GraphQLSchema {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD](fieldConfig) {
        const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (upperDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            async resolve(source, args, context, info) {
              const result = await resolve(source, args, context, info);
              if (typeof result === 'string') {
                return result.toUpperCase();
              }

              return result;
            },
          };
        }
      },
    });
}

export const applyUpperSchemaTransform = upperDirective('uppercase');
