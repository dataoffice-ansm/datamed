import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EntityExposition = {
  __typename?: 'EntityExposition';
  consumption?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  openMedicPeriod?: Maybe<Period>;
};

export type GlobalExpositionPeriod = {
  __typename?: 'GlobalExpositionPeriod';
  consumption?: Maybe<Scalars['Int']>;
  maxYear: Scalars['Int'];
  minYear: Scalars['Int'];
};

export type GlobalShortages = {
  __typename?: 'GlobalShortages';
  period?: Maybe<Period>;
  shortagesAtcPerYear?: Maybe<Array<ShortagesAtcPerYear>>;
  shortagesCausesPerYear?: Maybe<Array<ShortagesCausesPerYear>>;
  shortagesClassesPerYear?: Maybe<Array<ShortagesClassPerYear>>;
  shortagesMeasuresPerYear?: Maybe<Array<ShortagesMeasuresPerYear>>;
  shortagesPerYear?: Maybe<Array<ShortagesPerYear>>;
};

export type GlobalStatistics = {
  __typename?: 'GlobalStatistics';
  exposition?: Maybe<GlobalExpositionPeriod>;
  repartitionPerAge?: Maybe<Array<Maybe<GlobalStatsUsagePerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerGravity?: Maybe<Array<Maybe<GlobalStatsUsagePerGravity>>>;
  repartitionPerNotifier?: Maybe<Array<Maybe<GlobalStatsUsagePerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<GlobalStatsUsagePerPathology>>>;
  repartitionPerSeriousEffect?: Maybe<Array<Maybe<GlobalStatsUsagePerSeriousEffect>>>;
};

export type GlobalStatsUsagePerAge = {
  __typename?: 'GlobalStatsUsagePerAge';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type GlobalStatsUsagePerGravity = {
  __typename?: 'GlobalStatsUsagePerGravity';
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type GlobalStatsUsagePerNotifier = {
  __typename?: 'GlobalStatsUsagePerNotifier';
  id: Scalars['Int'];
  job: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type GlobalStatsUsagePerPathology = {
  __typename?: 'GlobalStatsUsagePerPathology';
  id: Scalars['Int'];
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type GlobalStatsUsagePerSeriousEffect = {
  __typename?: 'GlobalStatsUsagePerSeriousEffect';
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type HltEffect = {
  __typename?: 'HltEffect';
  hltEffectId: Scalars['Int'];
  range: Scalars['String'];
  socId: Scalars['Int'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type IndicatorValues = {
  __typename?: 'IndicatorValues';
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type Laboratory = {
  __typename?: 'Laboratory';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token?: Maybe<Scalars['String']>;
};

export type MedicalAtc = {
  __typename?: 'MedicalATC';
  code?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type MedicalError = {
  __typename?: 'MedicalError';
  name?: Maybe<Scalars['String']>;
};

export enum MedicalErrorApparitionStep {
  AdministrationStep = 'ADMINISTRATION_STEP',
  DeliveranceStep = 'DELIVERANCE_STEP',
  OtherStep = 'OTHER_STEP',
  PreparationStep = 'PREPARATION_STEP',
  PrescriptionStep = 'PRESCRIPTION_STEP',
  SurveillanceStep = 'SURVEILLANCE_STEP',
}

export enum MedicalErrorNature {
  AdministrationError = 'ADMINISTRATION_ERROR',
  DeliveranceError = 'DELIVERANCE_ERROR',
  OtherError = 'OTHER_ERROR',
  PreparationError = 'PREPARATION_ERROR',
  PrescriptionError = 'PRESCRIPTION_ERROR',
  TherapeuticCareError = 'THERAPEUTIC_CARE_ERROR',
}

export type MedicalErrors = {
  __typename?: 'MedicalErrors';
  apparitionStepRepartition?: Maybe<Array<Maybe<MedicalErrorsApparitionStep>>>;
  errMedPeriod?: Maybe<Period>;
  natureRepartition?: Maybe<Array<Maybe<MedicalErrorsNature>>>;
  populationRepartition?: Maybe<Array<Maybe<MedicalErrorsPopulation>>>;
  sideEffectsOriginRepartition?: Maybe<WithRepartition>;
};

export type MedicalErrorsApparitionStep = {
  __typename?: 'MedicalErrorsApparitionStep';
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  step: Scalars['String'];
  stepId: Scalars['Int'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type MedicalErrorsNature = {
  __typename?: 'MedicalErrorsNature';
  id: Scalars['Int'];
  nature: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type MedicalErrorsPopulation = {
  __typename?: 'MedicalErrorsPopulation';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginResult>;
};

export type MutationLoginArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Period = {
  __typename?: 'Period';
  maxMonth?: Maybe<Scalars['String']>;
  maxYear: Scalars['Int'];
  minMonth?: Maybe<Scalars['String']>;
  minYear: Scalars['Int'];
};

export type PharmaForm = {
  __typename?: 'PharmaForm';
  id: Scalars['Int'];
  label: Scalars['String'];
  type: Scalars['String'];
};

export enum PharmaFormType {
  Autre = 'AUTRE',
  Collyre = 'COLLYRE',
  Comprime = 'COMPRIME',
  Creme = 'CREME',
  Gaz = 'GAZ',
  Gelule = 'GELULE',
  Granule = 'GRANULE',
  Implant = 'IMPLANT',
  Liquide = 'LIQUIDE',
  Multi = 'MULTI',
  Pansement = 'PANSEMENT',
  Plante = 'PLANTE',
  Poudre = 'POUDRE',
  Seringue = 'SERINGUE',
  Sirop = 'SIROP',
  Spray = 'SPRAY',
  Supositoire = 'SUPOSITOIRE',
}

export type Publication = {
  __typename?: 'Publication';
  id: Scalars['Int'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type?: Maybe<PublicationType>;
};

export type PublicationType = {
  __typename?: 'PublicationType';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getGlobalShortages?: Maybe<GlobalShortages>;
  getGlobalStatistics?: Maybe<GlobalStatistics>;
  getSpecialities?: Maybe<SpecialitiesReturn>;
  getSpeciality?: Maybe<Speciality>;
  getSubstance?: Maybe<Substance>;
  getSubstances?: Maybe<SubstancesReturn>;
};

export type QueryGetSpecialityArgs = {
  cisCode: Scalars['String'];
};

export type QueryGetSubstanceArgs = {
  subCode: Scalars['String'];
};

export type RepartitionPerAge = {
  __typename?: 'RepartitionPerAge';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type RepartitionPerGender = {
  __typename?: 'RepartitionPerGender';
  female?: Maybe<IndicatorValues>;
  male?: Maybe<IndicatorValues>;
};

export type RepartitionPerNotifier = {
  __typename?: 'RepartitionPerNotifier';
  job: Scalars['String'];
  notifierId: Scalars['Int'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type RepartitionPerPathology = {
  __typename?: 'RepartitionPerPathology';
  htlEffects?: Maybe<Array<Maybe<HltEffect>>>;
  range: Scalars['String'];
  socId: Scalars['Int'];
  subId: Scalars['Int'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type RupturesTotalActionPerYear = {
  __typename?: 'RupturesTotalActionPerYear';
  totalDeclarationsWithMeasure?: Maybe<TotalDeclarationsWithMeasure>;
  totalMeasures?: Maybe<Scalars['Int']>;
  year: Scalars['Int'];
};

export type ShortageCis = {
  __typename?: 'ShortageCis';
  code?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type ShortagesActionsPerYear = {
  __typename?: 'ShortagesActionsPerYear';
  actionsCount?: Maybe<Scalars['Int']>;
  declarationsCount?: Maybe<Scalars['Int']>;
  declarationsWithActionsCount?: Maybe<Scalars['Int']>;
  declarationsWithActionsPercent?: Maybe<Scalars['Float']>;
  year: Scalars['Int'];
};

export type ShortagesAtcPerYear = {
  __typename?: 'ShortagesAtcPerYear';
  code?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  medicsCount?: Maybe<Scalars['Int']>;
  reportsCount?: Maybe<Scalars['Int']>;
  year: Scalars['Int'];
};

export type ShortagesCausesPerYear = {
  __typename?: 'ShortagesCausesPerYear';
  definition?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Float']>;
  year: Scalars['Int'];
};

export type ShortagesClassPerYear = {
  __typename?: 'ShortagesClassPerYear';
  classification?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercentClosed?: Maybe<Scalars['Float']>;
  year: Scalars['Int'];
};

export type ShortagesMeasuresPerYear = {
  __typename?: 'ShortagesMeasuresPerYear';
  definition?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Float']>;
  year: Scalars['Int'];
};

export type ShortagesPerYear = {
  __typename?: 'ShortagesPerYear';
  casesWithMeasuresCount?: Maybe<Scalars['Int']>;
  casesWithMeasuresCountPercent?: Maybe<Scalars['Float']>;
  measuresCount?: Maybe<Scalars['Int']>;
  reportsCount?: Maybe<Scalars['Int']>;
  year: Scalars['Int'];
};

export type SpecialitiesReturn = {
  __typename?: 'SpecialitiesReturn';
  meta?: Maybe<Meta>;
  specialities?: Maybe<Array<Maybe<SpecialityLight>>>;
};

export type Speciality = {
  __typename?: 'Speciality';
  atc?: Maybe<MedicalAtc>;
  bnpvPeriod?: Maybe<Period>;
  code: Scalars['String'];
  commercialisationState?: Maybe<Scalars['String']>;
  commercialisationType?: Maybe<Scalars['String']>;
  dosageIndication?: Maybe<Scalars['String']>;
  dosageSubstances?: Maybe<Array<Maybe<SpecialitySubstance>>>;
  exposition?: Maybe<EntityExposition>;
  id: Scalars['Int'];
  laboratory?: Maybe<Laboratory>;
  medicalErrors?: Maybe<MedicalErrors>;
  name: Scalars['String'];
  pharmaForm?: Maybe<PharmaForm>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  repartitionPerAge?: Maybe<Array<Maybe<SpecialityUsagePerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  shortagesHistory?: Maybe<SpecialityRupturesHistory>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type SpecialityAssociatedShortage = {
  __typename?: 'SpecialityAssociatedShortage';
  cause?: Maybe<SpecialityRuptureCause>;
  cis?: Maybe<ShortageCis>;
  classification?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  num?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type SpecialityLight = {
  __typename?: 'SpecialityLight';
  code: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SpecialityRuptureCause = {
  __typename?: 'SpecialityRuptureCause';
  definition?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SpecialityRupturesHistory = {
  __typename?: 'SpecialityRupturesHistory';
  meta?: Maybe<Meta>;
  shortages?: Maybe<Array<SpecialityAssociatedShortage>>;
  trustMedPeriod?: Maybe<Period>;
};

export type SpecialitySubstance = {
  __typename?: 'SpecialitySubstance';
  code: Scalars['String'];
  dosage?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SpecialityUsagePerAge = {
  __typename?: 'SpecialityUsagePerAge';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  range: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type Substance = {
  __typename?: 'Substance';
  code: Scalars['String'];
  exposition?: Maybe<EntityExposition>;
  id: Scalars['Int'];
  name: Scalars['String'];
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionPerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  retrievedSpecialities?: Maybe<SpecialitiesReturn>;
  sideEffects?: Maybe<SubstanceSideEffects>;
};

export type SubstanceSideEffects = {
  __typename?: 'SubstanceSideEffects';
  bnpvPeriod?: Maybe<Period>;
  declarations?: Maybe<SubstanceSideEffectsDeclarations>;
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionPerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerNotifier?: Maybe<Array<Maybe<RepartitionPerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<RepartitionPerPathology>>>;
};

export type SubstanceSideEffectsDeclarations = {
  __typename?: 'SubstanceSideEffectsDeclarations';
  total: Scalars['Int'];
};

export type SubstancesReturn = {
  __typename?: 'SubstancesReturn';
  meta?: Maybe<Meta>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type TotalDeclarationsWithMeasure = {
  __typename?: 'TotalDeclarationsWithMeasure';
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type WithRepartition = {
  __typename?: 'WithRepartition';
  with?: Maybe<IndicatorValues>;
  without?: Maybe<IndicatorValues>;
};

export type SpecialityFragmentFragment = {
  __typename?: 'Speciality';
  id: number;
  name: string;
  code: string;
  dosageIndication?: string | null;
  commercialisationState?: string | null;
  commercialisationType?: string | null;
  atc?: {
    __typename?: 'MedicalATC';
    id: number;
    name?: string | null;
    code?: string | null;
  } | null;
  pharmaForm?: { __typename?: 'PharmaForm'; id: number; label: string; type: string } | null;
  substances?: Array<{
    __typename?: 'Substance';
    id: number;
    code: string;
    name: string;
    exposition?: {
      __typename?: 'EntityExposition';
      consumption?: number | null;
      level?: string | null;
      description?: string | null;
      openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    } | null;
    retrievedSpecialities?: {
      __typename?: 'SpecialitiesReturn';
      meta?: { __typename?: 'Meta'; count?: number | null } | null;
      specialities?: Array<{
        __typename?: 'SpecialityLight';
        id: number;
        code: string;
        name: string;
      } | null> | null;
    } | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionPerAge';
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    sideEffects?: {
      __typename?: 'SubstanceSideEffects';
      bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
      declarations?: { __typename?: 'SubstanceSideEffectsDeclarations'; total: number } | null;
      repartitionPerGender?: {
        __typename?: 'RepartitionPerGender';
        male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
        female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      } | null;
      repartitionPerAge?: Array<{
        __typename?: 'RepartitionPerAge';
        range: string;
        value: number;
        valuePercent: number;
      } | null> | null;
      repartitionPerNotifier?: Array<{
        __typename?: 'RepartitionPerNotifier';
        notifierId: number;
        job: string;
        value: number;
        valuePercent: number;
      } | null> | null;
      repartitionPerPathology?: Array<{
        __typename?: 'RepartitionPerPathology';
        socId: number;
        range: string;
        value: number;
        valuePercent: number;
        htlEffects?: Array<{
          __typename?: 'HltEffect';
          hltEffectId: number;
          socId: number;
          range: string;
          value: number;
          valuePercent: number;
        } | null> | null;
      } | null> | null;
    } | null;
  } | null> | null;
  bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
  dosageSubstances?: Array<{
    __typename?: 'SpecialitySubstance';
    id: number;
    code: string;
    name: string;
    dosage?: string | null;
  } | null> | null;
  repartitionPerGender?: {
    __typename?: 'RepartitionPerGender';
    male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'SpecialityUsagePerAge';
    range: string;
    value: number;
    valuePercent: number;
  } | null> | null;
  publications?: Array<{
    __typename?: 'Publication';
    id: number;
    name: string;
    link?: string | null;
    type?: { __typename?: 'PublicationType'; id?: number | null; name?: string | null } | null;
  } | null> | null;
  laboratory?: { __typename?: 'Laboratory'; id: number; name?: string | null } | null;
  exposition?: {
    __typename?: 'EntityExposition';
    consumption?: number | null;
    level?: string | null;
    description?: string | null;
    openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
  } | null;
  medicalErrors?: {
    __typename?: 'MedicalErrors';
    errMedPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    populationRepartition?: Array<{
      __typename?: 'MedicalErrorsPopulation';
      id?: number | null;
      range: string;
      description?: string | null;
      value: number;
      valuePercent: number;
    } | null> | null;
    sideEffectsOriginRepartition?: {
      __typename?: 'WithRepartition';
      with?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      without?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    apparitionStepRepartition?: Array<{
      __typename?: 'MedicalErrorsApparitionStep';
      stepId: number;
      step: string;
      label: string;
      value: number;
      valuePercent: number;
      description?: string | null;
    } | null> | null;
    natureRepartition?: Array<{
      __typename?: 'MedicalErrorsNature';
      id: number;
      nature: string;
      value: number;
      valuePercent: number;
    } | null> | null;
  } | null;
  shortagesHistory?: {
    __typename?: 'SpecialityRupturesHistory';
    trustMedPeriod?: {
      __typename?: 'Period';
      minMonth?: string | null;
      minYear: number;
      maxMonth?: string | null;
      maxYear: number;
    } | null;
    shortages?: Array<{
      __typename?: 'SpecialityAssociatedShortage';
      num?: string | null;
      state?: string | null;
      date?: string | null;
      year?: number | null;
      classification?: string | null;
      cis?: {
        __typename?: 'ShortageCis';
        id: number;
        code?: string | null;
        name?: string | null;
      } | null;
      cause?: {
        __typename?: 'SpecialityRuptureCause';
        type?: string | null;
        definition?: string | null;
      } | null;
    }> | null;
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
  } | null;
};

export type SubstanceFragmentFragment = {
  __typename?: 'Substance';
  id: number;
  code: string;
  name: string;
  exposition?: {
    __typename?: 'EntityExposition';
    consumption?: number | null;
    level?: string | null;
    description?: string | null;
    openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
  } | null;
  retrievedSpecialities?: {
    __typename?: 'SpecialitiesReturn';
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
    specialities?: Array<{
      __typename?: 'SpecialityLight';
      id: number;
      code: string;
      name: string;
    } | null> | null;
  } | null;
  repartitionPerGender?: {
    __typename?: 'RepartitionPerGender';
    male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'RepartitionPerAge';
    range: string;
    value: number;
    valuePercent: number;
  } | null> | null;
  sideEffects?: {
    __typename?: 'SubstanceSideEffects';
    bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    declarations?: { __typename?: 'SubstanceSideEffectsDeclarations'; total: number } | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionPerAge';
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'RepartitionPerNotifier';
      notifierId: number;
      job: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'RepartitionPerPathology';
      socId: number;
      range: string;
      value: number;
      valuePercent: number;
      htlEffects?: Array<{
        __typename?: 'HltEffect';
        hltEffectId: number;
        socId: number;
        range: string;
        value: number;
        valuePercent: number;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type SpecialityQueryVariables = Exact<{
  cisCode: Scalars['String'];
}>;

export type SpecialityQuery = {
  __typename?: 'Query';
  getSpeciality?: {
    __typename?: 'Speciality';
    id: number;
    name: string;
    code: string;
    dosageIndication?: string | null;
    commercialisationState?: string | null;
    commercialisationType?: string | null;
    atc?: {
      __typename?: 'MedicalATC';
      id: number;
      name?: string | null;
      code?: string | null;
    } | null;
    pharmaForm?: { __typename?: 'PharmaForm'; id: number; label: string; type: string } | null;
    substances?: Array<{
      __typename?: 'Substance';
      id: number;
      code: string;
      name: string;
      exposition?: {
        __typename?: 'EntityExposition';
        consumption?: number | null;
        level?: string | null;
        description?: string | null;
        openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
      } | null;
      retrievedSpecialities?: {
        __typename?: 'SpecialitiesReturn';
        meta?: { __typename?: 'Meta'; count?: number | null } | null;
        specialities?: Array<{
          __typename?: 'SpecialityLight';
          id: number;
          code: string;
          name: string;
        } | null> | null;
      } | null;
      repartitionPerGender?: {
        __typename?: 'RepartitionPerGender';
        male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
        female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      } | null;
      repartitionPerAge?: Array<{
        __typename?: 'RepartitionPerAge';
        range: string;
        value: number;
        valuePercent: number;
      } | null> | null;
      sideEffects?: {
        __typename?: 'SubstanceSideEffects';
        bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
        declarations?: { __typename?: 'SubstanceSideEffectsDeclarations'; total: number } | null;
        repartitionPerGender?: {
          __typename?: 'RepartitionPerGender';
          male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
          female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
        } | null;
        repartitionPerAge?: Array<{
          __typename?: 'RepartitionPerAge';
          range: string;
          value: number;
          valuePercent: number;
        } | null> | null;
        repartitionPerNotifier?: Array<{
          __typename?: 'RepartitionPerNotifier';
          notifierId: number;
          job: string;
          value: number;
          valuePercent: number;
        } | null> | null;
        repartitionPerPathology?: Array<{
          __typename?: 'RepartitionPerPathology';
          socId: number;
          range: string;
          value: number;
          valuePercent: number;
          htlEffects?: Array<{
            __typename?: 'HltEffect';
            hltEffectId: number;
            socId: number;
            range: string;
            value: number;
            valuePercent: number;
          } | null> | null;
        } | null> | null;
      } | null;
    } | null> | null;
    bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    dosageSubstances?: Array<{
      __typename?: 'SpecialitySubstance';
      id: number;
      code: string;
      name: string;
      dosage?: string | null;
    } | null> | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'SpecialityUsagePerAge';
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    publications?: Array<{
      __typename?: 'Publication';
      id: number;
      name: string;
      link?: string | null;
      type?: { __typename?: 'PublicationType'; id?: number | null; name?: string | null } | null;
    } | null> | null;
    laboratory?: { __typename?: 'Laboratory'; id: number; name?: string | null } | null;
    exposition?: {
      __typename?: 'EntityExposition';
      consumption?: number | null;
      level?: string | null;
      description?: string | null;
      openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    } | null;
    medicalErrors?: {
      __typename?: 'MedicalErrors';
      errMedPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
      populationRepartition?: Array<{
        __typename?: 'MedicalErrorsPopulation';
        id?: number | null;
        range: string;
        description?: string | null;
        value: number;
        valuePercent: number;
      } | null> | null;
      sideEffectsOriginRepartition?: {
        __typename?: 'WithRepartition';
        with?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
        without?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      } | null;
      apparitionStepRepartition?: Array<{
        __typename?: 'MedicalErrorsApparitionStep';
        stepId: number;
        step: string;
        label: string;
        value: number;
        valuePercent: number;
        description?: string | null;
      } | null> | null;
      natureRepartition?: Array<{
        __typename?: 'MedicalErrorsNature';
        id: number;
        nature: string;
        value: number;
        valuePercent: number;
      } | null> | null;
    } | null;
    shortagesHistory?: {
      __typename?: 'SpecialityRupturesHistory';
      trustMedPeriod?: {
        __typename?: 'Period';
        minMonth?: string | null;
        minYear: number;
        maxMonth?: string | null;
        maxYear: number;
      } | null;
      shortages?: Array<{
        __typename?: 'SpecialityAssociatedShortage';
        num?: string | null;
        state?: string | null;
        date?: string | null;
        year?: number | null;
        classification?: string | null;
        cis?: {
          __typename?: 'ShortageCis';
          id: number;
          code?: string | null;
          name?: string | null;
        } | null;
        cause?: {
          __typename?: 'SpecialityRuptureCause';
          type?: string | null;
          definition?: string | null;
        } | null;
      }> | null;
      meta?: { __typename?: 'Meta'; count?: number | null } | null;
    } | null;
  } | null;
};

export type SpecialitiesQueryVariables = Exact<{ [key: string]: never }>;

export type SpecialitiesQuery = {
  __typename?: 'Query';
  getSpecialities?: {
    __typename?: 'SpecialitiesReturn';
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
    specialities?: Array<{
      __typename?: 'SpecialityLight';
      id: number;
      code: string;
      name: string;
    } | null> | null;
  } | null;
};

export type SubstanceQueryVariables = Exact<{
  subCode: Scalars['String'];
}>;

export type SubstanceQuery = {
  __typename?: 'Query';
  getSubstance?: {
    __typename?: 'Substance';
    id: number;
    code: string;
    name: string;
    exposition?: {
      __typename?: 'EntityExposition';
      consumption?: number | null;
      level?: string | null;
      description?: string | null;
      openMedicPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    } | null;
    retrievedSpecialities?: {
      __typename?: 'SpecialitiesReturn';
      meta?: { __typename?: 'Meta'; count?: number | null } | null;
      specialities?: Array<{
        __typename?: 'SpecialityLight';
        id: number;
        code: string;
        name: string;
      } | null> | null;
    } | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionPerAge';
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    sideEffects?: {
      __typename?: 'SubstanceSideEffects';
      bnpvPeriod?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
      declarations?: { __typename?: 'SubstanceSideEffectsDeclarations'; total: number } | null;
      repartitionPerGender?: {
        __typename?: 'RepartitionPerGender';
        male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
        female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      } | null;
      repartitionPerAge?: Array<{
        __typename?: 'RepartitionPerAge';
        range: string;
        value: number;
        valuePercent: number;
      } | null> | null;
      repartitionPerNotifier?: Array<{
        __typename?: 'RepartitionPerNotifier';
        notifierId: number;
        job: string;
        value: number;
        valuePercent: number;
      } | null> | null;
      repartitionPerPathology?: Array<{
        __typename?: 'RepartitionPerPathology';
        socId: number;
        range: string;
        value: number;
        valuePercent: number;
        htlEffects?: Array<{
          __typename?: 'HltEffect';
          hltEffectId: number;
          socId: number;
          range: string;
          value: number;
          valuePercent: number;
        } | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export type SubstancesQueryVariables = Exact<{ [key: string]: never }>;

export type SubstancesQuery = {
  __typename?: 'Query';
  getSubstances?: {
    __typename?: 'SubstancesReturn';
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
    substances?: Array<{
      __typename?: 'Substance';
      id: number;
      name: string;
      code: string;
    } | null> | null;
  } | null;
};

export type GlobalStatisticQueryVariables = Exact<{ [key: string]: never }>;

export type GlobalStatisticQuery = {
  __typename?: 'Query';
  getGlobalStatistics?: {
    __typename?: 'GlobalStatistics';
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
      female?: { __typename?: 'IndicatorValues'; value: number; valuePercent: number } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'GlobalStatsUsagePerAge';
      id?: number | null;
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    exposition?: {
      __typename?: 'GlobalExpositionPeriod';
      consumption?: number | null;
      minYear: number;
      maxYear: number;
    } | null;
    repartitionPerSeriousEffect?: Array<{
      __typename?: 'GlobalStatsUsagePerSeriousEffect';
      value: number;
      range: string;
      valuePercent: number;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'GlobalStatsUsagePerPathology';
      valuePercent: number;
      value: number;
      range: string;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'GlobalStatsUsagePerNotifier';
      id: number;
      job: string;
      value: number;
      valuePercent: number;
    } | null> | null;
    repartitionPerGravity?: Array<{
      __typename?: 'GlobalStatsUsagePerGravity';
      range: string;
      value: number;
      valuePercent: number;
    } | null> | null;
  } | null;
};

export type GlobalRupturesQueryVariables = Exact<{ [key: string]: never }>;

export type GlobalRupturesQuery = {
  __typename?: 'Query';
  getGlobalShortages?: {
    __typename?: 'GlobalShortages';
    period?: { __typename?: 'Period'; minYear: number; maxYear: number } | null;
    shortagesPerYear?: Array<{
      __typename?: 'ShortagesPerYear';
      year: number;
      reportsCount?: number | null;
      casesWithMeasuresCount?: number | null;
      casesWithMeasuresCountPercent?: number | null;
      measuresCount?: number | null;
    }> | null;
    shortagesClassesPerYear?: Array<{
      __typename?: 'ShortagesClassPerYear';
      year: number;
      value?: number | null;
      valuePercentClosed?: number | null;
      classification?: string | null;
    }> | null;
    shortagesCausesPerYear?: Array<{
      __typename?: 'ShortagesCausesPerYear';
      year: number;
      valuePercent?: number | null;
      value?: number | null;
      type?: string | null;
      definition?: string | null;
    }> | null;
    shortagesAtcPerYear?: Array<{
      __typename?: 'ShortagesAtcPerYear';
      year: number;
      reportsCount?: number | null;
      medicsCount?: number | null;
      code?: string | null;
      label?: string | null;
    }> | null;
    shortagesMeasuresPerYear?: Array<{
      __typename?: 'ShortagesMeasuresPerYear';
      year: number;
      value?: number | null;
      valuePercent?: number | null;
      type?: string | null;
      definition?: string | null;
    }> | null;
  } | null;
};

export type LoginMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'LoginResult'; token?: string | null } | null;
};

export const SubstanceFragmentFragmentDoc = gql`
  fragment SubstanceFragment on Substance {
    id
    code
    name
    exposition {
      consumption
      level
      description
      openMedicPeriod {
        minYear
        maxYear
      }
    }
    retrievedSpecialities {
      meta {
        count
      }
      specialities {
        id
        code
        name
      }
    }
    repartitionPerGender {
      male {
        value
        valuePercent
      }
      female {
        value
        valuePercent
      }
    }
    repartitionPerAge {
      range
      value
      valuePercent
    }
    sideEffects {
      bnpvPeriod {
        minYear
        maxYear
      }
      declarations {
        total
      }
      repartitionPerGender {
        male {
          value
          valuePercent
        }
        female {
          value
          valuePercent
        }
      }
      repartitionPerAge {
        range
        value
        valuePercent
      }
      repartitionPerNotifier {
        notifierId
        job
        value
        valuePercent
      }
      repartitionPerPathology {
        socId
        range
        value
        valuePercent
        htlEffects {
          hltEffectId
          socId
          range
          value
          valuePercent
        }
      }
    }
  }
`;
export const SpecialityFragmentFragmentDoc = gql`
  fragment SpecialityFragment on Speciality {
    id
    name
    code
    atc {
      id
      name
      code
    }
    pharmaForm {
      id
      label
      type
    }
    substances {
      ...SubstanceFragment
    }
    bnpvPeriod {
      minYear
      maxYear
    }
    dosageIndication
    dosageSubstances {
      id
      code
      name
      dosage
    }
    commercialisationState
    commercialisationType
    repartitionPerGender {
      male {
        value
        valuePercent
      }
      female {
        value
        valuePercent
      }
    }
    repartitionPerAge {
      range
      value
      valuePercent
    }
    publications {
      id
      name
      link
      type {
        id
        name
      }
    }
    laboratory {
      id
      name
    }
    exposition {
      consumption
      level
      description
      openMedicPeriod {
        minYear
        maxYear
      }
    }
    medicalErrors {
      errMedPeriod {
        minYear
        maxYear
      }
      populationRepartition {
        id
        range
        description
        value
        valuePercent
      }
      sideEffectsOriginRepartition {
        with {
          value
          valuePercent
        }
        without {
          value
          valuePercent
        }
      }
      apparitionStepRepartition {
        stepId
        step
        label
        value
        valuePercent
        description
      }
      natureRepartition {
        id
        nature
        value
        valuePercent
      }
    }
    shortagesHistory {
      trustMedPeriod {
        minMonth
        minYear
        maxMonth
        maxYear
      }
      shortages {
        num
        state
        date
        year
        cis {
          id
          code
          name
        }
        classification
        cause {
          type
          definition
        }
      }
      meta {
        count
      }
    }
  }
  ${SubstanceFragmentFragmentDoc}
`;
export const SpecialityDocument = gql`
  query Speciality($cisCode: String!) {
    getSpeciality(cisCode: $cisCode) {
      ...SpecialityFragment
    }
  }
  ${SpecialityFragmentFragmentDoc}
`;

/**
 * __useSpecialityQuery__
 *
 * To run a query within a React component, call `useSpecialityQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialityQuery({
 *   variables: {
 *      cisCode: // value for 'cisCode'
 *   },
 * });
 */
export function useSpecialityQuery(
  baseOptions: Apollo.QueryHookOptions<SpecialityQuery, SpecialityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SpecialityQuery, SpecialityQueryVariables>(SpecialityDocument, options);
}
export function useSpecialityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpecialityQuery, SpecialityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SpecialityQuery, SpecialityQueryVariables>(
    SpecialityDocument,
    options
  );
}
export type SpecialityQueryHookResult = ReturnType<typeof useSpecialityQuery>;
export type SpecialityLazyQueryHookResult = ReturnType<typeof useSpecialityLazyQuery>;
export type SpecialityQueryResult = Apollo.QueryResult<SpecialityQuery, SpecialityQueryVariables>;
export const SpecialitiesDocument = gql`
  query Specialities {
    getSpecialities {
      meta {
        count
      }
      specialities {
        id
        code
        name
      }
    }
  }
`;

/**
 * __useSpecialitiesQuery__
 *
 * To run a query within a React component, call `useSpecialitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpecialitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<SpecialitiesQuery, SpecialitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SpecialitiesQuery, SpecialitiesQueryVariables>(
    SpecialitiesDocument,
    options
  );
}
export function useSpecialitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpecialitiesQuery, SpecialitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SpecialitiesQuery, SpecialitiesQueryVariables>(
    SpecialitiesDocument,
    options
  );
}
export type SpecialitiesQueryHookResult = ReturnType<typeof useSpecialitiesQuery>;
export type SpecialitiesLazyQueryHookResult = ReturnType<typeof useSpecialitiesLazyQuery>;
export type SpecialitiesQueryResult = Apollo.QueryResult<
  SpecialitiesQuery,
  SpecialitiesQueryVariables
>;
export const SubstanceDocument = gql`
  query Substance($subCode: String!) {
    getSubstance(subCode: $subCode) {
      ...SubstanceFragment
    }
  }
  ${SubstanceFragmentFragmentDoc}
`;

/**
 * __useSubstanceQuery__
 *
 * To run a query within a React component, call `useSubstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubstanceQuery({
 *   variables: {
 *      subCode: // value for 'subCode'
 *   },
 * });
 */
export function useSubstanceQuery(
  baseOptions: Apollo.QueryHookOptions<SubstanceQuery, SubstanceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubstanceQuery, SubstanceQueryVariables>(SubstanceDocument, options);
}
export function useSubstanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SubstanceQuery, SubstanceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubstanceQuery, SubstanceQueryVariables>(SubstanceDocument, options);
}
export type SubstanceQueryHookResult = ReturnType<typeof useSubstanceQuery>;
export type SubstanceLazyQueryHookResult = ReturnType<typeof useSubstanceLazyQuery>;
export type SubstanceQueryResult = Apollo.QueryResult<SubstanceQuery, SubstanceQueryVariables>;
export const SubstancesDocument = gql`
  query Substances {
    getSubstances {
      meta {
        count
      }
      substances {
        id
        name
        code
      }
    }
  }
`;

/**
 * __useSubstancesQuery__
 *
 * To run a query within a React component, call `useSubstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubstancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubstancesQuery(
  baseOptions?: Apollo.QueryHookOptions<SubstancesQuery, SubstancesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubstancesQuery, SubstancesQueryVariables>(SubstancesDocument, options);
}
export function useSubstancesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SubstancesQuery, SubstancesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubstancesQuery, SubstancesQueryVariables>(
    SubstancesDocument,
    options
  );
}
export type SubstancesQueryHookResult = ReturnType<typeof useSubstancesQuery>;
export type SubstancesLazyQueryHookResult = ReturnType<typeof useSubstancesLazyQuery>;
export type SubstancesQueryResult = Apollo.QueryResult<SubstancesQuery, SubstancesQueryVariables>;
export const GlobalStatisticDocument = gql`
  query GlobalStatistic {
    getGlobalStatistics {
      repartitionPerGender {
        male {
          value
          valuePercent
        }
        female {
          value
          valuePercent
        }
      }
      repartitionPerAge {
        id
        range
        value
        valuePercent
      }
      exposition {
        consumption
        minYear
        maxYear
      }
      repartitionPerSeriousEffect {
        value
        range
        valuePercent
      }
      repartitionPerPathology {
        valuePercent
        value
        range
      }
      repartitionPerNotifier {
        id
        job
        value
        valuePercent
      }
      repartitionPerGravity {
        range
        value
        valuePercent
      }
    }
  }
`;

/**
 * __useGlobalStatisticQuery__
 *
 * To run a query within a React component, call `useGlobalStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalStatisticQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalStatisticQuery(
  baseOptions?: Apollo.QueryHookOptions<GlobalStatisticQuery, GlobalStatisticQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GlobalStatisticQuery, GlobalStatisticQueryVariables>(
    GlobalStatisticDocument,
    options
  );
}
export function useGlobalStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GlobalStatisticQuery, GlobalStatisticQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GlobalStatisticQuery, GlobalStatisticQueryVariables>(
    GlobalStatisticDocument,
    options
  );
}
export type GlobalStatisticQueryHookResult = ReturnType<typeof useGlobalStatisticQuery>;
export type GlobalStatisticLazyQueryHookResult = ReturnType<typeof useGlobalStatisticLazyQuery>;
export type GlobalStatisticQueryResult = Apollo.QueryResult<
  GlobalStatisticQuery,
  GlobalStatisticQueryVariables
>;
export const GlobalRupturesDocument = gql`
  query GlobalRuptures {
    getGlobalShortages {
      period {
        minYear
        maxYear
      }
      shortagesPerYear {
        year
        reportsCount
        casesWithMeasuresCount
        casesWithMeasuresCountPercent
        measuresCount
      }
      shortagesClassesPerYear {
        year
        value
        valuePercentClosed
        classification
      }
      shortagesCausesPerYear {
        year
        valuePercent
        value
        type
        definition
      }
      shortagesAtcPerYear {
        year
        reportsCount
        medicsCount
        code
        label
      }
      shortagesMeasuresPerYear {
        year
        value
        valuePercent
        type
        definition
      }
    }
  }
`;

/**
 * __useGlobalRupturesQuery__
 *
 * To run a query within a React component, call `useGlobalRupturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalRupturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalRupturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalRupturesQuery(
  baseOptions?: Apollo.QueryHookOptions<GlobalRupturesQuery, GlobalRupturesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GlobalRupturesQuery, GlobalRupturesQueryVariables>(
    GlobalRupturesDocument,
    options
  );
}
export function useGlobalRupturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GlobalRupturesQuery, GlobalRupturesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GlobalRupturesQuery, GlobalRupturesQueryVariables>(
    GlobalRupturesDocument,
    options
  );
}
export type GlobalRupturesQueryHookResult = ReturnType<typeof useGlobalRupturesQuery>;
export type GlobalRupturesLazyQueryHookResult = ReturnType<typeof useGlobalRupturesLazyQuery>;
export type GlobalRupturesQueryResult = Apollo.QueryResult<
  GlobalRupturesQuery,
  GlobalRupturesQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
