import type { GraphQLSchema } from 'graphql';
import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

function capitalizeDirective(directiveName: string): (_schema: GraphQLSchema) => GraphQLSchema {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD](fieldConfig) {
        const capitalizeDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (capitalizeDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            async resolve(source, args, context, info) {
              const result = await resolve(source, args, context, info);
              if (typeof result === 'string') {
                return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
              }

              return result;
            },
          };
        }
      },
    });
}

export const applyCapitalizeSchemaTransform = capitalizeDirective('capitalize');
