import { GraphQLResolveInfo } from 'graphql';
import { ContextValue } from '../../server';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EntityExposition: ResolverTypeWrapper<EntityExposition>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GlobalExpositionPeriod: ResolverTypeWrapper<GlobalExpositionPeriod>;
  GlobalShortages: ResolverTypeWrapper<GlobalShortages>;
  GlobalStatistics: ResolverTypeWrapper<GlobalStatistics>;
  GlobalStatsUsagePerAge: ResolverTypeWrapper<GlobalStatsUsagePerAge>;
  GlobalStatsUsagePerGravity: ResolverTypeWrapper<GlobalStatsUsagePerGravity>;
  GlobalStatsUsagePerNotifier: ResolverTypeWrapper<GlobalStatsUsagePerNotifier>;
  GlobalStatsUsagePerPathology: ResolverTypeWrapper<GlobalStatsUsagePerPathology>;
  GlobalStatsUsagePerSeriousEffect: ResolverTypeWrapper<GlobalStatsUsagePerSeriousEffect>;
  HltEffect: ResolverTypeWrapper<HltEffect>;
  IndicatorValues: ResolverTypeWrapper<IndicatorValues>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Laboratory: ResolverTypeWrapper<Laboratory>;
  LoginResult: ResolverTypeWrapper<LoginResult>;
  MedicalATC: ResolverTypeWrapper<MedicalAtc>;
  MedicalError: ResolverTypeWrapper<MedicalError>;
  MedicalErrorApparitionStep: MedicalErrorApparitionStep;
  MedicalErrorNature: MedicalErrorNature;
  MedicalErrors: ResolverTypeWrapper<MedicalErrors>;
  MedicalErrorsApparitionStep: ResolverTypeWrapper<MedicalErrorsApparitionStep>;
  MedicalErrorsNature: ResolverTypeWrapper<MedicalErrorsNature>;
  MedicalErrorsPopulation: ResolverTypeWrapper<MedicalErrorsPopulation>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  Period: ResolverTypeWrapper<Period>;
  PharmaForm: ResolverTypeWrapper<PharmaForm>;
  PharmaFormType: PharmaFormType;
  Publication: ResolverTypeWrapper<Publication>;
  PublicationType: ResolverTypeWrapper<PublicationType>;
  Query: ResolverTypeWrapper<{}>;
  RepartitionPerAge: ResolverTypeWrapper<RepartitionPerAge>;
  RepartitionPerGender: ResolverTypeWrapper<RepartitionPerGender>;
  RepartitionPerNotifier: ResolverTypeWrapper<RepartitionPerNotifier>;
  RepartitionPerPathology: ResolverTypeWrapper<RepartitionPerPathology>;
  RupturesTotalActionPerYear: ResolverTypeWrapper<RupturesTotalActionPerYear>;
  ShortageCis: ResolverTypeWrapper<ShortageCis>;
  ShortagesActionsPerYear: ResolverTypeWrapper<ShortagesActionsPerYear>;
  ShortagesAtcPerYear: ResolverTypeWrapper<ShortagesAtcPerYear>;
  ShortagesCausesPerYear: ResolverTypeWrapper<ShortagesCausesPerYear>;
  ShortagesClassPerYear: ResolverTypeWrapper<ShortagesClassPerYear>;
  ShortagesMeasuresPerYear: ResolverTypeWrapper<ShortagesMeasuresPerYear>;
  ShortagesPerYear: ResolverTypeWrapper<ShortagesPerYear>;
  SpecialitiesReturn: ResolverTypeWrapper<SpecialitiesReturn>;
  Speciality: ResolverTypeWrapper<Speciality>;
  SpecialityAssociatedShortage: ResolverTypeWrapper<SpecialityAssociatedShortage>;
  SpecialityLight: ResolverTypeWrapper<SpecialityLight>;
  SpecialityRuptureCause: ResolverTypeWrapper<SpecialityRuptureCause>;
  SpecialityRupturesHistory: ResolverTypeWrapper<SpecialityRupturesHistory>;
  SpecialitySubstance: ResolverTypeWrapper<SpecialitySubstance>;
  SpecialityUsagePerAge: ResolverTypeWrapper<SpecialityUsagePerAge>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Substance: ResolverTypeWrapper<Substance>;
  SubstanceSideEffects: ResolverTypeWrapper<SubstanceSideEffects>;
  SubstanceSideEffectsDeclarations: ResolverTypeWrapper<SubstanceSideEffectsDeclarations>;
  SubstancesReturn: ResolverTypeWrapper<SubstancesReturn>;
  TotalDeclarationsWithMeasure: ResolverTypeWrapper<TotalDeclarationsWithMeasure>;
  WithRepartition: ResolverTypeWrapper<WithRepartition>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  EntityExposition: EntityExposition;
  Float: Scalars['Float'];
  GlobalExpositionPeriod: GlobalExpositionPeriod;
  GlobalShortages: GlobalShortages;
  GlobalStatistics: GlobalStatistics;
  GlobalStatsUsagePerAge: GlobalStatsUsagePerAge;
  GlobalStatsUsagePerGravity: GlobalStatsUsagePerGravity;
  GlobalStatsUsagePerNotifier: GlobalStatsUsagePerNotifier;
  GlobalStatsUsagePerPathology: GlobalStatsUsagePerPathology;
  GlobalStatsUsagePerSeriousEffect: GlobalStatsUsagePerSeriousEffect;
  HltEffect: HltEffect;
  IndicatorValues: IndicatorValues;
  Int: Scalars['Int'];
  Laboratory: Laboratory;
  LoginResult: LoginResult;
  MedicalATC: MedicalAtc;
  MedicalError: MedicalError;
  MedicalErrors: MedicalErrors;
  MedicalErrorsApparitionStep: MedicalErrorsApparitionStep;
  MedicalErrorsNature: MedicalErrorsNature;
  MedicalErrorsPopulation: MedicalErrorsPopulation;
  Meta: Meta;
  Mutation: {};
  Period: Period;
  PharmaForm: PharmaForm;
  Publication: Publication;
  PublicationType: PublicationType;
  Query: {};
  RepartitionPerAge: RepartitionPerAge;
  RepartitionPerGender: RepartitionPerGender;
  RepartitionPerNotifier: RepartitionPerNotifier;
  RepartitionPerPathology: RepartitionPerPathology;
  RupturesTotalActionPerYear: RupturesTotalActionPerYear;
  ShortageCis: ShortageCis;
  ShortagesActionsPerYear: ShortagesActionsPerYear;
  ShortagesAtcPerYear: ShortagesAtcPerYear;
  ShortagesCausesPerYear: ShortagesCausesPerYear;
  ShortagesClassPerYear: ShortagesClassPerYear;
  ShortagesMeasuresPerYear: ShortagesMeasuresPerYear;
  ShortagesPerYear: ShortagesPerYear;
  SpecialitiesReturn: SpecialitiesReturn;
  Speciality: Speciality;
  SpecialityAssociatedShortage: SpecialityAssociatedShortage;
  SpecialityLight: SpecialityLight;
  SpecialityRuptureCause: SpecialityRuptureCause;
  SpecialityRupturesHistory: SpecialityRupturesHistory;
  SpecialitySubstance: SpecialitySubstance;
  SpecialityUsagePerAge: SpecialityUsagePerAge;
  String: Scalars['String'];
  Substance: Substance;
  SubstanceSideEffects: SubstanceSideEffects;
  SubstanceSideEffectsDeclarations: SubstanceSideEffectsDeclarations;
  SubstancesReturn: SubstancesReturn;
  TotalDeclarationsWithMeasure: TotalDeclarationsWithMeasure;
  WithRepartition: WithRepartition;
};

export type CapitalizeDirectiveArgs = {};

export type CapitalizeDirectiveResolver<
  Result,
  Parent,
  ContextType = ContextValue,
  Args = CapitalizeDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LowercaseDirectiveArgs = {};

export type LowercaseDirectiveResolver<
  Result,
  Parent,
  ContextType = ContextValue,
  Args = LowercaseDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UppercaseDirectiveArgs = {};

export type UppercaseDirectiveResolver<
  Result,
  Parent,
  ContextType = ContextValue,
  Args = UppercaseDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityExpositionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['EntityExposition'] = ResolversParentTypes['EntityExposition']
> = {
  consumption?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  openMedicPeriod?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalExpositionPeriodResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalExpositionPeriod'] = ResolversParentTypes['GlobalExpositionPeriod']
> = {
  consumption?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalShortagesResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalShortages'] = ResolversParentTypes['GlobalShortages']
> = {
  period?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  shortagesAtcPerYear?: Resolver<
    Maybe<Array<ResolversTypes['ShortagesAtcPerYear']>>,
    ParentType,
    ContextType
  >;
  shortagesCausesPerYear?: Resolver<
    Maybe<Array<ResolversTypes['ShortagesCausesPerYear']>>,
    ParentType,
    ContextType
  >;
  shortagesClassesPerYear?: Resolver<
    Maybe<Array<ResolversTypes['ShortagesClassPerYear']>>,
    ParentType,
    ContextType
  >;
  shortagesMeasuresPerYear?: Resolver<
    Maybe<Array<ResolversTypes['ShortagesMeasuresPerYear']>>,
    ParentType,
    ContextType
  >;
  shortagesPerYear?: Resolver<
    Maybe<Array<ResolversTypes['ShortagesPerYear']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatisticsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatistics'] = ResolversParentTypes['GlobalStatistics']
> = {
  exposition?: Resolver<Maybe<ResolversTypes['GlobalExpositionPeriod']>, ParentType, ContextType>;
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobalStatsUsagePerAge']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerGender?: Resolver<
    Maybe<ResolversTypes['RepartitionPerGender']>,
    ParentType,
    ContextType
  >;
  repartitionPerGravity?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobalStatsUsagePerGravity']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerNotifier?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobalStatsUsagePerNotifier']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerPathology?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobalStatsUsagePerPathology']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerSeriousEffect?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobalStatsUsagePerSeriousEffect']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsUsagePerAgeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatsUsagePerAge'] = ResolversParentTypes['GlobalStatsUsagePerAge']
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsUsagePerGravityResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatsUsagePerGravity'] = ResolversParentTypes['GlobalStatsUsagePerGravity']
> = {
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsUsagePerNotifierResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatsUsagePerNotifier'] = ResolversParentTypes['GlobalStatsUsagePerNotifier']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsUsagePerPathologyResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatsUsagePerPathology'] = ResolversParentTypes['GlobalStatsUsagePerPathology']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsUsagePerSeriousEffectResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatsUsagePerSeriousEffect'] = ResolversParentTypes['GlobalStatsUsagePerSeriousEffect']
> = {
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HltEffectResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['HltEffect'] = ResolversParentTypes['HltEffect']
> = {
  hltEffectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IndicatorValuesResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['IndicatorValues'] = ResolversParentTypes['IndicatorValues']
> = {
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LaboratoryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Laboratory'] = ResolversParentTypes['Laboratory']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalAtcResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalATC'] = ResolversParentTypes['MedicalATC']
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalErrorResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalError'] = ResolversParentTypes['MedicalError']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalErrorsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalErrors'] = ResolversParentTypes['MedicalErrors']
> = {
  apparitionStepRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['MedicalErrorsApparitionStep']>>>,
    ParentType,
    ContextType
  >;
  errMedPeriod?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  natureRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['MedicalErrorsNature']>>>,
    ParentType,
    ContextType
  >;
  populationRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['MedicalErrorsPopulation']>>>,
    ParentType,
    ContextType
  >;
  sideEffectsOriginRepartition?: Resolver<
    Maybe<ResolversTypes['WithRepartition']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalErrorsApparitionStepResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalErrorsApparitionStep'] = ResolversParentTypes['MedicalErrorsApparitionStep']
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  step?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalErrorsNatureResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalErrorsNature'] = ResolversParentTypes['MedicalErrorsNature']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalErrorsPopulationResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalErrorsPopulation'] = ResolversParentTypes['MedicalErrorsPopulation']
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']
> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    Maybe<ResolversTypes['LoginResult']>,
    ParentType,
    ContextType,
    Partial<MutationLoginArgs>
  >;
};

export type PeriodResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Period'] = ResolversParentTypes['Period']
> = {
  maxMonth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minMonth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PharmaFormResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['PharmaForm'] = ResolversParentTypes['PharmaForm']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['PublicationType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationTypeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['PublicationType'] = ResolversParentTypes['PublicationType']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getGlobalShortages?: Resolver<Maybe<ResolversTypes['GlobalShortages']>, ParentType, ContextType>;
  getGlobalStatistics?: Resolver<
    Maybe<ResolversTypes['GlobalStatistics']>,
    ParentType,
    ContextType
  >;
  getSpecialities?: Resolver<Maybe<ResolversTypes['SpecialitiesReturn']>, ParentType, ContextType>;
  getSpeciality?: Resolver<
    Maybe<ResolversTypes['Speciality']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSpecialityArgs, 'cisCode'>
  >;
  getSubstance?: Resolver<
    Maybe<ResolversTypes['Substance']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSubstanceArgs, 'subCode'>
  >;
  getSubstances?: Resolver<Maybe<ResolversTypes['SubstancesReturn']>, ParentType, ContextType>;
};

export type RepartitionPerAgeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerAge'] = ResolversParentTypes['RepartitionPerAge']
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepartitionPerGenderResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerGender'] = ResolversParentTypes['RepartitionPerGender']
> = {
  female?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  male?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepartitionPerNotifierResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerNotifier'] = ResolversParentTypes['RepartitionPerNotifier']
> = {
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notifierId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepartitionPerPathologyResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerPathology'] = ResolversParentTypes['RepartitionPerPathology']
> = {
  htlEffects?: Resolver<Maybe<Array<Maybe<ResolversTypes['HltEffect']>>>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RupturesTotalActionPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RupturesTotalActionPerYear'] = ResolversParentTypes['RupturesTotalActionPerYear']
> = {
  totalDeclarationsWithMeasure?: Resolver<
    Maybe<ResolversTypes['TotalDeclarationsWithMeasure']>,
    ParentType,
    ContextType
  >;
  totalMeasures?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortageCisResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortageCis'] = ResolversParentTypes['ShortageCis']
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesActionsPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesActionsPerYear'] = ResolversParentTypes['ShortagesActionsPerYear']
> = {
  actionsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  declarationsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  declarationsWithActionsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  declarationsWithActionsPercent?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesAtcPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesAtcPerYear'] = ResolversParentTypes['ShortagesAtcPerYear']
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medicsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reportsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesCausesPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesCausesPerYear'] = ResolversParentTypes['ShortagesCausesPerYear']
> = {
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesClassPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesClassPerYear'] = ResolversParentTypes['ShortagesClassPerYear']
> = {
  classification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercentClosed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesMeasuresPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesMeasuresPerYear'] = ResolversParentTypes['ShortagesMeasuresPerYear']
> = {
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortagesPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['ShortagesPerYear'] = ResolversParentTypes['ShortagesPerYear']
> = {
  casesWithMeasuresCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  casesWithMeasuresCountPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  measuresCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reportsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialitiesReturnResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialitiesReturn'] = ResolversParentTypes['SpecialitiesReturn']
> = {
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  specialities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialityLight']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Speciality'] = ResolversParentTypes['Speciality']
> = {
  atc?: Resolver<Maybe<ResolversTypes['MedicalATC']>, ParentType, ContextType>;
  bnpvPeriod?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commercialisationState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commercialisationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dosageIndication?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dosageSubstances?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialitySubstance']>>>,
    ParentType,
    ContextType
  >;
  exposition?: Resolver<Maybe<ResolversTypes['EntityExposition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  laboratory?: Resolver<Maybe<ResolversTypes['Laboratory']>, ParentType, ContextType>;
  medicalErrors?: Resolver<Maybe<ResolversTypes['MedicalErrors']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pharmaForm?: Resolver<Maybe<ResolversTypes['PharmaForm']>, ParentType, ContextType>;
  publications?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Publication']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialityUsagePerAge']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerGender?: Resolver<
    Maybe<ResolversTypes['RepartitionPerGender']>,
    ParentType,
    ContextType
  >;
  shortagesHistory?: Resolver<
    Maybe<ResolversTypes['SpecialityRupturesHistory']>,
    ParentType,
    ContextType
  >;
  substances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Substance']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityAssociatedShortageResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityAssociatedShortage'] = ResolversParentTypes['SpecialityAssociatedShortage']
> = {
  cause?: Resolver<Maybe<ResolversTypes['SpecialityRuptureCause']>, ParentType, ContextType>;
  cis?: Resolver<Maybe<ResolversTypes['ShortageCis']>, ParentType, ContextType>;
  classification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  num?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityLightResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityLight'] = ResolversParentTypes['SpecialityLight']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityRuptureCauseResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRuptureCause'] = ResolversParentTypes['SpecialityRuptureCause']
> = {
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityRupturesHistoryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRupturesHistory'] = ResolversParentTypes['SpecialityRupturesHistory']
> = {
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  shortages?: Resolver<
    Maybe<Array<ResolversTypes['SpecialityAssociatedShortage']>>,
    ParentType,
    ContextType
  >;
  trustMedPeriod?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialitySubstanceResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialitySubstance'] = ResolversParentTypes['SpecialitySubstance']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dosage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityUsagePerAgeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityUsagePerAge'] = ResolversParentTypes['SpecialityUsagePerAge']
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubstanceResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Substance'] = ResolversParentTypes['Substance']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposition?: Resolver<Maybe<ResolversTypes['EntityExposition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerAge']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerGender?: Resolver<
    Maybe<ResolversTypes['RepartitionPerGender']>,
    ParentType,
    ContextType
  >;
  retrievedSpecialities?: Resolver<
    Maybe<ResolversTypes['SpecialitiesReturn']>,
    ParentType,
    ContextType
  >;
  sideEffects?: Resolver<Maybe<ResolversTypes['SubstanceSideEffects']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubstanceSideEffectsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstanceSideEffects'] = ResolversParentTypes['SubstanceSideEffects']
> = {
  bnpvPeriod?: Resolver<Maybe<ResolversTypes['Period']>, ParentType, ContextType>;
  declarations?: Resolver<
    Maybe<ResolversTypes['SubstanceSideEffectsDeclarations']>,
    ParentType,
    ContextType
  >;
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerAge']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerGender?: Resolver<
    Maybe<ResolversTypes['RepartitionPerGender']>,
    ParentType,
    ContextType
  >;
  repartitionPerNotifier?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerNotifier']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerPathology?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerPathology']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubstanceSideEffectsDeclarationsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstanceSideEffectsDeclarations'] = ResolversParentTypes['SubstanceSideEffectsDeclarations']
> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubstancesReturnResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstancesReturn'] = ResolversParentTypes['SubstancesReturn']
> = {
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  substances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Substance']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalDeclarationsWithMeasureResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['TotalDeclarationsWithMeasure'] = ResolversParentTypes['TotalDeclarationsWithMeasure']
> = {
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WithRepartitionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['WithRepartition'] = ResolversParentTypes['WithRepartition']
> = {
  with?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  without?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ContextValue> = {
  EntityExposition?: EntityExpositionResolvers<ContextType>;
  GlobalExpositionPeriod?: GlobalExpositionPeriodResolvers<ContextType>;
  GlobalShortages?: GlobalShortagesResolvers<ContextType>;
  GlobalStatistics?: GlobalStatisticsResolvers<ContextType>;
  GlobalStatsUsagePerAge?: GlobalStatsUsagePerAgeResolvers<ContextType>;
  GlobalStatsUsagePerGravity?: GlobalStatsUsagePerGravityResolvers<ContextType>;
  GlobalStatsUsagePerNotifier?: GlobalStatsUsagePerNotifierResolvers<ContextType>;
  GlobalStatsUsagePerPathology?: GlobalStatsUsagePerPathologyResolvers<ContextType>;
  GlobalStatsUsagePerSeriousEffect?: GlobalStatsUsagePerSeriousEffectResolvers<ContextType>;
  HltEffect?: HltEffectResolvers<ContextType>;
  IndicatorValues?: IndicatorValuesResolvers<ContextType>;
  Laboratory?: LaboratoryResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  MedicalATC?: MedicalAtcResolvers<ContextType>;
  MedicalError?: MedicalErrorResolvers<ContextType>;
  MedicalErrors?: MedicalErrorsResolvers<ContextType>;
  MedicalErrorsApparitionStep?: MedicalErrorsApparitionStepResolvers<ContextType>;
  MedicalErrorsNature?: MedicalErrorsNatureResolvers<ContextType>;
  MedicalErrorsPopulation?: MedicalErrorsPopulationResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Period?: PeriodResolvers<ContextType>;
  PharmaForm?: PharmaFormResolvers<ContextType>;
  Publication?: PublicationResolvers<ContextType>;
  PublicationType?: PublicationTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RepartitionPerAge?: RepartitionPerAgeResolvers<ContextType>;
  RepartitionPerGender?: RepartitionPerGenderResolvers<ContextType>;
  RepartitionPerNotifier?: RepartitionPerNotifierResolvers<ContextType>;
  RepartitionPerPathology?: RepartitionPerPathologyResolvers<ContextType>;
  RupturesTotalActionPerYear?: RupturesTotalActionPerYearResolvers<ContextType>;
  ShortageCis?: ShortageCisResolvers<ContextType>;
  ShortagesActionsPerYear?: ShortagesActionsPerYearResolvers<ContextType>;
  ShortagesAtcPerYear?: ShortagesAtcPerYearResolvers<ContextType>;
  ShortagesCausesPerYear?: ShortagesCausesPerYearResolvers<ContextType>;
  ShortagesClassPerYear?: ShortagesClassPerYearResolvers<ContextType>;
  ShortagesMeasuresPerYear?: ShortagesMeasuresPerYearResolvers<ContextType>;
  ShortagesPerYear?: ShortagesPerYearResolvers<ContextType>;
  SpecialitiesReturn?: SpecialitiesReturnResolvers<ContextType>;
  Speciality?: SpecialityResolvers<ContextType>;
  SpecialityAssociatedShortage?: SpecialityAssociatedShortageResolvers<ContextType>;
  SpecialityLight?: SpecialityLightResolvers<ContextType>;
  SpecialityRuptureCause?: SpecialityRuptureCauseResolvers<ContextType>;
  SpecialityRupturesHistory?: SpecialityRupturesHistoryResolvers<ContextType>;
  SpecialitySubstance?: SpecialitySubstanceResolvers<ContextType>;
  SpecialityUsagePerAge?: SpecialityUsagePerAgeResolvers<ContextType>;
  Substance?: SubstanceResolvers<ContextType>;
  SubstanceSideEffects?: SubstanceSideEffectsResolvers<ContextType>;
  SubstanceSideEffectsDeclarations?: SubstanceSideEffectsDeclarationsResolvers<ContextType>;
  SubstancesReturn?: SubstancesReturnResolvers<ContextType>;
  TotalDeclarationsWithMeasure?: TotalDeclarationsWithMeasureResolvers<ContextType>;
  WithRepartition?: WithRepartitionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = ContextValue> = {
  capitalize?: CapitalizeDirectiveResolver<any, any, ContextType>;
  lowercase?: LowercaseDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
};
