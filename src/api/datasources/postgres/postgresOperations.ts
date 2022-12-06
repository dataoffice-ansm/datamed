import { dbInstance } from './postgreDb';
import type {
  MedicalErrors,
  RepartitionPerNotifier,
  RepartitionPerPathology,
  RepartitionPerSex,
  RepartitionTranche,
  Speciality,
  Substance,
  Publication,
  SpecialityRupture,
  TotalExposition,
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

  async getSpecialityRupturesHistory(cisId: number): Promise<SpecialityRupture[]> {
    const rows = await dbInstance
      .selectFrom('sold_out as so')
      .leftJoin('causes as c', 'c.sold_out_id', 'so.id')
      .leftJoin('causes_types as ct', 'ct.id', 'c.cause_id')
      .leftJoin('sold_out_classes as so_c', 'so.classification_id', 'so_c.id')
      .where('so.mp_id', '=', cisId)
      .select([
        'so.id',
        'so.num',
        'so.state',
        'so.date',
        'so.name',
        'so_c.id as classId',
        'ct.id as causeId',
        'ct.type as causeType',
      ])
      .execute();

    const ruptureTypeLabelMapping = {
      0: 'Rupture',
      1: 'Risque de rupture de stock',
      2: null,
      3: 'Arrêt de commercialisation',
      4: 'Autre',
    };

    return rows.reduce<SpecialityRupture[]>((carry, row) => {
      const { id, num, name, state, date, classId, causeId, causeType } = row;

      return id !== null && classId !== null && causeId !== null
        ? [
            ...carry,
            {
              id,
              num,
              name,
              active: state === 'ouvert',
              date: date ? date.toLocaleDateString() : null,
              classification: {
                id: classId,
                name:
                  ruptureTypeLabelMapping[causeId as keyof typeof ruptureTypeLabelMapping] ??
                  ruptureTypeLabelMapping[4],
              },
              cause: {
                id: causeId,
                name: causeType,
              },
            },
          ]
        : carry;
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
      return id !== null && name !== null && code !== null
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
      .select(['p.id', 'p.title as name', 'p.link', 'pt.id as typeId'])
      .execute();

    const publicationsTypeLabelMapping = (publishTypeId: number) => {
      switch (publishTypeId) {
        case 0:
        case 2:
        case 4:
          return "Point d'information";
        case 3:
          return 'Communiqué';
        default:
          return 'Autre';
      }
    };

    return rows.reduce<Publication[]>((carry, row) => {
      const { id, name, link, typeId } = row;
      return id !== null && name && link && typeId
        ? [
            ...carry,
            {
              id,
              name,
              link,
              type: {
                id: typeId,
                name: publicationsTypeLabelMapping(typeId),
              },
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepSex(subCode: number): Promise<RepartitionPerSex> {
    const rows = await dbInstance
      .selectFrom('substances_case_sex')
      .where('substance_id', '=', subCode)
      .select(['id', 'sex', 'case_percentage'])
      .execute();

    const male = rows.find((row) => row.sex === 1);
    const female = rows.find((row) => row.sex === 2);

    return {
      male: male ? Math.round(male.case_percentage ?? 0) : null,
      female: female ? Math.round(female.case_percentage ?? 0) : null,
    };
  }

  async getSubstanceRepAge(subCode: number): Promise<RepartitionTranche[]> {
    const rows = await dbInstance
      .selectFrom('substances_patient_age as s_p_a')
      .where('s_p_a.substance_id', '=', subCode)
      .leftJoin('ages', 'ages.id', 's_p_a.age_id')
      .select(['s_p_a.id', 'ages.range', 's_p_a.patients_percentage as value'])
      .execute();

    return rows.reduce<RepartitionTranche[]>((carry, row) => {
      const { id, range, value } = row;
      return range
        ? [
            ...carry,
            {
              id,
              range,
              value: Math.round(value ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepNotifier(subCode: number): Promise<RepartitionPerNotifier[]> {
    const rows = await dbInstance
      .selectFrom('substances_notif as s_n')
      .where('s_n.substance_id', '=', subCode)
      .leftJoin('notifiers', 'notifiers.id', 's_n.notifier_id')
      .select([
        's_n.id',
        'notifiers.id as idNotifier',
        'notifiers.job',
        's_n.notification_percentage as value',
      ])
      .execute();

    return rows.reduce<RepartitionPerNotifier[]>((carry, row) => {
      const { id, idNotifier, job, value } = row;
      return job
        ? [
            ...carry,
            {
              id,
              job,
              idNotifier,
              value: Math.round(value ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepPathology(subCode: number): Promise<RepartitionPerPathology[]> {
    const rows = await dbInstance
      .selectFrom('substances_soclong as s_s')
      .where('s_s.substance_id', '=', subCode)
      .leftJoin('soc_longs as soc', 'soc.id', 's_s.soc_long_id')
      .select([
        's_s.id',
        'soc.id as idPathology',
        'soc.soc as name',
        's_s.n_case_effect as nbCases',
        's_s.case_percentage as nbPercent',
      ])
      .execute();
    return rows.reduce<RepartitionPerPathology[]>((carry, row) => {
      const { id, idPathology, name, nbCases, nbPercent } = row;
      return name
        ? [
            ...carry,
            {
              id,
              name,
              idPathology,
              nbCases,
              nbPercent: Math.round(nbPercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceTotalExposition(subCode: number): Promise<TotalExposition> {
    const { sum } = dbInstance.fn;
    const rows = await dbInstance
      .selectFrom('substances_exposition')
      .where('substance_id', '=', subCode)
      .select(sum<number>('year_cases').as('total'))
      .executeTakeFirst();

    if (rows) {
      const { total } = rows;
      return {
        total,
      };
    }

    return {
      total: 0,
    };
  }
}
