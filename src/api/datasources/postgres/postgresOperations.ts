import { dbInstance } from './postgreDb';
import type {
  CisExposition,
  GlobalStatistic,
  GlobStaticRepartitionPerNotifier,
  GlobStaticRepartitionPerPathology,
  HltEffect,
  MedicalErrors,
  Publication,
  RepartitionPerGender,
  RepartitionPerGravity,
  RepartitionPerNotifier,
  RepartitionPerPathology,
  RepartitionPerSeriousEffect,
  RepartitionRange,
  RuptureAction,
  RuptureActionRepartition,
  RuptureCauseRepartition,
  RuptureClassificationRepartition,
  RuptureStock,
  RuptureTotalAction,
  RuptureYear,
  Speciality,
  SpecialityRupture,
  SpecialitySubstance,
  Substance,
  TherapeuticClassesRupturesPerYear,
  TherapeuticClassRupture,
  TotalExposition,
} from '../../graphql/__generated__/generated-types';
import {
  getCisExpositionByLevelId,
  getMedicalErrorApparitionStep,
  getMedicalErrorNatureByNatureId,
} from '../../utils/mapping';

export class PostgresOperations {
  async getFullSpecialitiesByCode(cisCodes: string[]): Promise<Speciality[]> {
    const rows = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.cis', 'in', cisCodes)
      .leftJoin('mp_atc as mp_a', 'mp.id', 'mp_a.mp_id')
      .leftJoin('descriptions as d', 'mp.id', 'd.mp_id')
      .leftJoin('marketing_authorization_status as mka_s', 'mka_s.id', 'mp.ma_status_id')
      .leftJoin('marketing_authorization_types as mka_t', 'mka_t.id', 'mp.ma_type_id')
      .leftJoin('laboratories as lab', 'lab.id', 'mp.laboratory_id')
      .leftJoin('mp_exposition as mp_exp', 'mp.id', 'mp_exp.mp_id')
      .leftJoin('pharma_forms as ph_f', 'ph_f.id', 'mp.pharma_form_id')
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
        'ph_f.form as pharmaFormLabel',
        'ph_f.id as pharmaFormId',
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
        pharmaFormId,
        pharmaFormLabel,
      } = row;

      const expositionLevel = getCisExpositionByLevelId(exposition);

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
        pharmaForm: pharmaFormId
          ? {
              id: pharmaFormId,
              name: pharmaFormLabel,
            }
          : null,
        icon: iconId
          ? {
              id: iconId,
              name: iconName,
            }
          : null,
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
              consumption,
              expositionLevel: expositionLevel.level,
              description: expositionLevel.description,
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

  async getSpecialityDosageIndication(cisId: number): Promise<string | null> {
    const row = await dbInstance
      .selectFrom('mp_substances as mp')
      .where('mp.mp_id', '=', cisId)
      .leftJoin('ref_dosages as ref_d', 'ref_d.id', 'mp.ref_dosage_id')
      .select(['ref_d.label'])
      .executeTakeFirst();

    if (row) {
      const { label } = row;
      return label;
    }

    return null;
  }

  async getSpecialitySubstancesDosages(cisId: number): Promise<SpecialitySubstance[]> {
    const rows = await dbInstance
      .selectFrom('mp_substances as mp')
      .where('mp.mp_id', '=', cisId)
      .leftJoin('substances as sub', 'sub.id', 'mp.substance_id')
      .select(['mp.substance_id as id', 'mp.dosage', 'sub.code as code', 'sub.name as name'])
      .execute();

    return rows.reduce<SpecialitySubstance[]>((carry, row) => {
      const { id, code, name, dosage } = row;
      return id !== null && code && name
        ? [
            ...carry,
            {
              id,
              code,
              name,
              dosage,
            },
          ]
        : carry;
    }, []);
  }

  async getSpecialityRepGender(cisId: number): Promise<RepartitionPerGender | null> {
    const rows = await dbInstance
      .selectFrom('mp_patient_sex')
      .where('mp_id', '=', cisId)
      .select(['id', 'sex', 'patients_consumption', 'patients_percentage'])
      .execute();

    const male = rows.find((row) => row.sex === 1);
    const female = rows.find((row) => row.sex === 2);

    return {
      male: {
        value: male ? Math.round(male.patients_consumption ?? 0) : null,
        valuePercent: male ? Math.round(male.patients_percentage ?? 0) : null,
      },
      female: {
        value: female ? Math.round(female.patients_consumption ?? 0) : null,
        valuePercent: female ? Math.round(female.patients_percentage ?? 0) : null,
      },
    };
  }

  async getSpecialityRepAge(cisId: number): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('mp_patient_ages as mp_a')
      .where('mp_a.mp_id', '=', cisId)
      .leftJoin('ages', 'ages.id', 'mp_a.age_id')
      .select(['mp_a.patients_consumption', 'mp_a.patients_percentage', 'ages.range'])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { range, patients_consumption, patients_percentage } = row;

      return range
        ? [
            ...carry,
            {
              range,
              value: Math.round(patients_consumption ?? 0),
              valuePercent: (patients_percentage ?? 0).toFixed(2),
            },
          ]
        : carry;
    }, []);
  }

  async getErrorsMedRepPopulation(cisId: number): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('error_med_population as err')
      .leftJoin('population_errors as pop', 'pop.id', 'err.population_error_id')
      .where('err.mp_id', '=', cisId)
      .select(['err.number', 'err.percentage', 'pop.label as range'])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { range, number, percentage } = row;

      return range
        ? [
            ...carry,
            {
              range,
              value: Math.round(number ?? 0),
              valuePercent: (percentage ?? 0).toFixed(2),
            },
          ]
        : carry;
    }, []);
  }

  async getErrorsMedicalSideEffectsOrigin(
    cisId: number
  ): Promise<MedicalErrors['sideEffectsOriginRepartition'] | null> {
    const rows = await dbInstance
      .selectFrom('error_med_side_effect as err')
      .leftJoin('side_effects as side', 'side.id', 'err.side_effect_id')
      .where('err.mp_id', '=', cisId)
      .select(['err.number', 'err.percentage', 'side.id'])
      .execute();

    const withSideEffect = rows.find((row) => row.id === 2);
    const withoutSideEffect = rows.find((row) => row.id === 1);

    return {
      with: {
        value: withSideEffect ? Math.round(withSideEffect.number ?? 0) : null,
        valuePercent: withSideEffect ? Math.round(withSideEffect.percentage ?? 0) : null,
      },
      without: {
        value: withoutSideEffect ? Math.round(withoutSideEffect.number ?? 0) : null,
        valuePercent: withoutSideEffect ? Math.round(withoutSideEffect.percentage ?? 0) : null,
      },
    };
  }

  async getErrorsMedicalApparitionStepRepartition(cisId: number): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('error_med_initial as err')
      .leftJoin('initial_errors as ini', 'ini.id', 'err.initial_error_id')
      .where('err.mp_id', '=', cisId)
      .select(['ini.id as apparitionId', 'err.number as value', 'err.percentage as valuePercent'])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { apparitionId, value, valuePercent } = row;

      const { step, description } = getMedicalErrorApparitionStep(apparitionId ?? 0);

      // eslint-disable-next-line no-negated-condition
      return apparitionId !== null
        ? [
            ...carry,
            {
              id: apparitionId,
              range: step,
              description,
              value: Math.round(value ?? 0),
              valuePercent: (valuePercent ?? 0).toFixed(2),
            },
          ]
        : carry;
    }, []);
  }

  async getErrorsMedicalNatureRepartition(cisId: number): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('error_med_nature as err')
      .leftJoin('nature_errors as nat', 'nat.id', 'err.nature_error_id')
      .where('err.mp_id', '=', cisId)
      .select([
        'nat.id as natureId',
        'nat.label as description',
        'err.number as value',
        'err.percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { natureId, description, value, valuePercent } = row;
      // eslint-disable-next-line no-negated-condition
      return natureId !== null
        ? [
            ...carry,
            {
              id: natureId,
              description,
              range: getMedicalErrorNatureByNatureId(natureId),
              value: Math.round(value ?? 0),
              valuePercent: (valuePercent ?? 0).toFixed(2),
            },
          ]
        : carry;
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

  async getSpecialityPublications(cisId: number): Promise<Publication[]> {
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

  // SUBSTANCES //

  async getSubstancesBySpeciality(cisId: number): Promise<Substance[]> {
    const rows = await dbInstance
      .selectFrom('mp_substances as mp')
      .where('mp.mp_id', '=', cisId)
      .leftJoin('substances as sub', 'sub.id', 'mp.substance_id')
      .select(['sub.id', 'sub.name', 'sub.code'])
      .distinct()
      .execute();

    return rows.reduce<Substance[]>((carry, row) => {
      const { id, name, code } = row;
      return id !== null && name && code
        ? [
            ...carry,
            {
              id,
              code,
              name,
            },
          ]
        : carry;
    }, []);
  }

  async getSpecialitiesCodeBySubstance(subId: number): Promise<string[]> {
    const rows = await dbInstance
      .selectFrom('mp_substances as mp_s')
      .where('mp_s.substance_id', '=', subId)
      .leftJoin('medicinal_products as mp', 'mp.id', 'mp_s.mp_id')
      .select(['mp.cis'])
      .execute();

    return rows.reduce<string[]>((carry, row) => {
      const { cis } = row;
      return cis ? [...carry, cis] : carry;
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

  async getSubstanceRepGender(subId: number): Promise<RepartitionPerGender> {
    const rows = await dbInstance
      .selectFrom('substances_case_sex')
      .where('substance_id', '=', subId)
      .select(['id', 'sex', 'case_percentage', 'nb_cases'])
      .execute();

    const male = rows.find((row) => row.sex === 'Homme');
    const female = rows.find((row) => row.sex === 'Femme');

    return {
      male: male
        ? {
            value: Math.round(male.nb_cases ?? 0),
            valuePercent: Math.round(male.case_percentage ?? 0),
          }
        : null,
      female: female
        ? {
            value: Math.round(female.nb_cases ?? 0),
            valuePercent: Math.round(female.case_percentage ?? 0),
          }
        : null,
    };
  }

  async getSubstanceRepAge(subId: number): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('substances_patient_age as s_p_a')
      .where('s_p_a.substance_id', '=', subId)
      .leftJoin('ages', 'ages.id', 's_p_a.age_id')
      .select([
        'ages.range',
        's_p_a.patients_percentage as percentage',
        's_p_a.patients_consumption as consumption',
      ])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { range, consumption, percentage } = row;
      return range
        ? [
            ...carry,
            {
              range,
              value: Math.round(consumption ?? 0),
              valuePercent: (percentage ?? 0).toFixed(2),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepNotifier(subId: number): Promise<RepartitionPerNotifier[]> {
    const rows = await dbInstance
      .selectFrom('substances_notif as sn')
      .where('sn.substance_id', '=', subId)
      .leftJoin('notifiers', 'notifiers.id', 'sn.notifier_id')
      .select([
        'notifiers.id',
        'notifiers.job',
        'sn.notification_number as value',
        'sn.notification_percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<RepartitionPerNotifier[]>((carry, row) => {
      const { id, job, value, valuePercent } = row;
      return id !== null && job
        ? [
            ...carry,
            {
              id,
              job,
              value: Math.round(value ?? 0),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepPathology(subId: number): Promise<RepartitionPerPathology[]> {
    const rows = await dbInstance
      .selectFrom('substances_soclong as s_s')
      .where('s_s.substance_id', '=', subId)
      .leftJoin('soc_longs as soc', 'soc.id', 's_s.soc_long_id')
      .select([
        'soc.id',
        'soc.soc as range',
        's_s.n_case_effect as value',
        's_s.case_percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<RepartitionPerPathology[]>((carry, row) => {
      const { id, range, value, valuePercent } = row;
      return id !== null && range && value && valuePercent
        ? [
            ...carry,
            {
              id,
              subId,
              range,
              value,
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceRepPathologyEffects(
    subId: number,
    repartitionPerPathologyId: number
  ): Promise<HltEffect[]> {
    const rowsHltEffects = await dbInstance
      .selectFrom('substances_hlt as s_htl')
      .where('s_htl.substance_id', '=', subId)
      .leftJoin('hlt_effects as hlt_e', 'hlt_e.id', 's_htl.hlt_effect_id')
      .select([
        'hlt_e.id',
        'hlt_e.effect as range',
        's_htl.case_percentage as valuePercent',
        's_htl.n_decla_eff_hlt as value',
      ])
      .execute();

    const effects = rowsHltEffects.reduce<HltEffect[]>((carry, row) => {
      const { id, range, value, valuePercent } = row;
      return id !== null && range && value
        ? [
            ...carry,
            {
              id,
              range,
              value: Math.round(value ?? 0),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);

    return effects.filter((e) => e.id === repartitionPerPathologyId);
  }

  async getSubstanceTotalExposition(subId: number): Promise<TotalExposition> {
    const { min, max } = dbInstance.fn;
    const row = await dbInstance
      .selectFrom('substances_exposition')
      .where('substance_id', '=', subId)
      .select([min('year').as('minYear'), max('year').as('maxYear')])
      .executeTakeFirst();

    const subCases = await dbInstance
      .selectFrom('substances_cases')
      .where('substance_id', '=', subId)
      .select('nb_cases as nbCases')
      .executeTakeFirst();

    if (row) {
      const { minYear, maxYear } = row;

      return {
        total: subCases?.nbCases ?? 0,
        minYear: minYear as number,
        maxYear: maxYear as number,
      };
    }

    return {
      total: 0,
    };
  }

  async getSubstanceCisExposition(subId: number): Promise<CisExposition | null> {
    const row = await dbInstance
      .selectFrom('mp_substances')
      .where('substance_id', '=', subId)
      .leftJoin('mp_exposition as mpe', 'mpe.mp_id', 'mp_substances.mp_id')
      .select(['mpe.consumption_year_trunc as consumption', 'mpe.exposition as exposition'])
      .executeTakeFirst();

    if (row) {
      const { exposition, consumption } = row;
      const { level, description } = getCisExpositionByLevelId(exposition);

      return {
        consumption,
        expositionLevel: level,
        description,
      };
    }

    return null;
  }

  async getGlobalStatisticExposition(): Promise<TotalExposition> {
    const rowTotal = await dbInstance
      .selectFrom('global_se')
      .where('label', '=', 'cas_total')
      .select(['n as total'])
      .executeTakeFirst();

    const rowMinPeriod = await dbInstance
      .selectFrom('global_se')
      .where('label', '=', 'min_annee')
      .select(['n as minYear'])
      .executeTakeFirst();

    const rowMaxPeriod = await dbInstance
      .selectFrom('global_se')
      .where('label', '=', 'max_annee')
      .select(['n as maxYear'])
      .executeTakeFirst();

    if (rowTotal && rowMaxPeriod && rowMinPeriod) {
      const { total } = rowTotal;
      const { minYear } = rowMinPeriod;
      const { maxYear } = rowMaxPeriod;

      return {
        total: total ?? 0,
        minYear,
        maxYear,
      };
    }

    return {
      total: 0,
    };
  }

  async getGlobalStatisticRepGender(): Promise<RepartitionPerGender> {
    const male = await dbInstance
      .selectFrom('global_se_sex')
      .where('label', '=', 'M')
      .select(['n as value', 'pct as valuePercent'])
      .executeTakeFirst();

    const female = await dbInstance
      .selectFrom('global_se_sex')
      .where('label', '=', 'F')
      .select(['n as value', 'pct as valuePercent'])
      .executeTakeFirst();

    return {
      male: male
        ? {
            value: Math.round(Number(male.value)),
            valuePercent: Math.round(Number(male.valuePercent)),
          }
        : null,
      female: female
        ? {
            value: Math.round(Number(female.value)),
            valuePercent: Math.round(Number(female.valuePercent)),
          }
        : null,
    };
  }

  async getGlobalStatisticRepAge(): Promise<RepartitionRange[]> {
    const rows = await dbInstance
      .selectFrom('global_se_ages as gsa')
      .leftJoin('ages', 'gsa.age_id', 'ages.id')
      .select(['ages.id', 'ages.range as range', 'gsa.pct as percentage', 'gsa.n as consumption'])
      .execute();

    return rows.reduce<RepartitionRange[]>((carry, row) => {
      const { range, consumption, percentage } = row;
      return range
        ? [
            ...carry,
            {
              range,
              value: Math.round(Number(consumption)),
              valuePercent: (percentage ?? 0).toFixed(2),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticSeriousEffects(): Promise<RepartitionPerSeriousEffect[]> {
    const rows = await dbInstance
      .selectFrom('global_se_gravity_types as gsg')
      .select(['label as range', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<RepartitionPerSeriousEffect[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && valuePercent
        ? [
            ...carry,
            {
              range,
              value: Math.round(Number(value)),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticGravity(): Promise<RepartitionPerGravity[]> {
    const rows = await dbInstance
      .selectFrom('global_se_grave')
      .select(['label as range', 'n as value', 'pct as valuePercent'])
      .execute();

    return rows.reduce<RepartitionPerGravity[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && valuePercent
        ? [
            ...carry,
            {
              range: range === 'OUI' ? 'Grave' : 'Non grave',
              value: Math.round(Number(value)),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerPathology(): Promise<GlobStaticRepartitionPerPathology[]> {
    const rows = await dbInstance
      .selectFrom('global_se_soc')
      .select(['id', 'label as range', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<GlobStaticRepartitionPerPathology[]>((carry, row) => {
      const { id, range, value, valuePercent } = row;
      return id && range && value && valuePercent
        ? [
            ...carry,
            {
              id,
              range,
              value: Math.round(Number(value)),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerNotifier(): Promise<GlobStaticRepartitionPerNotifier[]> {
    const rows = await dbInstance
      .selectFrom('global_se_notifiers')
      .select(['id', 'label as job', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<GlobStaticRepartitionPerNotifier[]>((carry, row) => {
      const { id, job, value, valuePercent } = row;
      return id && job && value && valuePercent
        ? [
            ...carry,
            {
              id,
              job,
              value: Math.round(value ?? 0),
              valuePercent: Math.round(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatistic(): Promise<GlobalStatistic> {
    return {
      repartitionPerGender: await this.getGlobalStatisticRepGender(),
      repartitionPerAge: await this.getGlobalStatisticRepAge(),
      totalExposition: await this.getGlobalStatisticExposition(),
      repartitionPerSeriousEffect: await this.getGlobalStatisticSeriousEffects(),
      repartitionPerPathology: await this.getGlobalStatisticRepPerPathology(),
      repartitionPerNotifier: await this.getGlobalStatisticRepPerNotifier(),
      repartitionPerGravity: await this.getGlobalStatisticGravity(),
    };
  }

  async getRuptureYears(): Promise<RuptureYear[]> {
    const rowTotal = await dbInstance
      .selectFrom('sold_out_all')
      .select('year')
      .orderBy('year', 'desc')
      .distinct()
      .execute();

    return rowTotal.reduce<RuptureYear[]>((carry, { year }) => {
      if (year) {
        const ruptureYear: RuptureYear = { value: parseInt(year, 10) };
        carry.push(ruptureYear);
      }

      return carry;
    }, []);
  }

  async getRuptureStockTotalExposition(year: number): Promise<RuptureStock> {
    const rows = await dbInstance
      .selectFrom('sold_out_all')
      .where('year', '=', year.toString())
      .select(['num', 'year', 'classification', 'state'])
      .execute();

    return (rows ?? []).reduce(
      (carry, row) => {
        const { classification, state } = row;

        if (classification === 'rupture') {
          carry.nbRupture += 1;
          if (state === 'fermé') {
            carry.nbRuptureClosed += 1;
          }
        }

        if (classification === 'risque') {
          carry.nbRisque += 1;
          if (state === 'fermé') {
            carry.nbRisqueClosed += 1;
          }
        }

        return { ...carry };
      },
      {
        year,
        total: (rows ?? []).length,
        nbRisque: 0,
        nbRupture: 0,
        nbRuptureClosed: 0,
        nbRisqueClosed: 0,
      }
    );
  }

  async getRuptureStockRepartitionPerClassification(): Promise<RuptureClassificationRepartition[]> {
    const { count } = dbInstance.fn;

    const rowsRisque = await dbInstance
      .selectFrom('sold_out_all')
      .select([count('num').as('value'), 'year', 'classification'])
      .where('classification', '=', 'risque')
      .groupBy('year')
      .groupBy('classification')
      .orderBy('year')
      .execute();

    const rowsRupture = await dbInstance
      .selectFrom('sold_out_all')
      .select([count('num').as('value'), 'year', 'classification'])
      .where('classification', '=', 'rupture')
      .groupBy('year')
      .groupBy('classification')
      .orderBy('year')
      .execute();

    const result: RuptureClassificationRepartition[] = [];

    rowsRisque.forEach((row) => {
      const { classification, value, year } = row;
      if (classification && value && year) {
        result.push({
          year: parseInt(year, 10),
          value: parseInt(value as string, 10),
          classification,
        });
      }
    });

    rowsRupture.forEach((row) => {
      const { classification, value, year } = row;
      if (classification && value && year) {
        result.push({
          year: parseInt(year, 10),
          value: parseInt(value as string, 10),
          classification,
        });
      }
    });

    return result;
  }

  async getRuptureStockRepartitionPerCause(
    years: RuptureYear[]
  ): Promise<RuptureCauseRepartition[]> {
    const { count } = dbInstance.fn;

    return Promise.all(
      years.map(async ({ value }) => {
        const year = String(value);
        const rowsTotal = await dbInstance
          .selectFrom('sold_out_all')
          .leftJoin('causes_all as ca', 'sold_out_all.id', 'ca.sold_out_id')
          .leftJoin('causes_types as cat', 'ca.cause_id', 'cat.id')
          .where('sold_out_all.year', '=', year)
          .select([count('sold_out_all.num').as('value')])
          .executeTakeFirst();
        const rows = await dbInstance
          .selectFrom('sold_out_all')
          .leftJoin('causes_all as ca', 'sold_out_all.id', 'ca.sold_out_id')
          .leftJoin('causes_types as cat', 'ca.cause_id', 'cat.id')
          .where('sold_out_all.year', '=', year)
          .select([count('sold_out_all.num').as('value'), 'cat.type'])
          .groupBy('cat.type')
          .execute();
        return {
          year: Number(value),
          causes: rows.map((r) => ({
            range: r.type,
            value: Number(r.value),
          })),
          total: Number(rowsTotal?.value),
        };
      })
    );
  }

  async getRupturesTotalActionByYear(year: string): Promise<number> {
    const { count } = dbInstance.fn;
    const rowTotal = await dbInstance
      .selectFrom('actions')
      .select([count('id').as('value')])
      .where('year', '=', year)
      .distinct()
      .executeTakeFirst();

    return Number(rowTotal?.value);
  }

  async getRuptureActionsByYear(year: string): Promise<RuptureAction[]> {
    const { count } = dbInstance.fn;
    const rows = await dbInstance
      .selectFrom('actions')
      .leftJoin('actions_types as at', 'actions.type_id', 'at.id')
      .select([count('actions.id').as('value'), 'at.type as name'])
      .where('actions.year', '=', year)
      .groupBy('at.type')
      .orderBy('at.type')
      .execute();

    return rows.map((r) => ({
      range: r.name,
      value: Number(r.value),
    }));
  }

  async getRuptureStockRepartitionPerAction(): Promise<RuptureActionRepartition[]> {
    const years = await this.getRuptureYears();
    return Promise.all(
      years.map(async ({ value }) => {
        const year = String(value);
        const total = await this.getRupturesTotalActionByYear(year);
        const actions = await this.getRuptureActionsByYear(year);
        return {
          year: value,
          actions,
          total,
        };
      })
    );
  }

  async getRuptureStockByTherapeuticClass(year: string): Promise<TherapeuticClassRupture[]> {
    const { count } = dbInstance.fn;

    const rowsCis = await dbInstance
      .selectFrom('sold_out_all')
      .where('sold_out_all.year', '=', year)
      .where('sold_out_all.classification', 'in', ['risque', 'rupture'])
      .leftJoin('atc_classes', 'atc_classes.code', 'sold_out_all.atc1')
      .where('atc_classes.label', 'is not', null)
      .select([count('sold_out_all.cis').as('value')])
      .distinctOn('sold_out_all.cis')
      .groupBy('sold_out_all.cis')
      .groupBy('atc_classes.label')
      .executeTakeFirst();

    const rows = await dbInstance
      .selectFrom('sold_out_all')
      .where('sold_out_all.year', '=', year)
      .where('sold_out_all.classification', 'in', ['risque', 'rupture'])
      .leftJoin('atc_classes', 'atc_classes.code', 'sold_out_all.atc1')
      .where('atc_classes.label', 'is not', null)
      .select([
        count('sold_out_all.id').as('value'),
        'sold_out_all.year',
        'atc_classes.label as name',
      ])
      .groupBy('sold_out_all.year')
      .groupBy('atc_classes.label')
      .execute();

    return rows.map((r) => ({
      name: r.name,
      value: Number(r.value ?? 0),
      year: Number(r.year ?? 0),
      totalCis: Number(rowsCis?.value ?? 0),
    }));
  }

  async getRupturesPerTherapeuticClassesPerYearRepartition(
    years: RuptureYear[]
  ): Promise<TherapeuticClassesRupturesPerYear[]> {
    return Promise.all(
      years.map(async ({ value }) => {
        const year = String(value);
        const total = await this.getRupturesTotalActionByYear(year);
        const repartition = await this.getRuptureStockByTherapeuticClass(year);
        return {
          year: value,
          repartition,
          total,
        };
      })
    );
  }

  async getRupturesTotalAction(): Promise<RuptureTotalAction[]> {
    const { count } = dbInstance.fn;
    const rows = await dbInstance
      .selectFrom('actions')
      .leftJoin('actions_types as at', 'at.id', 'actions.type_id')
      .select([
        count('actions.id').as('value'),
        'actions.year',
        'at.id as actionTypeId',
        'at.type as name',
      ])
      .groupBy('actions.with_action')
      .groupBy('actions.year')
      .groupBy('at.type')
      .groupBy('at.id')
      .execute();

    // 0 = "Pas de mesure"
    const totalWithAtLeastOneAction = rows.filter((r) => r.actionTypeId !== 0).length ?? 0;

    return rows.map((r) => ({
      total: Number(r.value ?? 0),
      totalWithAtLeastOneAction,
      year: Number(r.year ?? 0),
    }));
  }
}
