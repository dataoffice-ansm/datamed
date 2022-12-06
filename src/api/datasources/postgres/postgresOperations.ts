import { dbInstance } from './postgreDb';
import type {
  MedicalErrors,
  RepartitionPerSex,
  RepartitionTranche,
  Speciality,
  Substance,
  Publication,
} from '../../graphql/__generated__/generated-types';

export class PostgresOperations {
  async getSingleSpecialityCodeById(cisCode: string): Promise<number | null> {
    const row = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.cis', '=', cisCode)
      .select(['mp.id'])
      .executeTakeFirst();

    if (row) {
      return row.id;
    }

    return null;
  }

  async getFullSpecialitiesByIds(cisIds: number[]): Promise<Speciality[]> {
    const rows = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.id', 'in', cisIds)
      .leftJoin('mp_atc as mp_a', 'mp.id', 'mp_a.mp_id')
      .leftJoin('descriptions as d', 'mp.id', 'd.mp_id')
      .leftJoin('marketing_authorization_status as mka_s', 'mka_s.id', 'mp.ma_status_id')
      .leftJoin('marketing_authorization_types as mka_t', 'mka_t.id', 'mp.ma_type_id')
      .leftJoin('laboratories as lab', 'lab.id', 'mp.laboratory_id')
      .leftJoin('mp_exposition as mp_exp', 'mp.id', 'mp_exp.mp_id')
      .leftJoin('icons as i', 'mp.icon_id', 'i.id')
      .select([
        'mp.id',
        'mp.cis as code',
        'mp.name',
        'mp_a.id as atcId',
        'mp_a.atc as actCode',
        'mp_a.atc_name as atcName',
        'mka_s.status as commercialisationState',
        'mka_t.type as commercialisationType',
        'lab.id as laboratoryId',
        'lab.name as laboratoryName',
        'mp.icon_id as iconId',
        'mp_exp.exposition as expositionId',
        'mp_exp.consumption_year_trunc as consumption',
        'mp_exp.exposition as exposition',
        'i.name as iconName',
        'd.description',
      ])
      .execute();

    return rows.map((row) => {
      const {
        id,
        code,
        name,
        atcId,
        actCode,
        atcName,
        iconId,
        iconName,
        description,
        commercialisationState,
        commercialisationType,
        laboratoryId,
        laboratoryName,
        expositionId,
        consumption,
        exposition,
      } = row;

      return {
        id,
        code,
        name,
        atc: atcId
          ? {
              id: atcId,
              code: actCode,
              name: atcName,
            }
          : null,
        icon: iconId
          ? {
              id: iconId,
              name: iconName,
            }
          : null,
        iconId,
        description,
        commercialisationState,
        commercialisationType,
        laboratory: laboratoryId
          ? {
              id: laboratoryId,
              name: laboratoryName,
            }
          : null,
        exposition: expositionId
          ? {
              id: expositionId,
              expositionLevel: exposition ?? 0,
              consumption,
            }
          : null,
      };
    });
  }

  async getSpecialities(): Promise<Speciality[]> {
    const rows = await dbInstance.selectFrom('medicinal_products').selectAll().execute();

    return rows.map(({ id, name, cis: code, icon_id: iconId }) => ({
      id,
      code,
      name,
      iconId,
    }));
  }

  async getSpecialityRepSex(cisId: number): Promise<RepartitionPerSex | null> {
    const rows = await dbInstance
      .selectFrom('mp_patient_sex')
      .where('mp_id', '=', cisId)
      .select(['id', 'sex', 'patients_percentage'])
      .execute();

    const male = rows.find((row) => row.sex === 1);
    const female = rows.find((row) => row.sex === 2);

    return male && female
      ? {
          male: Math.round(male.patients_percentage ?? 0),
          female: Math.round(female.patients_percentage ?? 0),
        }
      : null;
  }

  async getErrorsMedRepPopulation(cisId: number): Promise<RepartitionTranche[]> {
    const rows = await dbInstance
      .selectFrom('error_med_population as err')
      .leftJoin('population_errors as pop', 'pop.id', 'err.population_error_id')
      .where('mp_id', '=', cisId)
      .select(['err.id', 'err.percentage as value', 'pop.label as range'])
      .execute();

    return rows.reduce<RepartitionTranche[]>((carry, row) => {
      const { id, range, value } = row;
      return [
        ...carry,
        {
          id,
          range,
          value: Math.round(value ?? 0),
        },
      ];
    }, []);
  }

  async getErrorsMedicalSideEffectsOrigin(
    cisId: number
  ): Promise<MedicalErrors['sideEffectsOriginRepartition'] | null> {
    const rows = await dbInstance
      .selectFrom('error_med_side_effect as err')
      .leftJoin('side_effects as side', 'side.id', 'err.side_effect_id')
      .where('mp_id', '=', cisId)
      .select(['err.percentage as value', 'side.id as id', 'side.label as range'])
      .execute();

    const withSideEffect = rows.find((row) => row.id === 1);
    const withoutSideEffect = rows.find((row) => row.id === 0);

    return withSideEffect && withoutSideEffect
      ? {
          with: {
            ...withSideEffect,
            value: Math.round(withSideEffect.value ?? 0),
          },
          without: {
            ...withoutSideEffect,
            value: Math.round(withoutSideEffect.value ?? 0),
          },
        }
      : null;
  }

  async getErrorsMedicalNatureRepartition(cisId: number): Promise<RepartitionTranche[]> {
    const rows = await dbInstance
      .selectFrom('error_med_nature as err')
      .leftJoin('nature_errors as nat', 'nat.id', 'err.nature_error_id')
      .where('mp_id', '=', cisId)
      .select(['nat.id', 'err.percentage as value', 'nat.label as range'])
      .execute();

    return rows.reduce<RepartitionTranche[]>((carry, row) => {
      const { id, range, value } = row;
      return [
        ...carry,
        {
          id,
          range,
          value: Math.round(value ?? 0),
        },
      ];
    }, []);
  }

  async getSpecialityRepAge(cisId: number): Promise<RepartitionTranche[]> {
    const rows = await dbInstance
      .selectFrom('mp_patient_ages as mp_a')
      .where('mp_id', '=', cisId)
      .leftJoin('ages', 'ages.id', 'mp_a.age_id')
      .select(['mp_a.id', 'ages.range', 'mp_a.patients_percentage as value'])
      .execute();

    return rows.reduce<RepartitionTranche[]>((carry, row) => {
      const { id, range, value } = row;
      return [
        ...carry,
        {
          id,
          range,
          value: Math.round(value ?? 0),
        },
      ];
    }, []);
  }

  async getSubstancesBySpeciality(cisId: number): Promise<Substance[]> {
    const rows = await dbInstance
      .selectFrom('mp_substances as mp')
      .where('mp.mp_id', '=', cisId)
      .leftJoin('substances as sub', 'sub.id', 'mp.substance_id')
      .leftJoin('pharma_forms as ph', 'ph.id', 'mp.pharma_form_id')
      .select(['sub.id', 'sub.name', 'sub.code', 'ph.form as pharmaForm', 'mp.dosage'])
      .execute();

    return rows.reduce<Substance[]>((carry, row) => {
      const { id, name, code, pharmaForm, dosage } = row;
      return id && name && code
        ? [
            ...carry,
            {
              id,
              name,
              code,
              pharmaForm,
              dosage,
            },
          ]
        : carry;
    }, []);
  }

  async getSpecialitiesBySubstance(subId: number): Promise<number[]> {
    const rows = await dbInstance
      .selectFrom('mp_substances as mp_s')
      .where('mp_s.substance_id', '=', subId)
      .leftJoin('medicinal_products as mp', 'mp.id', 'mp_s.mp_id')
      .select(['mp.id'])
      .execute();

    return rows.reduce<number[]>((carry, row) => {
      const { id } = row;
      return id ? [...carry, id] : carry;
    }, []);
  }

  async getSingleSubstance(subCodeId: string): Promise<Substance | null> {
    const row = await dbInstance
      .selectFrom('substances')
      .where('code', '=', subCodeId)
      .selectAll()
      .executeTakeFirst();

    if (row) {
      const { id, name, code } = row;
      return {
        id,
        code,
        name,
      };
    }

    return null;
  }

  async getSubstances(): Promise<Substance[]> {
    const rows = await dbInstance.selectFrom('substances').selectAll().execute();

    return rows.map(({ id, name, code }) => ({
      id,
      code,
      name,
    }));
  }

  async getPublications(cisId: number): Promise<Publication[]> {
    const rows = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.id', '=', cisId)
      .leftJoin('publications as p', 'p.mp_id', 'mp.id')
      .leftJoin('publication_types as pt', 'pt.id', 'p.type_id')
      .select(['p.id', 'p.title as name', 'p.link', 'pt.type', 'pt.id as typeId'])
      .execute();

    return rows.reduce<Publication[]>((carry, row) => {
      const { id, name, link, type, typeId } = row;
      return id && name && link && type && typeId
        ? [
            ...carry,
            {
              id,
              name,
              link,
              type,
              typeId,
            },
          ]
        : carry;
    }, []);
  }
}
