import type { Resolvers } from './graphql/__generated__/generated-types';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const users = [{ id: 1, username: 'beta', password: 'demo_123' }];

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
    async getSpeciality(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getFullSpecialitiesByCode([
        args.cisCode,
      ]);

      return rows[0];
    },

    async getSpecialities(parent, args, context) {
      const rows = await context.dataSources.postgresOperations.getSpecialities();
      return {
        specialities: rows.map(({ id, name, code }) => ({
          id,
          name,
          code,
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

    async getGlobalShortages(parent, args, context) {
      const period = await context.dataSources.postgresOperations.getTrustMedExpositionPeriod();

      const shortagesPerYear =
        await context.dataSources.postgresOperations.getGlobalShortagesPerYear();

      const shortagesClassesPerYear =
        await context.dataSources.postgresOperations.getGlobalShortagesClass();

      const shortagesCausesPerYear =
        await context.dataSources.postgresOperations.getShortagesCausesPerCause();

      const shortagesAtcPerYear =
        await context.dataSources.postgresOperations.getShortagesAtcPerYear();

      const shortagesMeasuresPerYear =
        await context.dataSources.postgresOperations.getShortagesMeasuresPerYear();

      return {
        period,
        shortagesPerYear,
        shortagesClassesPerYear,
        shortagesCausesPerYear,
        shortagesAtcPerYear,
        shortagesMeasuresPerYear,
      };
    },

    async getGlobalStatistics(parent, args, context) {
      return context.dataSources.postgresOperations.getGlobalStatistics();
    },
  },

  Speciality: {
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

    async substances(speciality, args, context) {
      return context.dataSources.postgresOperations.getSubstancesBySpeciality(speciality.id);
    },

    async publications(speciality, args, context) {
      return context.dataSources.postgresOperations.getSpecialityPublications(speciality.id);
    },

    async medicalErrors(speciality, args, context) {
      const errMedPeriod = await context.dataSources.postgresOperations.getErrMedExpositionPeriod();
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
        errMedPeriod,
        populationRepartition,
        sideEffectsOriginRepartition,
        apparitionStepRepartition,
        natureRepartition,
      };
    },

    async shortagesHistory(speciality, args, context) {
      const trustMedPeriod =
        await context.dataSources.postgresOperations.getTrustMedExpositionPeriod();
      const rows = await context.dataSources.postgresOperations.getSpecialityShortagesHistory(
        speciality.id
      );

      return {
        shortages: rows,
        trustMedPeriod,
        meta: {
          count: rows.length,
        },
      };
    },
  },

  Substance: {
    async exposition(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceExposition(substance.id);
    },

    async repartitionPerAge(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceDeclarationsPerAge(substance.id);
    },

    async repartitionPerGender(substance, args, context) {
      return context.dataSources.postgresOperations.getSubstanceDeclarationsPerGender(substance.id);
    },

    async retrievedSpecialities(substance, args, context) {
      const cisCodes = await context.dataSources.postgresOperations.getCisCodeBySubstanceId(
        substance.id
      );

      const specialities = await context.dataSources.postgresOperations.getFullSpecialitiesByCode(
        cisCodes
      );

      return {
        specialities: specialities.map(({ id, name, code }) => ({
          id,
          name,
          code,
        })),
        meta: {
          count: specialities.length,
        },
      };
    },

    async sideEffects(substance, args, context) {
      const bnpvPeriod = await context.dataSources.postgresOperations.getBNPVExpositionPeriod();
      const declarations =
        await context.dataSources.postgresOperations.getSubstanceSideEffectsDeclarations(
          substance.id
        );

      const repartitionPerGender =
        await context.dataSources.postgresOperations.getSubstanceDeclarationsWithSideEffectsPerGender(
          substance.id
        );

      const repartitionPerAge =
        await context.dataSources.postgresOperations.getSubstanceDeclarationsWithSideEffectsPerAge(
          substance.id
        );

      const repartitionPerNotifier =
        await context.dataSources.postgresOperations.getSubstanceDeclarationsWithSideEffectsPerNotifier(
          substance.id
        );

      const repartitionPerPathology =
        await context.dataSources.postgresOperations.getSubstanceDeclarationsWithSideEffectsPerPathology(
          substance.id
        );

      return {
        bnpvPeriod,
        declarations,
        repartitionPerGender,
        repartitionPerAge,
        repartitionPerNotifier,
        repartitionPerPathology,
      };
    },
  },
};
