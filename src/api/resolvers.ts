import type { Resolvers } from './graphql/__generated__/generated-types';

export const resolvers: Resolvers = {
  Query: {
    async getSpecialityIdByCode(parent, args, context) {
      return context.dataSources.postgresOperations.getSingleSpecialityCodeById(args.cisCode);
    },

    async getSpeciality(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getFullSpecialitiesByIds([
        args.cisId,
      ]);

      return rows[0];
    },

    async getSpecialities(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialities();
      return {
        specialities: rows.map(({ id, name, code, description }) => ({
          id,
          name,
          code,
          description,
        })),
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
  },

  Speciality: {
    async repartitionPerSex(parent, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepSex(parent.id);
    },

    async repartitionPerAge(parent, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepAge(parent.id);
    },

    async substances(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstancesBySpeciality(parent.id);
    },

    async publications(parent, args, context) {
      return context.dataSources.postgresOperations.getPublications(parent.id);
    },

    async medicalErrors(parent, args, context) {
      const populationRepartition =
        await context.dataSources.postgresOperations.getErrorsMedRepPopulation(parent.id);

      const sideEffectsOriginRepartition =
        await context.dataSources.postgresOperations.getErrorsMedicalSideEffectsOrigin(parent.id);

      const natureRepartition =
        await context.dataSources.postgresOperations.getErrorsMedicalNatureRepartition(parent.id);

      return {
        populationRepartition,
        sideEffectsOriginRepartition,
        natureRepartition,
      };
    },

    async rupturesHistory(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialityRupturesHistory(
        parent.id
      );

      return {
        ruptures: rows,
        meta: {
          count: rows.length,
        },
      };
    },
  },

  Substance: {
    async retrieveSpecialities(substance, args, context) {
      const cisIds = await context.dataSources.postgresOperations.getSpecialitiesBySubstance(
        substance.id
      );

      const specialities = await context.dataSources.postgresOperations.getFullSpecialitiesByIds(
        cisIds
      );

      return {
        specialities: specialities.map(({ id, name, code, description }) => ({
          id,
          name,
          code,
          description,
        })),
        meta: {
          count: specialities.length,
        },
      };
    },
    async repartitionPerAge(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepAge(parent.id);
    },
    async repartitionPerSex(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepSex(parent.id);
    },

    async repartitionPerNotifier(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepNotifier(parent.id);
    },

    async repartitionPerPathology(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepPathology(parent.id);
    },

    async totalExposition(parent, args, context) {
      return context.dataSources.postgresOperations.getSubstanceTotalExposition(parent.id);
    },
  },
};
