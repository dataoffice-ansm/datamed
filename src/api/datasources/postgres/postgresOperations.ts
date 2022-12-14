import { dbInstance } from './postgreDb';
import type {
  Cause,
  EntityExpositionPeriod,
  GlobalExpositionPeriod,
  GlobalStatistic,
  GlobalStatsUsagePerAge,
  GlobalStatsUsagePerGravity,
  GlobalStatsUsagePerNotifier,
  GlobalStatsUsagePerPathology,
  GlobalStatsUsagePerSeriousEffect,
  HltEffect,
  MedicalErrors,
  MedicalErrorsApparitionStep,
  MedicalErrorsNature,
  MedicalErrorsPopulation,
  Publication,
  RepartitionPerAge,
  RepartitionPerGender,
  RepartitionPerNotifier,
  RepartitionPerPathology,
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
  SpecialityUsagePerAge,
  Substance,
  SubstanceSideEffectsDeclarations,
  TherapeuticClassesRupturesPerYear,
  TherapeuticClassRupture,
} from '../../graphql/__generated__/generated-types';
import {
  getExpositionByLevelId,
  getCisPharmaFormType,
  getMedicalErrorApparitionStep,
  getPublicationsTypeLabel,
  getRuptureTypeLabel,
} from '../../utils/mapping';
import { roundFloat } from '../../utils/format';

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
        'mp_exp.exposition as expositionCode',
        'mp_exp.consumption_year_trunc as consumption',
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
        iconName,
        description,
        commercialisationState,
        commercialisationType,
        laboratoryId,
        laboratoryName,
        expositionCode,
        consumption,
        pharmaFormId,
        pharmaFormLabel,
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
        pharmaForm:
          pharmaFormId && pharmaFormLabel && iconName
            ? {
                id: pharmaFormId,
                label: pharmaFormLabel,
                type: getCisPharmaFormType(iconName),
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
        exposition:
          expositionCode && consumption && consumption >= 10
            ? {
                consumption,
                expositionCode,
                ...getExpositionByLevelId(expositionCode),
                minYear: 2014,
                maxYear: 2021,
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
        value: Math.round(male?.patients_consumption ?? 0),
        valuePercent: roundFloat(male?.patients_percentage ?? 0),
      },
      female: {
        value: Math.round(female?.patients_consumption ?? 0),
        valuePercent: roundFloat(female?.patients_percentage ?? 0),
      },
    };
  }

  async getSpecialityRepAge(cisId: number): Promise<SpecialityUsagePerAge[]> {
    const rows = await dbInstance
      .selectFrom('mp_patient_ages as mp_a')
      .where('mp_a.mp_id', '=', cisId)
      .leftJoin('ages', 'ages.id', 'mp_a.age_id')
      .select(['mp_a.patients_consumption', 'mp_a.patients_percentage', 'ages.range'])
      .execute();

    return rows.reduce<SpecialityUsagePerAge[]>((carry, row) => {
      const { range, patients_consumption, patients_percentage } = row;

      return range && patients_consumption && patients_percentage
        ? [
            ...carry,
            {
              range,
              value: Math.round(patients_consumption),
              valuePercent: roundFloat(patients_percentage),
            },
          ]
        : carry;
    }, []);
  }

  async getErrorsMedRepPopulation(cisId: number): Promise<MedicalErrorsPopulation[]> {
    const rows = await dbInstance
      .selectFrom('error_med_population as err')
      .leftJoin('population_errors as pop', 'pop.id', 'err.population_error_id')
      .where('err.mp_id', '=', cisId)
      .select(['err.number', 'err.percentage', 'pop.label as range'])
      .execute();

    return rows.reduce<MedicalErrorsPopulation[]>((carry, row) => {
      const { range, number, percentage } = row;

      return range && number && percentage
        ? [
            ...carry,
            {
              range,
              value: Math.round(number),
              valuePercent: roundFloat(percentage),
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
        value: Math.round(withSideEffect?.number ?? 0),
        valuePercent: roundFloat(withSideEffect?.percentage ?? 0),
      },
      without: {
        value: Math.round(withoutSideEffect?.number ?? 0),
        valuePercent: roundFloat(withoutSideEffect?.percentage ?? 0),
      },
    };
  }

  async getErrorsMedicalApparitionStepRepartition(
    cisId: number
  ): Promise<MedicalErrorsApparitionStep[]> {
    const rows = await dbInstance
      .selectFrom('error_med_initial as err')
      .leftJoin('initial_errors as ini', 'ini.id', 'err.initial_error_id')
      .where('err.mp_id', '=', cisId)
      .select([
        'ini.id as stepId',
        'ini.label',
        'err.number as value',
        'err.percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<MedicalErrorsApparitionStep[]>((carry, row) => {
      const { stepId, label, value, valuePercent } = row;

      return stepId && label && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              id: stepId,
              step: getMedicalErrorApparitionStep(stepId),
              label,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getErrorsMedicalNatureRepartition(cisId: number): Promise<MedicalErrorsNature[]> {
    const rows = await dbInstance
      .selectFrom('error_med_nature as err')
      .leftJoin('nature_errors as nat', 'nat.id', 'err.nature_error_id')
      .where('err.mp_id', '=', cisId)
      .select([
        'nat.id as natureId',
        'nat.label as nature',
        'err.number as value',
        'err.percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<MedicalErrorsNature[]>((carry, row) => {
      const { natureId, nature, value, valuePercent } = row;

      return natureId && nature && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              id: natureId,
              nature,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
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

    return rows.reduce<SpecialityRupture[]>((carry, row) => {
      const { id, num, name, state, date, classId, causeId, causeType } = row;

      return id && classId && causeId
        ? [
            ...carry,
            {
              id,
              num,
              name,
              active: state === 'ouvert',
              date: date?.toLocaleDateString(),
              classification: {
                id: classId,
                label: getRuptureTypeLabel(classId),
              },
              cause: {
                id: causeId,
                type: causeType,
              },
            },
          ]
        : carry;
    }, []);
  }

  async getSpecialityPublications(cisId: number): Promise<Publication[]> {
    const rows = await dbInstance
      .selectFrom('publications as publi')
      .where('publi.mp_id', '=', cisId)
      .leftJoin('publication_types as pt', 'pt.id', 'publi.type_id')
      .select(['publi.id', 'publi.title as name', 'publi.link', 'pt.id as typeId'])
      .execute();

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
                name: getPublicationsTypeLabel(typeId),
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
      return id && name && code
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

  async getCisCodeBySubstanceId(subId: number): Promise<string[]> {
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

  async getSubstanceDeclarationsPerGender(subId: number): Promise<RepartitionPerGender> {
    const rows = await dbInstance
      .selectFrom('substances_patient_sex')
      .where('substance_id', '=', subId)
      .select(['sex', 'patients_consumption', 'patients_percentage'])
      .execute();

    //TODO: to be fixed in bdd
    const male = rows.find((row) => row.sex === 1);
    const female = rows.find((row) => row.sex === 2);

    return {
      male: male
        ? {
            value: Math.round(male.patients_consumption ?? 0),
            valuePercent: roundFloat(male.patients_percentage ?? 0),
          }
        : null,
      female: female
        ? {
            value: Math.round(female.patients_consumption ?? 0),
            valuePercent: roundFloat(female.patients_percentage ?? 0),
          }
        : null,
    };
  }

  async getSubstanceDeclarationsPerAge(subId: number): Promise<RepartitionPerAge[]> {
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

    return rows.reduce<RepartitionPerAge[]>((carry, row) => {
      const { range, consumption, percentage } = row;
      return range && consumption && percentage
        ? [
            ...carry,
            {
              range,
              value: Math.round(consumption),
              valuePercent: roundFloat(percentage),
            },
          ]
        : carry;
    }, []);
  }

  // Substance sideEffects

  async getSubstanceSideEffectsDeclarations(
    subId: number
  ): Promise<SubstanceSideEffectsDeclarations | null> {
    const row = await dbInstance
      .selectFrom('substances_cases')
      .where('substance_id', '=', subId)
      .select('nb_cases as total')
      .executeTakeFirst();

    if (row?.total) {
      return {
        total: row.total,
      };
    }

    return null;
  }

  async getSubstanceDeclarationsWithSideEffectsPerGender(
    subId: number
  ): Promise<RepartitionPerGender> {
    const rows = await dbInstance
      .selectFrom('substances_case_sex')
      .where('substance_id', '=', subId)
      .select(['id', 'sex', 'case_percentage', 'nb_cases'])
      .execute();

    //TODO: to be fixed in bdd
    const male = rows.find((row) => row.sex === 'Homme');
    const female = rows.find((row) => row.sex === 'Femme');

    return {
      male: male
        ? {
            value: Math.round(male.nb_cases ?? 0),
            valuePercent: roundFloat(male.case_percentage ?? 0),
          }
        : null,
      female: female
        ? {
            value: Math.round(female.nb_cases ?? 0),
            valuePercent: roundFloat(female.case_percentage ?? 0),
          }
        : null,
    };
  }

  async getSubstanceDeclarationsWithSideEffectsPerAge(subId: number): Promise<RepartitionPerAge[]> {
    const rows = await dbInstance
      .selectFrom('substances_case_age as sca')
      .where('sca.substance_id', '=', subId)
      .leftJoin('ages', 'ages.id', 'sca.age_id')
      .select(['ages.range', 'sca.nb_cases as consumption', 'sca.case_percentage as percentage'])
      .execute();

    return rows.reduce<RepartitionPerAge[]>((carry, row) => {
      const { range, consumption, percentage } = row;
      return range && percentage && consumption && consumption >= 10
        ? [
            ...carry,
            {
              range,
              value: Math.round(consumption),
              valuePercent: roundFloat(percentage),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceDeclarationsWithSideEffectsPerNotifier(
    subId: number
  ): Promise<RepartitionPerNotifier[]> {
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
      return id && job && value && valuePercent
        ? [
            ...carry,
            {
              id,
              job,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceDeclarationsWithSideEffectsPerPathology(
    subId: number
  ): Promise<RepartitionPerPathology[]> {
    const rows = await dbInstance
      .selectFrom('substances_soclong as ss')
      .where('ss.substance_id', '=', subId)
      .leftJoin('soc_longs as sl', 'sl.id', 'ss.soc_long_id')
      .select([
        'sl.id as socId',
        'sl.soc as range',
        'ss.n_case_effect as value',
        'ss.case_percentage as valuePercent',
      ])
      .execute();

    const htlEffects = await this._getSubstanceRepPathologyEffects(subId);

    return rows.reduce<RepartitionPerPathology[]>((carry, row) => {
      const { socId, range, value, valuePercent } = row;
      // hide results under 11 declarations
      return socId && range && value && value > 11 && valuePercent
        ? [
            ...carry,
            {
              id: socId,
              subId,
              range,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
              htlEffects: htlEffects
                .filter((htfEffect) => htfEffect.socId === socId)
                // hide results under 10 declarations
                .filter((htfEffect) => htfEffect.value >= 10),
            },
          ]
        : carry;
    }, []);
  }

  async _getSubstanceRepPathologyEffects(subId: number): Promise<HltEffect[]> {
    const rowsHltEffects = await dbInstance
      .selectFrom('substances_hlt as s_htl')
      .where('s_htl.substance_id', '=', subId)
      .leftJoin('hlt_effects as hlt_e', 'hlt_e.id', 's_htl.hlt_effect_id')
      .select([
        's_htl.hlt_effect_id as hltEffectId',
        's_htl.soc_long_id as socId',
        'hlt_e.effect as range',
        's_htl.n_decla_eff_hlt as value',
        's_htl.case_percentage as valuePercent',
      ])
      .execute();

    return rowsHltEffects.reduce<HltEffect[]>((carry, row) => {
      const { hltEffectId, socId, range, value, valuePercent } = row;
      return hltEffectId && socId && range && value && valuePercent
        ? [
            ...carry,
            {
              id: hltEffectId,
              socId,
              range,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceExposition(subId: number): Promise<EntityExpositionPeriod | null> {
    const { min, max } = dbInstance.fn;

    const row = await dbInstance
      .selectFrom('substances_exposition')
      .where('substance_id', '=', subId)
      .select([
        'consumption_year_trunc as consumption',
        'exposition as expositionCode',
        min('year').as('minYear'),
        max('year').as('maxYear'),
      ])
      .groupBy('consumption')
      .groupBy('expositionCode')
      .executeTakeFirst();

    if (
      row?.expositionCode &&
      row?.minYear &&
      row?.minYear &&
      row?.consumption &&
      row?.consumption >= 10
    ) {
      return {
        consumption: row.consumption,
        expositionCode: row.expositionCode,
        minYear: row.minYear as number,
        maxYear: row.maxYear as number,
        ...getExpositionByLevelId(row.expositionCode),
      };
    }

    return null;
  }

  async getGlobalStatisticExposition(): Promise<GlobalExpositionPeriod | null> {
    const rowConsumption = await dbInstance
      .selectFrom('global_se')
      .select(['n as consumption'])
      .executeTakeFirst();

    const rowMinYear = await dbInstance
      .selectFrom('global_se')
      .where('label', '=', 'min_annee')
      .select(['n as minYear'])
      .executeTakeFirst();

    const rowMaxYear = await dbInstance
      .selectFrom('global_se')
      .where('label', '=', 'max_annee')
      .select(['n as maxYear'])
      .executeTakeFirst();

    if (
      rowMinYear?.minYear &&
      rowMaxYear?.maxYear &&
      rowConsumption?.consumption &&
      rowConsumption?.consumption >= 10
    ) {
      return {
        consumption: rowConsumption.consumption,
        minYear: rowMinYear.minYear,
        maxYear: rowMaxYear.maxYear,
      };
    }

    return null;
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
            value: Math.round(male.value ?? 0),
            valuePercent: roundFloat(male.valuePercent ?? 0),
          }
        : null,
      female: female
        ? {
            value: Math.round(female.value ?? 0),
            valuePercent: roundFloat(female.valuePercent ?? 0),
          }
        : null,
    };
  }

  async getGlobalStatisticRepAge(): Promise<GlobalStatsUsagePerAge[]> {
    const rows = await dbInstance
      .selectFrom('global_se_ages as gsa')
      .leftJoin('ages', 'gsa.age_id', 'ages.id')
      .select(['ages.id', 'ages.range as range', 'gsa.pct as percentage', 'gsa.n as consumption'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerAge[]>((carry, row) => {
      const { range, consumption, percentage } = row;
      return range && percentage && consumption && consumption >= 10
        ? [
            ...carry,
            {
              range,
              value: Math.round(consumption),
              valuePercent: roundFloat(percentage),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticSeriousEffects(): Promise<GlobalStatsUsagePerSeriousEffect[]> {
    const rows = await dbInstance
      .selectFrom('global_se_gravity_types as gsg')
      .select(['label as range', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerSeriousEffect[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && valuePercent
        ? [
            ...carry,
            {
              range,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticGravity(): Promise<GlobalStatsUsagePerGravity[]> {
    const rows = await dbInstance
      .selectFrom('global_se_grave')
      .select(['label as range', 'n as value', 'pct as valuePercent'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerGravity[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && valuePercent
        ? [
            ...carry,
            {
              range: range === 'OUI' ? 'Grave' : 'Non grave',
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerPathology(): Promise<GlobalStatsUsagePerPathology[]> {
    const rows = await dbInstance
      .selectFrom('global_se_soc')
      .select(['id', 'label as range', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerPathology[]>((carry, row) => {
      const { id, range, value, valuePercent } = row;
      return id && range && value && valuePercent
        ? [
            ...carry,
            {
              id,
              range,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerNotifier(): Promise<GlobalStatsUsagePerNotifier[]> {
    const rows = await dbInstance
      .selectFrom('global_se_notifiers')
      .select(['id', 'label as job', 'pct as valuePercent', 'n as value'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerNotifier[]>((carry, row) => {
      const { id, job, value, valuePercent } = row;
      return id && job && value && valuePercent
        ? [
            ...carry,
            {
              id,
              job,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatistic(): Promise<GlobalStatistic> {
    return {
      repartitionPerGender: await this.getGlobalStatisticRepGender(),
      repartitionPerAge: await this.getGlobalStatisticRepAge(),
      exposition: await this.getGlobalStatisticExposition(),
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

    return rowTotal.reduce<RuptureYear[]>(
      (carry, { year }) => (year ? [...carry, { value: parseInt(year, 10) }] : carry),
      []
    );
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

        //TODO: transform with enum
        if (classification === 'rupture') {
          carry.nbRupture += 1;
          if (state === 'ferm??') {
            carry.nbRuptureClosed += 1;
          }
        }

        if (classification === 'risque') {
          carry.nbRisque += 1;
          if (state === 'ferm??') {
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

    const rowsRisk = await dbInstance
      .selectFrom('sold_out_all')
      .select([count('num').as('value'), 'year', 'classification'])
      .where('classification', '=', 'risque')
      .groupBy('year')
      .groupBy('classification')
      .orderBy('year')
      .execute();

    const rowsRiskRupture = await dbInstance
      .selectFrom('sold_out_all')
      .select([count('num').as('value'), 'year', 'classification'])
      .where('classification', '=', 'rupture')
      .groupBy('year')
      .groupBy('classification')
      .orderBy('year')
      .execute();

    const result: RuptureClassificationRepartition[] = [];

    rowsRisk.forEach((row) => {
      const { classification, value, year } = row;

      if (classification && value && year) {
        result.push({
          year: parseInt(year, 10),
          value: parseInt(value as string, 10),
          classification,
        });
      }
    });

    rowsRiskRupture.forEach((row) => {
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
          causes: rows.reduce<Cause[]>((carry, row) => {
            const { type, value } = row;
            return type && value && value >= 10
              ? [
                  ...carry,
                  {
                    range: type,
                    value: Number(value),
                  },
                ]
              : carry;
          }, []),
          total: Number(rowsTotal?.value),
        };
      })
    );
  }

  async _getRupturesTotalActionByYear(year: string): Promise<number> {
    const { count } = dbInstance.fn;
    const rowTotal = await dbInstance
      .selectFrom('actions')
      .select([count('id').as('value')])
      .where('year', '=', year)
      .distinct()
      .executeTakeFirst();

    return Number(rowTotal?.value);
  }

  async _getRuptureActionsByYear(year: string): Promise<RuptureAction[]> {
    const { count } = dbInstance.fn;
    const rows = await dbInstance
      .selectFrom('actions')
      .leftJoin('actions_types as at', 'actions.type_id', 'at.id')
      .select([count('actions.id').as('value'), 'at.type as name'])
      .where('actions.year', '=', year)
      .groupBy('at.type')
      .orderBy('at.type')
      .execute();

    return rows.reduce<RuptureAction[]>((carry, row) => {
      const { name, value } = row;
      return name && value && value >= 10
        ? [
            ...carry,
            {
              range: name,
              value: Number(value),
            },
          ]
        : carry;
    }, []);
  }

  async getRuptureStockRepartitionPerAction(): Promise<RuptureActionRepartition[]> {
    const years = await this.getRuptureYears();

    return Promise.all(
      years.map(async ({ value }) => {
        const year = String(value);
        const total = await this._getRupturesTotalActionByYear(year);
        const actions = await this._getRuptureActionsByYear(year);

        return {
          year: value,
          actions,
          total,
        };
      })
    );
  }

  async _getRuptureStockByTherapeuticClass(year: string): Promise<TherapeuticClassRupture[]> {
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

    return rows.reduce<TherapeuticClassRupture[]>((carry, row) => {
      const { name, value, year } = row;

      return name && year && value && value >= 10
        ? [
            ...carry,
            {
              name: row.name,
              value: Number(row.value),
              totalCis: Number(rowsCis?.value),
            },
          ]
        : carry;
    }, []);
  }

  async getRupturesPerTherapeuticClassesPerYearRepartition(
    years: RuptureYear[]
  ): Promise<TherapeuticClassesRupturesPerYear[]> {
    return Promise.all(
      years.map(async ({ value }) => {
        const year = String(value);
        const total = await this._getRupturesTotalActionByYear(year);
        const repartition = await this._getRuptureStockByTherapeuticClass(year);

        return {
          year: value,
          repartition,
          total,
        };
      })
    );
  }

  async getRupturesTotalActions(): Promise<RuptureTotalAction[]> {
    const { count } = dbInstance.fn;
    const rows = await dbInstance
      .selectFrom('actions')
      .leftJoin('actions_types as at', 'at.id', 'actions.type_id')
      .select([count('actions.id').as('value'), 'actions.year', 'at.id as actionTypeId'])
      .groupBy('actions.year')
      .groupBy('at.type')
      .groupBy('at.id')
      .execute();

    const rowsTotal = await dbInstance
      .selectFrom('actions')
      .leftJoin('actions_types as at', 'at.id', 'actions.type_id')
      .select([count('actions.id').as('value'), 'actions.with_action', 'actions.year'])
      .groupBy('actions.with_action')
      .groupBy('actions.year')
      .execute();

    return rows.reduce<RuptureTotalAction[]>((carry, row) => {
      const { value, year } = row;

      const totalWithAtLeastOneAction = rowsTotal.find(
        (r) => r.with_action === 'Avec mesure' && Number(r.year) === Number(year)
      );

      return value && year
        ? [
            ...carry,
            {
              total: Number(row.value),
              totalWithAtLeastOneAction: Number(totalWithAtLeastOneAction?.value ?? 0),
              year: Number(row.year),
            },
          ]
        : carry;
    }, []);
  }
}
