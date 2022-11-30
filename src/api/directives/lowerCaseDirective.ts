import type { GraphQLSchema } from 'graphql';
import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

function lowerDirective(directiveName: string): (schema: GraphQLSchema) => GraphQLSchema {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD](fieldConfig) {
        const lowerDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (lowerDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            async resolve(source, args, context, info) {
              const result = await resolve(source, args, context, info);
              if (typeof result === 'string') {
                return result.toLowerCase();
              }

              return result;
            },
          };
        }
      },
    });
}

export const applyLowerSchemaTransform = lowerDirective('lowercase');
