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

export type Cause = {
  __typename?: 'Cause';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type CisExposition = {
  __typename?: 'CisExposition';
  consumption?: Maybe<Scalars['Int']>;
  expositionLevel?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type GlobStaticRepartitionPerNotifier = {
  __typename?: 'GlobStaticRepartitionPerNotifier';
  job?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type GlobStaticRepartitionPerPathology = {
  __typename?: 'GlobStaticRepartitionPerPathology';
  id: Scalars['Int'];
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type GlobalRupture = {
  __typename?: 'GlobalRupture';
  repartitionPerAction?: Maybe<Array<Maybe<RuptureRepartitionPerAction>>>;
  repartitionPerCause?: Maybe<Array<Maybe<RuptureRepartitionPerCause>>>;
  repartitionPerClassTherapeutique?: Maybe<
    Array<Maybe<RuptureStockRepartionPerClassTherapeutiques>>
  >;
  repartitionPerClassication?: Maybe<Array<Maybe<RuptureStockRepartitionPerClassication>>>;
  ruptureStocks?: Maybe<Array<Maybe<RuptureStock>>>;
  ruptureYears?: Maybe<Array<Maybe<RuptureYear>>>;
  totalAction?: Maybe<Array<Maybe<RuptureTotalAction>>>;
};

export type GlobalStatistic = {
  __typename?: 'GlobalStatistic';
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionRange>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerGravity?: Maybe<Array<Maybe<RepartitionPerGravity>>>;
  repartitionPerNotifier?: Maybe<Array<Maybe<GlobStaticRepartitionPerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<GlobStaticRepartitionPerPathology>>>;
  repartitionPerSeriousEffect?: Maybe<Array<Maybe<RepartitionPerSeriousEffect>>>;
  totalExposition?: Maybe<TotalExposition>;
};

export type HltEffect = {
  __typename?: 'HltEffect';
  id: Scalars['Int'];
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type Icon = {
  __typename?: 'Icon';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type IndicatorValues = {
  __typename?: 'IndicatorValues';
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
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

export type MedicalErrors = {
  __typename?: 'MedicalErrors';
  apparitionStepRepartition?: Maybe<Array<Maybe<RepartitionRange>>>;
  natureRepartition?: Maybe<Array<Maybe<RepartitionRange>>>;
  populationRepartition?: Maybe<Array<Maybe<RepartitionRange>>>;
  sideEffectsOriginRepartition?: Maybe<WithRepartition>;
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

export type PharmaForm = {
  __typename?: 'PharmaForm';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

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
  getGlobalRupture?: Maybe<GlobalRupture>;
  getGlobalStatistic?: Maybe<GlobalStatistic>;
  getSpecialities?: Maybe<SpecialitiesReturn>;
  getSpeciality?: Maybe<Speciality>;
  getSpecialityIdByCode?: Maybe<Scalars['Int']>;
  getSubstance?: Maybe<Substance>;
  getSubstances?: Maybe<SubstancesReturn>;
};

export type QueryGetSpecialityArgs = {
  cisCode: Scalars['String'];
};

export type QueryGetSpecialityIdByCodeArgs = {
  cisCode: Scalars['String'];
};

export type QueryGetSubstanceArgs = {
  subCode: Scalars['String'];
};

export type RepartitionPerGender = {
  __typename?: 'RepartitionPerGender';
  female?: Maybe<IndicatorValues>;
  male?: Maybe<IndicatorValues>;
};

export type RepartitionPerGravity = {
  __typename?: 'RepartitionPerGravity';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RepartitionPerNotifier = {
  __typename?: 'RepartitionPerNotifier';
  id: Scalars['Int'];
  job?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RepartitionPerPathology = {
  __typename?: 'RepartitionPerPathology';
  htlEffects?: Maybe<Array<Maybe<HltEffect>>>;
  id: Scalars['Int'];
  range?: Maybe<Scalars['String']>;
  subId: Scalars['Int'];
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RepartitionPerSeriousEffect = {
  __typename?: 'RepartitionPerSeriousEffect';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RepartitionRange = {
  __typename?: 'RepartitionRange';
  id?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RuptureAction = {
  __typename?: 'RuptureAction';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type RuptureCause = {
  __typename?: 'RuptureCause';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type RuptureClass = {
  __typename?: 'RuptureClass';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type RuptureExposition = {
  __typename?: 'RuptureExposition';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RuptureRepartitionPerAction = {
  __typename?: 'RuptureRepartitionPerAction';
  actions?: Maybe<Array<Maybe<RuptureAction>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureRepartitionPerCause = {
  __typename?: 'RuptureRepartitionPerCause';
  causes?: Maybe<Array<Maybe<Cause>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureStock = {
  __typename?: 'RuptureStock';
  nbRisque?: Maybe<Scalars['Int']>;
  nbRisqueClosed?: Maybe<Scalars['Int']>;
  nbRupture?: Maybe<Scalars['Int']>;
  nbRuptureClosed?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureStockRepartionPerClassTherapeutique = {
  __typename?: 'RuptureStockRepartionPerClassTherapeutique';
  name?: Maybe<Scalars['String']>;
  totalCis?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
};

export type RuptureStockRepartionPerClassTherapeutiques = {
  __typename?: 'RuptureStockRepartionPerClassTherapeutiques';
  repartitions?: Maybe<Array<Maybe<RuptureStockRepartionPerClassTherapeutique>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureStockRepartitionPerClassication = {
  __typename?: 'RuptureStockRepartitionPerClassication';
  classification?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureTotalAction = {
  __typename?: 'RuptureTotalAction';
  total?: Maybe<Scalars['Int']>;
  totalWithOneAction?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureTotalExposition = {
  __typename?: 'RuptureTotalExposition';
  ruptureExpositions?: Maybe<Array<Maybe<RuptureExposition>>>;
  total: Scalars['Int'];
  year?: Maybe<Scalars['Int']>;
};

export type RuptureYear = {
  __typename?: 'RuptureYear';
  value?: Maybe<Scalars['Int']>;
};

export type SpecialitiesReturn = {
  __typename?: 'SpecialitiesReturn';
  meta?: Maybe<Meta>;
  specialities?: Maybe<Array<Maybe<SpecialityLight>>>;
};

export type Speciality = {
  __typename?: 'Speciality';
  atc?: Maybe<MedicalAtc>;
  code: Scalars['String'];
  commercialisationState?: Maybe<Scalars['String']>;
  commercialisationType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dosageIndication?: Maybe<Scalars['String']>;
  dosageSubstances?: Maybe<Array<Maybe<SpecialitySubstance>>>;
  exposition?: Maybe<CisExposition>;
  icon?: Maybe<Icon>;
  id: Scalars['Int'];
  laboratory?: Maybe<Laboratory>;
  medicalErrors?: Maybe<MedicalErrors>;
  name: Scalars['String'];
  pharmaForm?: Maybe<PharmaForm>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionRange>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  rupturesHistory?: Maybe<SpecialityRupturesHistory>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type SpecialityLight = {
  __typename?: 'SpecialityLight';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exposition?: Maybe<CisExposition>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SpecialityRupture = {
  __typename?: 'SpecialityRupture';
  active?: Maybe<Scalars['Boolean']>;
  cause?: Maybe<RuptureCause>;
  classification?: Maybe<RuptureClass>;
  date?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  num?: Maybe<Scalars['String']>;
};

export type SpecialityRupturesHistory = {
  __typename?: 'SpecialityRupturesHistory';
  meta?: Maybe<Meta>;
  ruptures?: Maybe<Array<Maybe<SpecialityRupture>>>;
};

export type SpecialitySubstance = {
  __typename?: 'SpecialitySubstance';
  code: Scalars['String'];
  dosage?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Substance = {
  __typename?: 'Substance';
  code: Scalars['String'];
  exposition?: Maybe<CisExposition>;
  id: Scalars['Int'];
  name: Scalars['String'];
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionRange>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerNotifier?: Maybe<Array<Maybe<RepartitionPerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<RepartitionPerPathology>>>;
  retrieveSpecialities?: Maybe<SpecialitiesReturn>;
  totalExposition?: Maybe<TotalExposition>;
};

export type SubstancesReturn = {
  __typename?: 'SubstancesReturn';
  meta?: Maybe<Meta>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type TotalExposition = {
  __typename?: 'TotalExposition';
  maxYear?: Maybe<Scalars['Int']>;
  minYear?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
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
  description?: string | null;
  dosageIndication?: string | null;
  commercialisationState?: string | null;
  commercialisationType?: string | null;
  atc?: {
    __typename?: 'MedicalATC';
    id: number;
    name?: string | null;
    code?: string | null;
  } | null;
  pharmaForm?: { __typename?: 'PharmaForm'; id: number; name?: string | null } | null;
  substances?: Array<{
    __typename?: 'Substance';
    id: number;
    code: string;
    name: string;
    retrieveSpecialities?: {
      __typename?: 'SpecialitiesReturn';
      meta?: { __typename?: 'Meta'; count?: number | null } | null;
      specialities?: Array<{
        __typename?: 'SpecialityLight';
        id: number;
        code: string;
        name: string;
        description?: string | null;
      } | null> | null;
    } | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
      female?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'RepartitionPerNotifier';
      id: number;
      job?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'RepartitionPerPathology';
      id: number;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
      htlEffects?: Array<{
        __typename?: 'HltEffect';
        id: number;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
    } | null> | null;
    totalExposition?: {
      __typename?: 'TotalExposition';
      total: number;
      minYear?: number | null;
      maxYear?: number | null;
    } | null;
    exposition?: {
      __typename?: 'CisExposition';
      id: number;
      consumption?: number | null;
      expositionLevel?: number | null;
    } | null;
  } | null> | null;
  dosageSubstances?: Array<{
    __typename?: 'SpecialitySubstance';
    id: number;
    code: string;
    name: string;
    dosage?: string | null;
  } | null> | null;
  repartitionPerGender?: {
    __typename?: 'RepartitionPerGender';
    male?: {
      __typename?: 'IndicatorValues';
      value?: number | null;
      valuePercent?: number | null;
    } | null;
    female?: {
      __typename?: 'IndicatorValues';
      value?: number | null;
      valuePercent?: number | null;
    } | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'RepartitionRange';
    id?: number | null;
    range?: string | null;
    value?: number | null;
    valuePercent?: number | null;
  } | null> | null;
  publications?: Array<{
    __typename?: 'Publication';
    id: number;
    name: string;
    link?: string | null;
    type?: { __typename?: 'PublicationType'; id?: number | null; name?: string | null } | null;
  } | null> | null;
  icon?: { __typename?: 'Icon'; id: number; name?: string | null } | null;
  laboratory?: { __typename?: 'Laboratory'; id: number; name?: string | null } | null;
  exposition?: {
    __typename?: 'CisExposition';
    id: number;
    consumption?: number | null;
    expositionLevel?: number | null;
  } | null;
  medicalErrors?: {
    __typename?: 'MedicalErrors';
    populationRepartition?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    sideEffectsOriginRepartition?: {
      __typename?: 'WithRepartition';
      with?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
      without?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
    } | null;
    apparitionStepRepartition?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    natureRepartition?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
  } | null;
  rupturesHistory?: {
    __typename?: 'SpecialityRupturesHistory';
    ruptures?: Array<{
      __typename?: 'SpecialityRupture';
      id: number;
      num?: string | null;
      name?: string | null;
      active?: boolean | null;
      date?: string | null;
      cause?: { __typename?: 'RuptureCause'; id: number; name?: string | null } | null;
      classification?: { __typename?: 'RuptureClass'; id: number; name?: string | null } | null;
    } | null> | null;
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
  } | null;
};

export type SubstanceFragmentFragment = {
  __typename?: 'Substance';
  id: number;
  code: string;
  name: string;
  retrieveSpecialities?: {
    __typename?: 'SpecialitiesReturn';
    meta?: { __typename?: 'Meta'; count?: number | null } | null;
    specialities?: Array<{
      __typename?: 'SpecialityLight';
      id: number;
      code: string;
      name: string;
      description?: string | null;
    } | null> | null;
  } | null;
  repartitionPerGender?: {
    __typename?: 'RepartitionPerGender';
    male?: {
      __typename?: 'IndicatorValues';
      value?: number | null;
      valuePercent?: number | null;
    } | null;
    female?: {
      __typename?: 'IndicatorValues';
      value?: number | null;
      valuePercent?: number | null;
    } | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'RepartitionRange';
    id?: number | null;
    range?: string | null;
    value?: number | null;
    valuePercent?: number | null;
  } | null> | null;
  repartitionPerNotifier?: Array<{
    __typename?: 'RepartitionPerNotifier';
    id: number;
    job?: string | null;
    value?: number | null;
    valuePercent?: number | null;
  } | null> | null;
  repartitionPerPathology?: Array<{
    __typename?: 'RepartitionPerPathology';
    id: number;
    range?: string | null;
    value?: number | null;
    valuePercent?: number | null;
    htlEffects?: Array<{
      __typename?: 'HltEffect';
      id: number;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
  } | null> | null;
  totalExposition?: {
    __typename?: 'TotalExposition';
    total: number;
    minYear?: number | null;
    maxYear?: number | null;
  } | null;
  exposition?: {
    __typename?: 'CisExposition';
    id: number;
    consumption?: number | null;
    expositionLevel?: number | null;
  } | null;
};

export type SpecialityIdByCodeQueryVariables = Exact<{
  cisCode: Scalars['String'];
}>;

export type SpecialityIdByCodeQuery = {
  __typename?: 'Query';
  getSpecialityIdByCode?: number | null;
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
    description?: string | null;
    dosageIndication?: string | null;
    commercialisationState?: string | null;
    commercialisationType?: string | null;
    atc?: {
      __typename?: 'MedicalATC';
      id: number;
      name?: string | null;
      code?: string | null;
    } | null;
    pharmaForm?: { __typename?: 'PharmaForm'; id: number; name?: string | null } | null;
    substances?: Array<{
      __typename?: 'Substance';
      id: number;
      code: string;
      name: string;
      retrieveSpecialities?: {
        __typename?: 'SpecialitiesReturn';
        meta?: { __typename?: 'Meta'; count?: number | null } | null;
        specialities?: Array<{
          __typename?: 'SpecialityLight';
          id: number;
          code: string;
          name: string;
          description?: string | null;
        } | null> | null;
      } | null;
      repartitionPerGender?: {
        __typename?: 'RepartitionPerGender';
        male?: {
          __typename?: 'IndicatorValues';
          value?: number | null;
          valuePercent?: number | null;
        } | null;
        female?: {
          __typename?: 'IndicatorValues';
          value?: number | null;
          valuePercent?: number | null;
        } | null;
      } | null;
      repartitionPerAge?: Array<{
        __typename?: 'RepartitionRange';
        id?: number | null;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
      repartitionPerNotifier?: Array<{
        __typename?: 'RepartitionPerNotifier';
        id: number;
        job?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
      repartitionPerPathology?: Array<{
        __typename?: 'RepartitionPerPathology';
        id: number;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
        htlEffects?: Array<{
          __typename?: 'HltEffect';
          id: number;
          range?: string | null;
          value?: number | null;
          valuePercent?: number | null;
        } | null> | null;
      } | null> | null;
      totalExposition?: {
        __typename?: 'TotalExposition';
        total: number;
        minYear?: number | null;
        maxYear?: number | null;
      } | null;
      exposition?: {
        __typename?: 'CisExposition';
        id: number;
        consumption?: number | null;
        expositionLevel?: number | null;
      } | null;
    } | null> | null;
    dosageSubstances?: Array<{
      __typename?: 'SpecialitySubstance';
      id: number;
      code: string;
      name: string;
      dosage?: string | null;
    } | null> | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
      female?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    publications?: Array<{
      __typename?: 'Publication';
      id: number;
      name: string;
      link?: string | null;
      type?: { __typename?: 'PublicationType'; id?: number | null; name?: string | null } | null;
    } | null> | null;
    icon?: { __typename?: 'Icon'; id: number; name?: string | null } | null;
    laboratory?: { __typename?: 'Laboratory'; id: number; name?: string | null } | null;
    exposition?: {
      __typename?: 'CisExposition';
      id: number;
      consumption?: number | null;
      expositionLevel?: number | null;
    } | null;
    medicalErrors?: {
      __typename?: 'MedicalErrors';
      populationRepartition?: Array<{
        __typename?: 'RepartitionRange';
        id?: number | null;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
      sideEffectsOriginRepartition?: {
        __typename?: 'WithRepartition';
        with?: {
          __typename?: 'IndicatorValues';
          value?: number | null;
          valuePercent?: number | null;
        } | null;
        without?: {
          __typename?: 'IndicatorValues';
          value?: number | null;
          valuePercent?: number | null;
        } | null;
      } | null;
      apparitionStepRepartition?: Array<{
        __typename?: 'RepartitionRange';
        id?: number | null;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
      natureRepartition?: Array<{
        __typename?: 'RepartitionRange';
        id?: number | null;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
    } | null;
    rupturesHistory?: {
      __typename?: 'SpecialityRupturesHistory';
      ruptures?: Array<{
        __typename?: 'SpecialityRupture';
        id: number;
        num?: string | null;
        name?: string | null;
        active?: boolean | null;
        date?: string | null;
        cause?: { __typename?: 'RuptureCause'; id: number; name?: string | null } | null;
        classification?: { __typename?: 'RuptureClass'; id: number; name?: string | null } | null;
      } | null> | null;
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
    retrieveSpecialities?: {
      __typename?: 'SpecialitiesReturn';
      meta?: { __typename?: 'Meta'; count?: number | null } | null;
      specialities?: Array<{
        __typename?: 'SpecialityLight';
        id: number;
        code: string;
        name: string;
        description?: string | null;
      } | null> | null;
    } | null;
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
      female?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'RepartitionPerNotifier';
      id: number;
      job?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'RepartitionPerPathology';
      id: number;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
      htlEffects?: Array<{
        __typename?: 'HltEffect';
        id: number;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
      } | null> | null;
    } | null> | null;
    totalExposition?: {
      __typename?: 'TotalExposition';
      total: number;
      minYear?: number | null;
      maxYear?: number | null;
    } | null;
    exposition?: {
      __typename?: 'CisExposition';
      id: number;
      consumption?: number | null;
      expositionLevel?: number | null;
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
  getGlobalStatistic?: {
    __typename?: 'GlobalStatistic';
    repartitionPerGender?: {
      __typename?: 'RepartitionPerGender';
      male?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
      female?: {
        __typename?: 'IndicatorValues';
        value?: number | null;
        valuePercent?: number | null;
      } | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionRange';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
    totalExposition?: {
      __typename?: 'TotalExposition';
      total: number;
      minYear?: number | null;
      maxYear?: number | null;
    } | null;
    repartitionPerSeriousEffect?: Array<{
      __typename?: 'RepartitionPerSeriousEffect';
      value?: number | null;
      range?: string | null;
      valuePercent?: number | null;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'GlobStaticRepartitionPerPathology';
      valuePercent?: number | null;
      value?: number | null;
      range?: string | null;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'GlobStaticRepartitionPerNotifier';
      value?: number | null;
      valuePercent?: number | null;
      job?: string | null;
    } | null> | null;
    repartitionPerGravity?: Array<{
      __typename?: 'RepartitionPerGravity';
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
    } | null> | null;
  } | null;
};

export type GlobalRuptureQueryVariables = Exact<{ [key: string]: never }>;

export type GlobalRuptureQuery = {
  __typename?: 'Query';
  getGlobalRupture?: {
    __typename?: 'GlobalRupture';
    repartitionPerClassication?: Array<{
      __typename?: 'RuptureStockRepartitionPerClassication';
      value?: number | null;
      classification?: string | null;
      year?: number | null;
    } | null> | null;
    ruptureStocks?: Array<{
      __typename?: 'RuptureStock';
      year?: number | null;
      total?: number | null;
      nbRisque?: number | null;
      nbRisqueClosed?: number | null;
      nbRuptureClosed?: number | null;
      nbRupture?: number | null;
    } | null> | null;
    ruptureYears?: Array<{ __typename?: 'RuptureYear'; value?: number | null } | null> | null;
    repartitionPerCause?: Array<{
      __typename?: 'RuptureRepartitionPerCause';
      year?: number | null;
      total?: number | null;
      causes?: Array<{
        __typename?: 'Cause';
        value?: number | null;
        range?: string | null;
      } | null> | null;
    } | null> | null;
    repartitionPerAction?: Array<{
      __typename?: 'RuptureRepartitionPerAction';
      year?: number | null;
      total?: number | null;
      actions?: Array<{
        __typename?: 'RuptureAction';
        value?: number | null;
        range?: string | null;
      } | null> | null;
    } | null> | null;
    repartitionPerClassTherapeutique?: Array<{
      __typename?: 'RuptureStockRepartionPerClassTherapeutiques';
      year?: number | null;
      total?: number | null;
      repartitions?: Array<{
        __typename?: 'RuptureStockRepartionPerClassTherapeutique';
        name?: string | null;
        value?: number | null;
        totalCis?: number | null;
      } | null> | null;
    } | null> | null;
    totalAction?: Array<{
      __typename?: 'RuptureTotalAction';
      year?: number | null;
      total?: number | null;
      totalWithOneAction?: number | null;
    } | null> | null;
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
    retrieveSpecialities {
      meta {
        count
      }
      specialities {
        id
        code
        name
        description
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
      id
      range
      value
      valuePercent
    }
    repartitionPerNotifier {
      id
      job
      value
      valuePercent
    }
    repartitionPerPathology {
      id
      range
      value
      valuePercent
      htlEffects {
        id
        range
        value
        valuePercent
      }
    }
    totalExposition {
      total
      minYear
      maxYear
    }
    exposition {
      id
      consumption
      expositionLevel
    }
  }
`;
export const SpecialityFragmentFragmentDoc = gql`
  fragment SpecialityFragment on Speciality {
    id
    name
    code
    description
    atc {
      id
      name
      code
    }
    pharmaForm {
      id
      name
    }
    substances {
      ...SubstanceFragment
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
      id
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
    icon {
      id
      name
    }
    laboratory {
      id
      name
    }
    exposition {
      id
      consumption
      expositionLevel
    }
    medicalErrors {
      populationRepartition {
        id
        range
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
        id
        range
        value
        valuePercent
      }
      natureRepartition {
        id
        range
        value
        valuePercent
      }
    }
    rupturesHistory {
      ruptures {
        id
        num
        name
        active
        date
        cause {
          id
          name
        }
        classification {
          id
          name
        }
      }
      meta {
        count
      }
    }
  }
  ${SubstanceFragmentFragmentDoc}
`;
export const SpecialityIdByCodeDocument = gql`
  query SpecialityIdByCode($cisCode: String!) {
    getSpecialityIdByCode(cisCode: $cisCode)
  }
`;

/**
 * __useSpecialityIdByCodeQuery__
 *
 * To run a query within a React component, call `useSpecialityIdByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialityIdByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialityIdByCodeQuery({
 *   variables: {
 *      cisCode: // value for 'cisCode'
 *   },
 * });
 */
export function useSpecialityIdByCodeQuery(
  baseOptions: Apollo.QueryHookOptions<SpecialityIdByCodeQuery, SpecialityIdByCodeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SpecialityIdByCodeQuery, SpecialityIdByCodeQueryVariables>(
    SpecialityIdByCodeDocument,
    options
  );
}
export function useSpecialityIdByCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SpecialityIdByCodeQuery,
    SpecialityIdByCodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SpecialityIdByCodeQuery, SpecialityIdByCodeQueryVariables>(
    SpecialityIdByCodeDocument,
    options
  );
}
export type SpecialityIdByCodeQueryHookResult = ReturnType<typeof useSpecialityIdByCodeQuery>;
export type SpecialityIdByCodeLazyQueryHookResult = ReturnType<
  typeof useSpecialityIdByCodeLazyQuery
>;
export type SpecialityIdByCodeQueryResult = Apollo.QueryResult<
  SpecialityIdByCodeQuery,
  SpecialityIdByCodeQueryVariables
>;
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
    getGlobalStatistic {
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
      totalExposition {
        total
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
        value
        valuePercent
        job
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
export const GlobalRuptureDocument = gql`
  query GlobalRupture {
    getGlobalRupture {
      repartitionPerClassication {
        value
        classification
        year
      }
      ruptureStocks {
        year
        total
        nbRisque
        nbRisqueClosed
        nbRuptureClosed
        nbRupture
      }
      ruptureYears {
        value
      }
      repartitionPerCause {
        year
        causes {
          value
          range
        }
        total
      }
      repartitionPerAction {
        year
        total
        actions {
          value
          range
        }
      }
      repartitionPerClassTherapeutique {
        year
        total
        repartitions {
          name
          value
          totalCis
        }
      }
      totalAction {
        year
        total
        totalWithOneAction
      }
    }
  }
`;

/**
 * __useGlobalRuptureQuery__
 *
 * To run a query within a React component, call `useGlobalRuptureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalRuptureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalRuptureQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalRuptureQuery(
  baseOptions?: Apollo.QueryHookOptions<GlobalRuptureQuery, GlobalRuptureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GlobalRuptureQuery, GlobalRuptureQueryVariables>(
    GlobalRuptureDocument,
    options
  );
}
export function useGlobalRuptureLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GlobalRuptureQuery, GlobalRuptureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GlobalRuptureQuery, GlobalRuptureQueryVariables>(
    GlobalRuptureDocument,
    options
  );
}
export type GlobalRuptureQueryHookResult = ReturnType<typeof useGlobalRuptureQuery>;
export type GlobalRuptureLazyQueryHookResult = ReturnType<typeof useGlobalRuptureLazyQuery>;
export type GlobalRuptureQueryResult = Apollo.QueryResult<
  GlobalRuptureQuery,
  GlobalRuptureQueryVariables
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
