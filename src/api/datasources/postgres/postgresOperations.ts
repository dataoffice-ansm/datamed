import { dbInstance } from './postgreDb';
import type {
  EntityExposition,
  GlobalExpositionPeriod,
  Period,
  GlobalStatistics,
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
  ShortagesAtcPerYear,
  ShortagesCausesPerYear,
  ShortagesClassPerYear,
  ShortagesMeasuresPerYear,
  ShortagesPerYear,
  Speciality,
  SpecialityAssociatedShortage,
  SpecialitySubstance,
  SpecialityUsagePerAge,
  Substance,
  SubstanceSideEffectsDeclarations,
} from '../../graphql/__generated__/generated-types';
import {
  getExpositionInfosByLevelId,
  getCisPharmaFormType,
  getMedicalErrorApparitionStep,
  getPublicationsTypeLabel,
} from '../../utils/mapping';
import { roundFloat } from '../../utils/format';

export class PostgresOperations {
  async getFullSpecialitiesByCode(cisCodes: string[]): Promise<Speciality[]> {
    const rows = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.cis', 'in', cisCodes)
      .leftJoin('mp_atc as mp_a', 'mp.id', 'mp_a.mp_id')
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
        'mp.marketing_status as commercialisationState',
        'mka_t.type as commercialisationType',
        'lab.id as laboratoryId',
        'lab.name as laboratoryName',
        'mp.icon_id as iconId',
        'mp_exp.exposition as expositionCode',
        'mp_exp.consumption_year_trunc as consumption',
        'ph_f.form as pharmaFormLabel',
        'ph_f.id as pharmaFormId',
        'i.name as iconName',
      ])
      .execute();

    const openMedicExposition = await this._getOpenMedicExpositionPeriod();
    const bnpvPeriod = await this.getBNPVExpositionPeriod();

    return rows.map((row) => {
      const {
        id,
        code,
        name,
        atcId,
        actCode,
        atcName,
        iconName,
        commercialisationState,
        commercialisationType,
        laboratoryId,
        laboratoryName,
        expositionCode,
        consumption,
        pharmaFormId,
        pharmaFormLabel,
      } = row;

      const expositionInfos = getExpositionInfosByLevelId(expositionCode);

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
        commercialisationState,
        commercialisationType,
        laboratory: laboratoryId
          ? {
              id: laboratoryId,
              name: laboratoryName,
            }
          : null,
        exposition:
          expositionCode &&
          consumption &&
          consumption >= 10 &&
          openMedicExposition?.minYear &&
          openMedicExposition?.maxYear
            ? {
                consumption,
                level: expositionInfos.level,
                description: expositionInfos.description,
                openMedicPeriod: {
                  minYear: openMedicExposition.minYear,
                  maxYear: openMedicExposition?.maxYear,
                },
              }
            : null,
        bnpvPeriod,
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

    const male = rows.find((row) => row.sex === 'male');
    const female = rows.find((row) => row.sex === 'female');

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
      .select([
        'mp_a.patients_consumption as value',
        'mp_a.patients_percentage as valuePercent',
        'ages.range',
      ])
      .execute();

    return rows.reduce<SpecialityUsagePerAge[]>((carry, row) => {
      const { range, value, valuePercent } = row;

      return range && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
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
      .select(['err.number as value', 'err.percentage as valuePercent', 'pop.label as range'])
      .execute();

    return rows.reduce<MedicalErrorsPopulation[]>((carry, row) => {
      const { range, value, valuePercent } = row;

      return range && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
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
        valuePercent: Math.round(withSideEffect?.percentage ?? 0),
      },
      without: {
        value: Math.round(withoutSideEffect?.number ?? 0),
        valuePercent: Math.round(withoutSideEffect?.percentage ?? 0),
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
        'err.number as value',
        'err.percentage as valuePercent',
        'ini.id as stepId',
        'ini.label',
        'ini.definition as description',
      ])
      .execute();

    return rows.reduce<MedicalErrorsApparitionStep[]>((carry, row) => {
      const { stepId, label, value, valuePercent, description } = row;

      return stepId && label && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              stepId,
              step: getMedicalErrorApparitionStep(stepId),
              label,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
              description,
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

      return natureId && nature && value && value >= 10
        ? [
            ...carry,
            {
              id: natureId,
              nature,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getSpecialityShortagesHistory(cisId: number): Promise<SpecialityAssociatedShortage[]> {
    const rows = await dbInstance
      .selectFrom('shortages_associations as sa')
      .where('sa.mp_id', '=', cisId)
      .leftJoin('shortages_histo as sh', 'sh.mp_id', 'sa.mp_associated_id')
      .leftJoin('shortages_classes as sc', 'sc.id', 'sh.classification_id')
      .leftJoin('shortages_causes as sca', 'sca.id', 'sh.cause_id')
      .leftJoin('shortages_causes_types as sct', 'sct.id', 'sca.cause_id')
      .leftJoin('medicinal_products as mp', 'mp.id', 'sh.mp_id')
      .orderBy('sh.date', 'desc')

      .select([
        //cis
        'mp.id as cisId',
        'mp.name as cisName',
        'mp.cis as cisCode',
        // history
        'sh.num',
        'sh.state',
        'sh.date',
        'sh.year',
        // classes
        'sc.classification',
        //cause
        'sct.id as causeId',
        'sct.type as causeType',
        'sct.definition as causeDefinition',
      ])
      .execute();

    return rows.reduce<SpecialityAssociatedShortage[]>((carry, row) => {
      const {
        //cis
        cisId,
        cisCode,
        cisName,
        // history
        num,
        state,
        date,
        year,
        // classes
        classification,
        // cause
        causeType,
        causeDefinition,
      } = row;

      return cisId
        ? [
            ...carry,
            {
              cis: {
                id: cisId,
                code: cisCode,
                name: cisName,
              },
              num,
              state,
              date: date?.toLocaleDateString(),
              year: Number(year),
              classification,
              cause: {
                type: causeType,
                definition: causeDefinition,
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

    const male = rows.find((row) => row.sex === 'male');
    const female = rows.find((row) => row.sex === 'female');

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
        's_p_a.patients_consumption as value',
        's_p_a.patients_percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<RepartitionPerAge[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && value >= 10
        ? [
            ...carry,
            {
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
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

    const male = rows.find((row) => row.sex === 'male');
    const female = rows.find((row) => row.sex === 'female');

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
      .select(['ages.range', 'sca.nb_cases as value', 'sca.case_percentage as valuePercent'])
      .execute();

    return rows.reduce<RepartitionPerAge[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && value >= 10
        ? [
            ...carry,
            {
              range,
              value: Math.round(value),
              valuePercent: roundFloat(valuePercent ?? 0),
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
        'notifiers.id as notifierId',
        'notifiers.job',
        'sn.notification_number as value',
        'sn.notification_percentage as valuePercent',
      ])
      .execute();

    return rows.reduce<RepartitionPerNotifier[]>((carry, row) => {
      const { notifierId, job, value, valuePercent } = row;
      return notifierId && job && value && value >= 10 && valuePercent
        ? [
            ...carry,
            {
              notifierId,
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
      return socId && range && value && value > 11
        ? [
            ...carry,
            {
              socId,
              subId,
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
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
              hltEffectId,
              socId,
              range,
              value,
              valuePercent: roundFloat(valuePercent),
            },
          ]
        : carry;
    }, []);
  }

  async getSubstanceExposition(subId: number): Promise<EntityExposition | null> {
    const openMedicExposition = await this._getOpenMedicExpositionPeriod();

    const row = await dbInstance
      .selectFrom('substances_exposition')
      .where('substance_id', '=', subId)
      .select(['consumption_year_trunc as consumption', 'exposition as expositionCode'])
      .groupBy('consumption')
      .groupBy('expositionCode')
      .executeTakeFirst();

    if (
      row?.expositionCode &&
      row?.consumption &&
      row?.consumption >= 10 &&
      openMedicExposition?.minYear &&
      openMedicExposition?.maxYear
    ) {
      const expositionInfos = getExpositionInfosByLevelId(row.expositionCode);

      return {
        consumption: row.consumption,
        level: expositionInfos.level,
        description: expositionInfos.description,
        openMedicPeriod: {
          minYear: openMedicExposition.minYear,
          maxYear: openMedicExposition?.maxYear,
        },
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
      .where('label', '=', 'male')
      .select(['n as value', 'pct as valuePercent'])
      .executeTakeFirst();

    const female = await dbInstance
      .selectFrom('global_se_sex')
      .where('label', '=', 'female')
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
      .select(['ages.id', 'ages.range as range', 'gsa.n as value', 'gsa.pct as valuePercent'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerAge[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && value >= 10
        ? [
            ...carry,
            {
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticSeriousEffects(): Promise<GlobalStatsUsagePerSeriousEffect[]> {
    const rows = await dbInstance
      .selectFrom('global_se_gravity_types as gsg')
      .select(['label as range', 'n as value', 'pct as valuePercent'])
      .execute();

    return rows.reduce<GlobalStatsUsagePerSeriousEffect[]>((carry, row) => {
      const { range, value, valuePercent } = row;
      return range && value && value >= 10
        ? [
            ...carry,
            {
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
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
      return range && value && value >= 10
        ? [
            ...carry,
            {
              range: range === 'OUI' ? 'Grave' : 'Non grave',
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerPathology(): Promise<GlobalStatsUsagePerPathology[]> {
    const rows = await dbInstance
      .selectFrom('global_se_soc as gsoc')
      .leftJoin('soc_longs', 'soc_longs.id', 'gsoc.soc_long_id')
      .select([
        'gsoc.id as id',
        'gsoc.n as value',
        'gsoc.pct as valuePercent',
        'soc_longs.soc as range',
      ])
      .execute();

    return rows.reduce<GlobalStatsUsagePerPathology[]>((carry, row) => {
      const { id, range, value, valuePercent } = row;
      return id && range && value && value >= 10
        ? [
            ...carry,
            {
              id,
              range,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatisticRepPerNotifier(): Promise<GlobalStatsUsagePerNotifier[]> {
    const rows = await dbInstance
      .selectFrom('global_se_notifiers as gnotif')
      .leftJoin('notifiers', 'notifiers.id', 'gnotif.notifier_id')
      .select([
        'notifiers.id as id',
        'gnotif.n as value',
        'gnotif.pct as valuePercent',
        'notifiers.job as job',
      ])
      .execute();

    return rows.reduce<GlobalStatsUsagePerNotifier[]>((carry, row) => {
      const { id, job, value, valuePercent } = row;
      return id && job && value && value >= 10
        ? [
            ...carry,
            {
              id,
              job,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalStatistics(): Promise<GlobalStatistics> {
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

  async _getOpenMedicExpositionPeriod(): Promise<{ minYear: number; maxYear: number } | null> {
    const rows = await dbInstance
      .selectFrom('config')
      .select(['id', 'label', 'c_date'])
      .where('label', 'in', ['openmedic_date_min', 'openmedic_date_max'])
      .execute();

    const minDate = rows.find((r) => r.label === 'openmedic_date_min')?.c_date;
    const maxDate = rows.find((r) => r.label === 'openmedic_date_max')?.c_date;

    return minDate && maxDate
      ? {
          minYear: minDate.getFullYear(),
          maxYear: maxDate.getFullYear(),
        }
      : null;
  }

  async getTrustMedExpositionPeriod(): Promise<Period | null> {
    const rows = await dbInstance
      .selectFrom('config')
      .select(['id', 'label', 'c_date'])
      .where('label', 'in', ['trustmed_histo_date_min', 'trustmed_histo_date_max'])
      .execute();

    const minDate = rows.find((r) => r.label === 'trustmed_histo_date_min')?.c_date ?? null;
    const maxDate = rows.find((r) => r.label === 'trustmed_histo_date_max')?.c_date ?? null;

    return minDate && maxDate
      ? {
          minYear: minDate.getFullYear(),
          maxYear: maxDate.getFullYear(),
        }
      : null;
  }

  async getErrMedExpositionPeriod(): Promise<Period | null> {
    const rows = await dbInstance
      .selectFrom('config')
      .select(['id', 'label', 'c_date'])
      .where('label', 'in', ['emed_date_min', 'emed_date_max'])
      .execute();

    const minDate = rows.find((r) => r.label === 'emed_date_min')?.c_date ?? null;
    const maxDate = rows.find((r) => r.label === 'emed_date_max')?.c_date ?? null;

    return minDate && maxDate
      ? {
          minYear: minDate.getFullYear(),
          maxYear: maxDate.getFullYear(),
        }
      : null;
  }

  async getBNPVExpositionPeriod(): Promise<Period | null> {
    const rows = await dbInstance
      .selectFrom('config')
      .select(['id', 'label', 'c_date'])
      .where('label', 'in', ['bnpv_date_min', 'bnpv_date_max'])
      .execute();

    const minDate = rows.find((r) => r.label === 'bnpv_date_min')?.c_date ?? null;
    const maxDate = rows.find((r) => r.label === 'bnpv_date_max')?.c_date ?? null;

    return minDate && maxDate
      ? {
          minYear: minDate.getFullYear(),
          maxYear: maxDate.getFullYear(),
        }
      : null;
  }

  async getGlobalShortagesPerYear(): Promise<ShortagesPerYear[]> {
    const rows = await dbInstance
      .selectFrom('global_shortages')
      .select([
        'year',
        'n_reports as reportsCount',
        'n_reports_actions as casesWithMeasuresCount',
        'n_actions as measuresCount',
        'percentage_reports_actions as casesWithMeasuresCountPercent',
      ])
      .orderBy('year', 'desc')
      .execute();

    return rows.reduce<ShortagesPerYear[]>((carry, row) => {
      const {
        year,
        reportsCount,
        measuresCount,
        casesWithMeasuresCount,
        casesWithMeasuresCountPercent,
      } = row;
      return year
        ? [
            ...carry,
            {
              year,
              reportsCount,
              measuresCount,
              casesWithMeasuresCount,
              casesWithMeasuresCountPercent: roundFloat(casesWithMeasuresCountPercent ?? 0, 0),
            },
          ]
        : carry;
    }, []);
  }

  async getGlobalShortagesClass(): Promise<ShortagesClassPerYear[]> {
    const rows = await dbInstance
      .selectFrom('global_shortages_classes as gsc')
      .leftJoin('shortages_classes as sc', 'sc.id', 'gsc.classification_id')
      .select([
        'gsc.year',
        'gsc.n as value',
        'gsc.percentage_close as valuePercentClosed',
        'sc.classification',
      ])
      .execute();

    return rows.reduce<ShortagesClassPerYear[]>((carry, row) => {
      const { year, value, valuePercentClosed, classification } = row;

      return year
        ? [
            ...carry,
            {
              year,
              value,
              valuePercentClosed: roundFloat(valuePercentClosed ?? 0, 0),
              classification,
            },
          ]
        : carry;
    }, []);
  }

  async getShortagesCausesPerCause(): Promise<ShortagesCausesPerYear[]> {
    const rows = await dbInstance
      .selectFrom('global_shortages_causes as gsc')
      .leftJoin('shortages_causes_types as sc', 'sc.id', 'gsc.cause_id')
      .select([
        'gsc.year',
        'gsc.n as value',
        'gsc.percentage_causes as valuePercent',
        'sc.type',
        'sc.definition',
      ])
      .execute();

    return rows.reduce<ShortagesCausesPerYear[]>((carry, row) => {
      const { year, value, valuePercent, type, definition } = row;

      return year
        ? [
            ...carry,
            {
              year,
              value,
              valuePercent: roundFloat(valuePercent ?? 0),
              type,
              definition,
            },
          ]
        : carry;
    }, []);
  }

  async getShortagesAtcPerYear(): Promise<ShortagesAtcPerYear[]> {
    const rows = await dbInstance
      .selectFrom('global_shortages_atc as gsa')
      .leftJoin('atc1', 'atc1.id', 'gsa.atc1_id')
      .select([
        'gsa.year',
        'gsa.n_reports as reportsCount',
        'gsa.n_presentations as medicsCount',
        'atc1.code as code',
        'atc1.label as label',
      ])
      .execute();

    return rows.reduce<ShortagesAtcPerYear[]>((carry, row) => {
      const { year, reportsCount, medicsCount, code, label } = row;

      return year
        ? [
            ...carry,
            {
              year,
              reportsCount,
              medicsCount,
              code,
              label,
            },
          ]
        : carry;
    }, []);
  }

  async getShortagesMeasuresPerYear(): Promise<ShortagesMeasuresPerYear[]> {
    const rows = await dbInstance
      .selectFrom('global_shortages_actions as gsa')
      .leftJoin('shortages_actions_types as sat', 'sat.id', 'gsa.actions_types_id')
      .select([
        'gsa.year',
        'gsa.n as value',
        'gsa.percentage as valuePercent',
        'sat.type',
        'sat.definition',
      ])
      .execute();

    return rows.reduce<ShortagesMeasuresPerYear[]>((carry, row) => {
      const { year, value, valuePercent, type, definition } = row;

      return year
        ? [
            ...carry,
            {
              year,
              value,
              valuePercent: roundFloat(valuePercent ?? 0, 0),
              type,
              definition,
            },
          ]
        : carry;
    }, []);
  }
}
