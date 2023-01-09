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

export type Cause = {
  __typename?: 'Cause';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type CisExposition = {
  __typename?: 'CisExposition';
  consumption?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
};

export type GlobalRuptures = {
  __typename?: 'GlobalRuptures';
  repartitionPerAction?: Maybe<Array<Maybe<RuptureActionRepartition>>>;
  repartitionPerCause?: Maybe<Array<Maybe<RuptureCauseRepartition>>>;
  repartitionPerClassification?: Maybe<Array<Maybe<RuptureClassificationRepartition>>>;
  repartitionPerTherapeuticClass?: Maybe<Array<Maybe<TherapeuticClassesRupturesPerYear>>>;
  ruptureStocks?: Maybe<Array<Maybe<RuptureStock>>>;
  ruptureYears?: Maybe<Array<Maybe<RuptureYear>>>;
  totalAction?: Maybe<Array<Maybe<RuptureTotalAction>>>;
};

export type GlobalStatistic = {
  __typename?: 'GlobalStatistic';
  repartitionPerAge?: Maybe<Array<Maybe<GlobalStatsUsagePerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerGravity?: Maybe<Array<Maybe<GlobalStatsUsagePerGravity>>>;
  repartitionPerNotifier?: Maybe<Array<Maybe<GlobalStatsUsagePerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<GlobalStatsUsagePerPathology>>>;
  repartitionPerSeriousEffect?: Maybe<Array<Maybe<GlobalStatsUsagePerSeriousEffect>>>;
  totalExposition?: Maybe<SubstanceTotalExposition>;
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
  id: Scalars['Int'];
  range: Scalars['String'];
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
  natureRepartition?: Maybe<Array<Maybe<MedicalErrorsNature>>>;
  populationRepartition?: Maybe<Array<Maybe<MedicalErrorsPopulation>>>;
  sideEffectsOriginRepartition?: Maybe<WithRepartition>;
};

export type MedicalErrorsApparitionStep = {
  __typename?: 'MedicalErrorsApparitionStep';
  id: Scalars['Int'];
  label: Scalars['String'];
  step: Scalars['String'];
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
  getGlobalRuptures?: Maybe<GlobalRuptures>;
  getGlobalStatistic?: Maybe<GlobalStatistic>;
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
  id: Scalars['Int'];
  job: Scalars['String'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type RepartitionPerPathology = {
  __typename?: 'RepartitionPerPathology';
  htlEffects?: Maybe<Array<Maybe<HltEffect>>>;
  id: Scalars['Int'];
  range: Scalars['String'];
  subId: Scalars['Int'];
  value: Scalars['Int'];
  valuePercent: Scalars['Float'];
};

export type RuptureAction = {
  __typename?: 'RuptureAction';
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type RuptureActionRepartition = {
  __typename?: 'RuptureActionRepartition';
  actions?: Maybe<Array<Maybe<RuptureAction>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureCause = {
  __typename?: 'RuptureCause';
  id: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
};

export type RuptureCauseRepartition = {
  __typename?: 'RuptureCauseRepartition';
  causes?: Maybe<Array<Maybe<Cause>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type RuptureClass = {
  __typename?: 'RuptureClass';
  id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
};

export type RuptureClassificationRepartition = {
  __typename?: 'RuptureClassificationRepartition';
  classification?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
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

export type RuptureTotalAction = {
  __typename?: 'RuptureTotalAction';
  total?: Maybe<Scalars['Int']>;
  totalWithAtLeastOneAction?: Maybe<Scalars['Int']>;
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
  id: Scalars['Int'];
  laboratory?: Maybe<Laboratory>;
  medicalErrors?: Maybe<MedicalErrors>;
  name: Scalars['String'];
  pharmaForm?: Maybe<PharmaForm>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  repartitionPerAge?: Maybe<Array<Maybe<SpecialityUsagePerAge>>>;
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
  exposition?: Maybe<CisExposition>;
  id: Scalars['Int'];
  name: Scalars['String'];
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionPerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  retrieveSpecialities?: Maybe<SpecialitiesReturn>;
  sideEffects?: Maybe<SubstanceSideEffects>;
  totalExposition?: Maybe<SubstanceTotalExposition>;
};

export type SubstanceSideEffects = {
  __typename?: 'SubstanceSideEffects';
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionPerAge>>>;
  repartitionPerGender?: Maybe<RepartitionPerGender>;
  repartitionPerNotifier?: Maybe<Array<Maybe<RepartitionPerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<RepartitionPerPathology>>>;
};

export type SubstanceTotalExposition = {
  __typename?: 'SubstanceTotalExposition';
  maxYear: Scalars['Int'];
  minYear: Scalars['Int'];
  total: Scalars['Int'];
};

export type SubstancesReturn = {
  __typename?: 'SubstancesReturn';
  meta?: Maybe<Meta>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type TherapeuticClassRupture = {
  __typename?: 'TherapeuticClassRupture';
  name?: Maybe<Scalars['String']>;
  totalCis?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
};

export type TherapeuticClassesRupturesPerYear = {
  __typename?: 'TherapeuticClassesRupturesPerYear';
  repartition?: Maybe<Array<Maybe<TherapeuticClassRupture>>>;
  total?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
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
  Cause: ResolverTypeWrapper<Cause>;
  CisExposition: ResolverTypeWrapper<CisExposition>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GlobalRuptures: ResolverTypeWrapper<GlobalRuptures>;
  GlobalStatistic: ResolverTypeWrapper<GlobalStatistic>;
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
  PharmaForm: ResolverTypeWrapper<PharmaForm>;
  PharmaFormType: PharmaFormType;
  Publication: ResolverTypeWrapper<Publication>;
  PublicationType: ResolverTypeWrapper<PublicationType>;
  Query: ResolverTypeWrapper<{}>;
  RepartitionPerAge: ResolverTypeWrapper<RepartitionPerAge>;
  RepartitionPerGender: ResolverTypeWrapper<RepartitionPerGender>;
  RepartitionPerNotifier: ResolverTypeWrapper<RepartitionPerNotifier>;
  RepartitionPerPathology: ResolverTypeWrapper<RepartitionPerPathology>;
  RuptureAction: ResolverTypeWrapper<RuptureAction>;
  RuptureActionRepartition: ResolverTypeWrapper<RuptureActionRepartition>;
  RuptureCause: ResolverTypeWrapper<RuptureCause>;
  RuptureCauseRepartition: ResolverTypeWrapper<RuptureCauseRepartition>;
  RuptureClass: ResolverTypeWrapper<RuptureClass>;
  RuptureClassificationRepartition: ResolverTypeWrapper<RuptureClassificationRepartition>;
  RuptureStock: ResolverTypeWrapper<RuptureStock>;
  RuptureTotalAction: ResolverTypeWrapper<RuptureTotalAction>;
  RuptureYear: ResolverTypeWrapper<RuptureYear>;
  SpecialitiesReturn: ResolverTypeWrapper<SpecialitiesReturn>;
  Speciality: ResolverTypeWrapper<Speciality>;
  SpecialityLight: ResolverTypeWrapper<SpecialityLight>;
  SpecialityRupture: ResolverTypeWrapper<SpecialityRupture>;
  SpecialityRupturesHistory: ResolverTypeWrapper<SpecialityRupturesHistory>;
  SpecialitySubstance: ResolverTypeWrapper<SpecialitySubstance>;
  SpecialityUsagePerAge: ResolverTypeWrapper<SpecialityUsagePerAge>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Substance: ResolverTypeWrapper<Substance>;
  SubstanceSideEffects: ResolverTypeWrapper<SubstanceSideEffects>;
  SubstanceTotalExposition: ResolverTypeWrapper<SubstanceTotalExposition>;
  SubstancesReturn: ResolverTypeWrapper<SubstancesReturn>;
  TherapeuticClassRupture: ResolverTypeWrapper<TherapeuticClassRupture>;
  TherapeuticClassesRupturesPerYear: ResolverTypeWrapper<TherapeuticClassesRupturesPerYear>;
  WithRepartition: ResolverTypeWrapper<WithRepartition>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Cause: Cause;
  CisExposition: CisExposition;
  Float: Scalars['Float'];
  GlobalRuptures: GlobalRuptures;
  GlobalStatistic: GlobalStatistic;
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
  PharmaForm: PharmaForm;
  Publication: Publication;
  PublicationType: PublicationType;
  Query: {};
  RepartitionPerAge: RepartitionPerAge;
  RepartitionPerGender: RepartitionPerGender;
  RepartitionPerNotifier: RepartitionPerNotifier;
  RepartitionPerPathology: RepartitionPerPathology;
  RuptureAction: RuptureAction;
  RuptureActionRepartition: RuptureActionRepartition;
  RuptureCause: RuptureCause;
  RuptureCauseRepartition: RuptureCauseRepartition;
  RuptureClass: RuptureClass;
  RuptureClassificationRepartition: RuptureClassificationRepartition;
  RuptureStock: RuptureStock;
  RuptureTotalAction: RuptureTotalAction;
  RuptureYear: RuptureYear;
  SpecialitiesReturn: SpecialitiesReturn;
  Speciality: Speciality;
  SpecialityLight: SpecialityLight;
  SpecialityRupture: SpecialityRupture;
  SpecialityRupturesHistory: SpecialityRupturesHistory;
  SpecialitySubstance: SpecialitySubstance;
  SpecialityUsagePerAge: SpecialityUsagePerAge;
  String: Scalars['String'];
  Substance: Substance;
  SubstanceSideEffects: SubstanceSideEffects;
  SubstanceTotalExposition: SubstanceTotalExposition;
  SubstancesReturn: SubstancesReturn;
  TherapeuticClassRupture: TherapeuticClassRupture;
  TherapeuticClassesRupturesPerYear: TherapeuticClassesRupturesPerYear;
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

export type CauseResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Cause'] = ResolversParentTypes['Cause']
> = {
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CisExpositionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['CisExposition'] = ResolversParentTypes['CisExposition']
> = {
  consumption?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalRupturesResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalRuptures'] = ResolversParentTypes['GlobalRuptures']
> = {
  repartitionPerAction?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureActionRepartition']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerCause?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureCauseRepartition']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerClassification?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureClassificationRepartition']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerTherapeuticClass?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['TherapeuticClassesRupturesPerYear']>>>,
    ParentType,
    ContextType
  >;
  ruptureStocks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureStock']>>>,
    ParentType,
    ContextType
  >;
  ruptureYears?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureYear']>>>,
    ParentType,
    ContextType
  >;
  totalAction?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RuptureTotalAction']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatisticResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatistic'] = ResolversParentTypes['GlobalStatistic']
> = {
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
  totalExposition?: Resolver<
    Maybe<ResolversTypes['SubstanceTotalExposition']>,
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
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  step?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  getGlobalRuptures?: Resolver<Maybe<ResolversTypes['GlobalRuptures']>, ParentType, ContextType>;
  getGlobalStatistic?: Resolver<Maybe<ResolversTypes['GlobalStatistic']>, ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepartitionPerPathologyResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerPathology'] = ResolversParentTypes['RepartitionPerPathology']
> = {
  htlEffects?: Resolver<Maybe<Array<Maybe<ResolversTypes['HltEffect']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valuePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureActionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureAction'] = ResolversParentTypes['RuptureAction']
> = {
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureActionRepartitionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureActionRepartition'] = ResolversParentTypes['RuptureActionRepartition']
> = {
  actions?: Resolver<Maybe<Array<Maybe<ResolversTypes['RuptureAction']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureCauseResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureCause'] = ResolversParentTypes['RuptureCause']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureCauseRepartitionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureCauseRepartition'] = ResolversParentTypes['RuptureCauseRepartition']
> = {
  causes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cause']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureClassResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureClass'] = ResolversParentTypes['RuptureClass']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureClassificationRepartitionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureClassificationRepartition'] = ResolversParentTypes['RuptureClassificationRepartition']
> = {
  classification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureStockResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureStock'] = ResolversParentTypes['RuptureStock']
> = {
  nbRisque?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nbRisqueClosed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nbRupture?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nbRuptureClosed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureTotalActionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureTotalAction'] = ResolversParentTypes['RuptureTotalAction']
> = {
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalWithAtLeastOneAction?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuptureYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureYear'] = ResolversParentTypes['RuptureYear']
> = {
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commercialisationState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commercialisationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dosageIndication?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dosageSubstances?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialitySubstance']>>>,
    ParentType,
    ContextType
  >;
  exposition?: Resolver<Maybe<ResolversTypes['CisExposition']>, ParentType, ContextType>;
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
  rupturesHistory?: Resolver<
    Maybe<ResolversTypes['SpecialityRupturesHistory']>,
    ParentType,
    ContextType
  >;
  substances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Substance']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityLightResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityLight'] = ResolversParentTypes['SpecialityLight']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exposition?: Resolver<Maybe<ResolversTypes['CisExposition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityRuptureResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRupture'] = ResolversParentTypes['SpecialityRupture']
> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cause?: Resolver<Maybe<ResolversTypes['RuptureCause']>, ParentType, ContextType>;
  classification?: Resolver<Maybe<ResolversTypes['RuptureClass']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  num?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecialityRupturesHistoryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRupturesHistory'] = ResolversParentTypes['SpecialityRupturesHistory']
> = {
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  ruptures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialityRupture']>>>,
    ParentType,
    ContextType
  >;
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
  exposition?: Resolver<Maybe<ResolversTypes['CisExposition']>, ParentType, ContextType>;
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
  retrieveSpecialities?: Resolver<
    Maybe<ResolversTypes['SpecialitiesReturn']>,
    ParentType,
    ContextType
  >;
  sideEffects?: Resolver<Maybe<ResolversTypes['SubstanceSideEffects']>, ParentType, ContextType>;
  totalExposition?: Resolver<
    Maybe<ResolversTypes['SubstanceTotalExposition']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubstanceSideEffectsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstanceSideEffects'] = ResolversParentTypes['SubstanceSideEffects']
> = {
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

export type SubstanceTotalExpositionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstanceTotalExposition'] = ResolversParentTypes['SubstanceTotalExposition']
> = {
  maxYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type TherapeuticClassRuptureResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['TherapeuticClassRupture'] = ResolversParentTypes['TherapeuticClassRupture']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCis?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TherapeuticClassesRupturesPerYearResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['TherapeuticClassesRupturesPerYear'] = ResolversParentTypes['TherapeuticClassesRupturesPerYear']
> = {
  repartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['TherapeuticClassRupture']>>>,
    ParentType,
    ContextType
  >;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  Cause?: CauseResolvers<ContextType>;
  CisExposition?: CisExpositionResolvers<ContextType>;
  GlobalRuptures?: GlobalRupturesResolvers<ContextType>;
  GlobalStatistic?: GlobalStatisticResolvers<ContextType>;
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
  PharmaForm?: PharmaFormResolvers<ContextType>;
  Publication?: PublicationResolvers<ContextType>;
  PublicationType?: PublicationTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RepartitionPerAge?: RepartitionPerAgeResolvers<ContextType>;
  RepartitionPerGender?: RepartitionPerGenderResolvers<ContextType>;
  RepartitionPerNotifier?: RepartitionPerNotifierResolvers<ContextType>;
  RepartitionPerPathology?: RepartitionPerPathologyResolvers<ContextType>;
  RuptureAction?: RuptureActionResolvers<ContextType>;
  RuptureActionRepartition?: RuptureActionRepartitionResolvers<ContextType>;
  RuptureCause?: RuptureCauseResolvers<ContextType>;
  RuptureCauseRepartition?: RuptureCauseRepartitionResolvers<ContextType>;
  RuptureClass?: RuptureClassResolvers<ContextType>;
  RuptureClassificationRepartition?: RuptureClassificationRepartitionResolvers<ContextType>;
  RuptureStock?: RuptureStockResolvers<ContextType>;
  RuptureTotalAction?: RuptureTotalActionResolvers<ContextType>;
  RuptureYear?: RuptureYearResolvers<ContextType>;
  SpecialitiesReturn?: SpecialitiesReturnResolvers<ContextType>;
  Speciality?: SpecialityResolvers<ContextType>;
  SpecialityLight?: SpecialityLightResolvers<ContextType>;
  SpecialityRupture?: SpecialityRuptureResolvers<ContextType>;
  SpecialityRupturesHistory?: SpecialityRupturesHistoryResolvers<ContextType>;
  SpecialitySubstance?: SpecialitySubstanceResolvers<ContextType>;
  SpecialityUsagePerAge?: SpecialityUsagePerAgeResolvers<ContextType>;
  Substance?: SubstanceResolvers<ContextType>;
  SubstanceSideEffects?: SubstanceSideEffectsResolvers<ContextType>;
  SubstanceTotalExposition?: SubstanceTotalExpositionResolvers<ContextType>;
  SubstancesReturn?: SubstancesReturnResolvers<ContextType>;
  TherapeuticClassRupture?: TherapeuticClassRuptureResolvers<ContextType>;
  TherapeuticClassesRupturesPerYear?: TherapeuticClassesRupturesPerYearResolvers<ContextType>;
  WithRepartition?: WithRepartitionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = ContextValue> = {
  capitalize?: CapitalizeDirectiveResolver<any, any, ContextType>;
  lowercase?: LowercaseDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
};
