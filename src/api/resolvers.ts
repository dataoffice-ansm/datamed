import type { Resolvers } from './graphql/__generated__/generated-types';

export const resolvers: Resolvers = {
  Query: {
    async getSpeciality(parent, args, context) {
      return context.dataSources.postgresOperations.getSingleSpeciality(args.cisCode);
    },
    async getSpecialities(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialities();
      return {
        specialities: rows,
        meta: {
          count: rows.length,
        },
      };
    },
    async getSubstance(parent, args, context) {
      return context.dataSources.postgresOperations.getSingleSubstance(args.subCode);
    },
    async getSubstances(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getSubstances();
      return {
        substances: rows,
        meta: {
          count: rows.length,
        },
      };
    },
    async getSpecialitiesBySubstance(_, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialitiesBySubstance(
        args.subCode
      );
      return {
        specialities: rows,
        meta: {
          count: rows.length,
        },
      };
    },
  },
  Speciality: {
    async repartitionPerSex(parent, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepSex(parent.id);
    },

    async repartitionPerAge(parent, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepAge(parent.id);
    },

    async substances(parent, args, context) {
      return context.dataSources.postgresOperations.getSpecialitySubstances(parent.id);
    },
  },
};
