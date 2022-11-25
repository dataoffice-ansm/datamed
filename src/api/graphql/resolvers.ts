// This is the file where our generated types live (specified in our `codegen.yml` file)
import type {
  Icon,
  Resolvers,
  SpecialitiesReturn,
  Speciality,
  Substance,
  SubstancesReturn,
} from './__generated__/generated-types';

export const resolvers: Resolvers = {
  Query: {
    async getSpeciality(parent, args, context) {
      return (await context.dataSources.postgresDB.getSingleSpeciality(args.cisId)) as Speciality;
    },
    async getSpecialities(parent, args, context) {
      const rows = await context.dataSources.postgresDB.getSpecialities();
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        specialities: rows,
        meta: {
          count: rows.length,
        },
      } as SpecialitiesReturn;
    },
    async getSubstance(parent, args, context) {
      return (await context.dataSources.postgresDB.getSingleSubstance(args.subCodeId)) as Substance;
    },

    async getSubstances(parent, args, context) {
      const rows = await context.dataSources.postgresDB.getSubstances();
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        substances: rows,
        meta: {
          count: rows.length,
        },
      } as SubstancesReturn;
    },
  },

  Speciality: {
    async substances(parent, args, context) {
      return (await context.dataSources.postgresDB.getSpecialitySubstances(
        parent.id
      )) as Substance[];
    },

    async icon(parent, args, context) {
      return (
        parent.iconId ? await context.dataSources.postgresDB.getIcon(parent.iconId) : null
      ) as Icon;
    },
  },
};
