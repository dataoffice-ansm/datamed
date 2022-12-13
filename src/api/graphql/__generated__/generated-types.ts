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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CisExposition: ResolverTypeWrapper<CisExposition>;
  GlobStaticRepartitionPerNotifier: ResolverTypeWrapper<GlobStaticRepartitionPerNotifier>;
  GlobStaticRepartitionPerPathology: ResolverTypeWrapper<GlobStaticRepartitionPerPathology>;
  GlobalStatistic: ResolverTypeWrapper<GlobalStatistic>;
  HltEffect: ResolverTypeWrapper<HltEffect>;
  Icon: ResolverTypeWrapper<Icon>;
  IndicatorValues: ResolverTypeWrapper<IndicatorValues>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Laboratory: ResolverTypeWrapper<Laboratory>;
  LoginResult: ResolverTypeWrapper<LoginResult>;
  MedicalATC: ResolverTypeWrapper<MedicalAtc>;
  MedicalError: ResolverTypeWrapper<MedicalError>;
  MedicalErrors: ResolverTypeWrapper<MedicalErrors>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  PharmaForm: ResolverTypeWrapper<PharmaForm>;
  Publication: ResolverTypeWrapper<Publication>;
  PublicationType: ResolverTypeWrapper<PublicationType>;
  Query: ResolverTypeWrapper<{}>;
  RepartitionPerGender: ResolverTypeWrapper<RepartitionPerGender>;
  RepartitionPerGravity: ResolverTypeWrapper<RepartitionPerGravity>;
  RepartitionPerNotifier: ResolverTypeWrapper<RepartitionPerNotifier>;
  RepartitionPerPathology: ResolverTypeWrapper<RepartitionPerPathology>;
  RepartitionPerSeriousEffect: ResolverTypeWrapper<RepartitionPerSeriousEffect>;
  RepartitionRange: ResolverTypeWrapper<RepartitionRange>;
  RuptureCause: ResolverTypeWrapper<RuptureCause>;
  RuptureClass: ResolverTypeWrapper<RuptureClass>;
  SpecialitiesReturn: ResolverTypeWrapper<SpecialitiesReturn>;
  Speciality: ResolverTypeWrapper<Speciality>;
  SpecialityLight: ResolverTypeWrapper<SpecialityLight>;
  SpecialityRupture: ResolverTypeWrapper<SpecialityRupture>;
  SpecialityRupturesHistory: ResolverTypeWrapper<SpecialityRupturesHistory>;
  SpecialitySubstance: ResolverTypeWrapper<SpecialitySubstance>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Substance: ResolverTypeWrapper<Substance>;
  SubstancesReturn: ResolverTypeWrapper<SubstancesReturn>;
  TotalExposition: ResolverTypeWrapper<TotalExposition>;
  WithRepartition: ResolverTypeWrapper<WithRepartition>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CisExposition: CisExposition;
  GlobStaticRepartitionPerNotifier: GlobStaticRepartitionPerNotifier;
  GlobStaticRepartitionPerPathology: GlobStaticRepartitionPerPathology;
  GlobalStatistic: GlobalStatistic;
  HltEffect: HltEffect;
  Icon: Icon;
  IndicatorValues: IndicatorValues;
  Int: Scalars['Int'];
  Laboratory: Laboratory;
  LoginResult: LoginResult;
  MedicalATC: MedicalAtc;
  MedicalError: MedicalError;
  MedicalErrors: MedicalErrors;
  Meta: Meta;
  Mutation: {};
  PharmaForm: PharmaForm;
  Publication: Publication;
  PublicationType: PublicationType;
  Query: {};
  RepartitionPerGender: RepartitionPerGender;
  RepartitionPerGravity: RepartitionPerGravity;
  RepartitionPerNotifier: RepartitionPerNotifier;
  RepartitionPerPathology: RepartitionPerPathology;
  RepartitionPerSeriousEffect: RepartitionPerSeriousEffect;
  RepartitionRange: RepartitionRange;
  RuptureCause: RuptureCause;
  RuptureClass: RuptureClass;
  SpecialitiesReturn: SpecialitiesReturn;
  Speciality: Speciality;
  SpecialityLight: SpecialityLight;
  SpecialityRupture: SpecialityRupture;
  SpecialityRupturesHistory: SpecialityRupturesHistory;
  SpecialitySubstance: SpecialitySubstance;
  String: Scalars['String'];
  Substance: Substance;
  SubstancesReturn: SubstancesReturn;
  TotalExposition: TotalExposition;
  WithRepartition: WithRepartition;
}>;

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

export type CisExpositionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['CisExposition'] = ResolversParentTypes['CisExposition']
> = ResolversObject<{
  consumption?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  expositionLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobStaticRepartitionPerNotifierResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobStaticRepartitionPerNotifier'] = ResolversParentTypes['GlobStaticRepartitionPerNotifier']
> = ResolversObject<{
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobStaticRepartitionPerPathologyResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobStaticRepartitionPerPathology'] = ResolversParentTypes['GlobStaticRepartitionPerPathology']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobalStatisticResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['GlobalStatistic'] = ResolversParentTypes['GlobalStatistic']
> = ResolversObject<{
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerGender?: Resolver<
    Maybe<ResolversTypes['RepartitionPerGender']>,
    ParentType,
    ContextType
  >;
  repartitionPerGravity?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerGravity']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerNotifier?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobStaticRepartitionPerNotifier']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerPathology?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GlobStaticRepartitionPerPathology']>>>,
    ParentType,
    ContextType
  >;
  repartitionPerSeriousEffect?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionPerSeriousEffect']>>>,
    ParentType,
    ContextType
  >;
  totalExposition?: Resolver<Maybe<ResolversTypes['TotalExposition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HltEffectResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['HltEffect'] = ResolversParentTypes['HltEffect']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IconResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Icon'] = ResolversParentTypes['Icon']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndicatorValuesResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['IndicatorValues'] = ResolversParentTypes['IndicatorValues']
> = ResolversObject<{
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LaboratoryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Laboratory'] = ResolversParentTypes['Laboratory']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginResultResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedicalAtcResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalATC'] = ResolversParentTypes['MedicalATC']
> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedicalErrorResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalError'] = ResolversParentTypes['MedicalError']
> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedicalErrorsResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['MedicalErrors'] = ResolversParentTypes['MedicalErrors']
> = ResolversObject<{
  apparitionStepRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
    ParentType,
    ContextType
  >;
  natureRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
    ParentType,
    ContextType
  >;
  populationRepartition?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
    ParentType,
    ContextType
  >;
  sideEffectsOriginRepartition?: Resolver<
    Maybe<ResolversTypes['WithRepartition']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetaResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']
> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  login?: Resolver<
    Maybe<ResolversTypes['LoginResult']>,
    ParentType,
    ContextType,
    Partial<MutationLoginArgs>
  >;
}>;

export type PharmaFormResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['PharmaForm'] = ResolversParentTypes['PharmaForm']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PublicationResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['PublicationType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PublicationTypeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['PublicationType'] = ResolversParentTypes['PublicationType']
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  getGlobalStatistic?: Resolver<Maybe<ResolversTypes['GlobalStatistic']>, ParentType, ContextType>;
  getSpecialities?: Resolver<Maybe<ResolversTypes['SpecialitiesReturn']>, ParentType, ContextType>;
  getSpeciality?: Resolver<
    Maybe<ResolversTypes['Speciality']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSpecialityArgs, 'cisCode'>
  >;
  getSpecialityIdByCode?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSpecialityIdByCodeArgs, 'cisCode'>
  >;
  getSubstance?: Resolver<
    Maybe<ResolversTypes['Substance']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSubstanceArgs, 'subCode'>
  >;
  getSubstances?: Resolver<Maybe<ResolversTypes['SubstancesReturn']>, ParentType, ContextType>;
}>;

export type RepartitionPerGenderResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerGender'] = ResolversParentTypes['RepartitionPerGender']
> = ResolversObject<{
  female?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  male?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepartitionPerGravityResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerGravity'] = ResolversParentTypes['RepartitionPerGravity']
> = ResolversObject<{
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepartitionPerNotifierResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerNotifier'] = ResolversParentTypes['RepartitionPerNotifier']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepartitionPerPathologyResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerPathology'] = ResolversParentTypes['RepartitionPerPathology']
> = ResolversObject<{
  htlEffects?: Resolver<Maybe<Array<Maybe<ResolversTypes['HltEffect']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepartitionPerSeriousEffectResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionPerSeriousEffect'] = ResolversParentTypes['RepartitionPerSeriousEffect']
> = ResolversObject<{
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepartitionRangeResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RepartitionRange'] = ResolversParentTypes['RepartitionRange']
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valuePercent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RuptureCauseResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureCause'] = ResolversParentTypes['RuptureCause']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RuptureClassResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['RuptureClass'] = ResolversParentTypes['RuptureClass']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpecialitiesReturnResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialitiesReturn'] = ResolversParentTypes['SpecialitiesReturn']
> = ResolversObject<{
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  specialities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialityLight']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpecialityResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Speciality'] = ResolversParentTypes['Speciality']
> = ResolversObject<{
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
  icon?: Resolver<Maybe<ResolversTypes['Icon']>, ParentType, ContextType>;
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
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
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
}>;

export type SpecialityLightResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityLight'] = ResolversParentTypes['SpecialityLight']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exposition?: Resolver<Maybe<ResolversTypes['CisExposition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpecialityRuptureResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRupture'] = ResolversParentTypes['SpecialityRupture']
> = ResolversObject<{
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cause?: Resolver<Maybe<ResolversTypes['RuptureCause']>, ParentType, ContextType>;
  classification?: Resolver<Maybe<ResolversTypes['RuptureClass']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  num?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpecialityRupturesHistoryResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialityRupturesHistory'] = ResolversParentTypes['SpecialityRupturesHistory']
> = ResolversObject<{
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  ruptures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SpecialityRupture']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpecialitySubstanceResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SpecialitySubstance'] = ResolversParentTypes['SpecialitySubstance']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dosage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubstanceResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['Substance'] = ResolversParentTypes['Substance']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exposition?: Resolver<Maybe<ResolversTypes['CisExposition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repartitionPerAge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['RepartitionRange']>>>,
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
  retrieveSpecialities?: Resolver<
    Maybe<ResolversTypes['SpecialitiesReturn']>,
    ParentType,
    ContextType
  >;
  totalExposition?: Resolver<Maybe<ResolversTypes['TotalExposition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubstancesReturnResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['SubstancesReturn'] = ResolversParentTypes['SubstancesReturn']
> = ResolversObject<{
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  substances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Substance']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TotalExpositionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['TotalExposition'] = ResolversParentTypes['TotalExposition']
> = ResolversObject<{
  maxYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithRepartitionResolvers<
  ContextType = ContextValue,
  ParentType extends ResolversParentTypes['WithRepartition'] = ResolversParentTypes['WithRepartition']
> = ResolversObject<{
  with?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  without?: Resolver<Maybe<ResolversTypes['IndicatorValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  CisExposition?: CisExpositionResolvers<ContextType>;
  GlobStaticRepartitionPerNotifier?: GlobStaticRepartitionPerNotifierResolvers<ContextType>;
  GlobStaticRepartitionPerPathology?: GlobStaticRepartitionPerPathologyResolvers<ContextType>;
  GlobalStatistic?: GlobalStatisticResolvers<ContextType>;
  HltEffect?: HltEffectResolvers<ContextType>;
  Icon?: IconResolvers<ContextType>;
  IndicatorValues?: IndicatorValuesResolvers<ContextType>;
  Laboratory?: LaboratoryResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  MedicalATC?: MedicalAtcResolvers<ContextType>;
  MedicalError?: MedicalErrorResolvers<ContextType>;
  MedicalErrors?: MedicalErrorsResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PharmaForm?: PharmaFormResolvers<ContextType>;
  Publication?: PublicationResolvers<ContextType>;
  PublicationType?: PublicationTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RepartitionPerGender?: RepartitionPerGenderResolvers<ContextType>;
  RepartitionPerGravity?: RepartitionPerGravityResolvers<ContextType>;
  RepartitionPerNotifier?: RepartitionPerNotifierResolvers<ContextType>;
  RepartitionPerPathology?: RepartitionPerPathologyResolvers<ContextType>;
  RepartitionPerSeriousEffect?: RepartitionPerSeriousEffectResolvers<ContextType>;
  RepartitionRange?: RepartitionRangeResolvers<ContextType>;
  RuptureCause?: RuptureCauseResolvers<ContextType>;
  RuptureClass?: RuptureClassResolvers<ContextType>;
  SpecialitiesReturn?: SpecialitiesReturnResolvers<ContextType>;
  Speciality?: SpecialityResolvers<ContextType>;
  SpecialityLight?: SpecialityLightResolvers<ContextType>;
  SpecialityRupture?: SpecialityRuptureResolvers<ContextType>;
  SpecialityRupturesHistory?: SpecialityRupturesHistoryResolvers<ContextType>;
  SpecialitySubstance?: SpecialitySubstanceResolvers<ContextType>;
  Substance?: SubstanceResolvers<ContextType>;
  SubstancesReturn?: SubstancesReturnResolvers<ContextType>;
  TotalExposition?: TotalExpositionResolvers<ContextType>;
  WithRepartition?: WithRepartitionResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ContextValue> = ResolversObject<{
  capitalize?: CapitalizeDirectiveResolver<any, any, ContextType>;
  lowercase?: LowercaseDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
}>;
