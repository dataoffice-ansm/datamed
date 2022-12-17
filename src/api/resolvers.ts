import type { Resolvers } from './graphql/__generated__/generated-types';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const users = [{ id: 1, username: 'beta', password: 'dem0_123' }];

export const resolvers: Resolvers = {
  Mutation: {
    login(parent, args) {
      const matchUser = users.find(
        (u) => u.username === args.username && u.password === args.password
      );

      if (matchUser && config?.ssr?.jwtToken) {
        const token = jwt.sign({ username: matchUser.username }, config?.ssr?.jwtToken, {
          expiresIn: '1d',
        });

        return {
          token,
        };
      }

      return null;
    },
  },
  Query: {
    async getSpecialityIdByCode(parent, args, context) {
      return context.dataSources.postgresOperations.getSingleSpecialityCodeById(args.cisCode);
    },

    async getSpeciality(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getFullSpecialitiesByCode([
        args.cisCode,
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

    async getGlobalStatistic(parent, args, context) {
      return context.dataSources.postgresOperations.getGlobalStatistic();
    },

    async getGlobalRuptures(parent, args, context) {
      const years = await context.dataSources.postgresOperations.getRuptureYears();

      return {
        ruptureYears: years,
        ruptureStocks: await Promise.all(
          years.map(async ({ value }) =>
            context.dataSources.postgresOperations.getRuptureStockTotalExposition(value ?? 0)
          )
        ),

        repartitionPerClassification:
          await context.dataSources.postgresOperations.getRuptureStockRepartitionPerClassification(),

        repartitionPerTherapeuticClass:
          await context.dataSources.postgresOperations.getRupturesPerTherapeuticClassesPerYearRepartition(
            years
          ),

        repartitionPerCause:
          await context.dataSources.postgresOperations.getRuptureStockRepartitionPerCause(years),

        repartitionPerAction:
          await context.dataSources.postgresOperations.getRuptureStockRepartitionPerAction(),

        totalAction: await context.dataSources.postgresOperations.getRupturesTotalAction(),
      };
    },
  },

  Speciality: {
    async substances(speciality, args, context) {
      return context.dataSources.postgresOperations.getSubstancesBySpeciality(speciality.id);
    },

    async dosageIndication(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialityDosageIndication(speciality.id);
    },

    async dosageSubstances(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialitySubstancesDosages(speciality.id);
    },

    async repartitionPerGender(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepGender(speciality.id);
    },

    async repartitionPerAge(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialityRepAge(speciality.id);
    },

    async publications(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialityPublications(speciality.id);
    },

    async medicalErrors(speciality, args, context) {
      const populationRepartition =
        await context.dataSources.postgresOperations.getErrorsMedRepPopulation(speciality.id);

      const sideEffectsOriginRepartition =
        await context.dataSources.postgresOperations.getErrorsMedicalSideEffectsOrigin(
          speciality.id
        );

      const apparitionStepRepartition =
        await context.dataSources.postgresOperations.getErrorsMedicalApparitionStepRepartition(
          speciality.id
        );

      const natureRepartition =
        await context.dataSources.postgresOperations.getErrorsMedicalNatureRepartition(
          speciality.id
        );

      return {
        populationRepartition,
        sideEffectsOriginRepartition,
        apparitionStepRepartition,
        natureRepartition,
      };
    },

    async rupturesHistory(speciality, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialityRupturesHistory(
        speciality.id
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
      const cisCodes = await context.dataSources.postgresOperations.getSpecialitiesCodeBySubstance(
        substance.id
      );

      const specialities = await context.dataSources.postgresOperations.getFullSpecialitiesByCode(
        cisCodes
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

    async repartitionPerAge(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepAge(substance.id);
    },

    async repartitionPerGender(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepGender(substance.id);
    },

    async repartitionPerNotifier(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepNotifier(substance.id);
    },

    async repartitionPerPathology(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepPathology(substance.id);
    },

    async totalExposition(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceTotalExposition(substance.id);
    },

    async exposition(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceCisExposition(substance.id);
    },
  },

  RepartitionPerPathology: {
    async htlEffects(pathologyRep, args, context) {
      return context.dataSources.postgresOperations.getSubstanceRepPathologyEffects(
        pathologyRep.subId,
        pathologyRep.id
      );
    },
  },
};
