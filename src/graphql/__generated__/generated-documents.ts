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

export type CisExposition = {
  __typename?: 'CisExposition';
  consumption?: Maybe<Scalars['Int']>;
  expositionLevel?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type GenderRepartition = {
  __typename?: 'GenderRepartition';
  female?: Maybe<Scalars['Int']>;
  male?: Maybe<Scalars['Int']>;
};

export type HltEffect = {
  __typename?: 'HltEffect';
  id?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type Icon = {
  __typename?: 'Icon';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type Laboratory = {
  __typename?: 'Laboratory';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
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
  natureRepartition?: Maybe<Array<Maybe<RepartitionTranche>>>;
  populationRepartition?: Maybe<Array<Maybe<RepartitionTranche>>>;
  sideEffectsOriginRepartition?: Maybe<WithRepartition>;
};

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
};

export type PharmaForm = {
  __typename?: 'PharmaForm';
  id?: Maybe<Scalars['Int']>;
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
  getSpecialities?: Maybe<SpecialitiesReturn>;
  getSpeciality?: Maybe<Speciality>;
  getSpecialityIdByCode?: Maybe<Scalars['Int']>;
  getSubstance?: Maybe<Substance>;
  getSubstances?: Maybe<SubstancesReturn>;
};

export type QueryGetSpecialityArgs = {
  cisId: Scalars['Int'];
};

export type QueryGetSpecialityIdByCodeArgs = {
  cisCode: Scalars['String'];
};

export type QueryGetSubstanceArgs = {
  subCode: Scalars['String'];
};

export type RepartitionPerNotifier = {
  __typename?: 'RepartitionPerNotifier';
  id?: Maybe<Scalars['Int']>;
  job?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type RepartitionPerPathology = {
  __typename?: 'RepartitionPerPathology';
  htlEffects?: Maybe<Array<Maybe<HltEffect>>>;
  id?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
  valuePercent?: Maybe<Scalars['Int']>;
};

export type RepartitionPerSex = {
  __typename?: 'RepartitionPerSex';
  female?: Maybe<Scalars['Int']>;
  male?: Maybe<Scalars['Int']>;
};

export type RepartitionTranche = {
  __typename?: 'RepartitionTranche';
  id?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type RepartitionTuple = {
  __typename?: 'RepartitionTuple';
  codePart?: Maybe<Scalars['String']>;
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
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionTranche>>>;
  repartitionPerSex?: Maybe<RepartitionPerSex>;
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
  code?: Maybe<Scalars['String']>;
  dosage?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type Substance = {
  __typename?: 'Substance';
  code: Scalars['String'];
  exposition?: Maybe<CisExposition>;
  id: Scalars['Int'];
  name: Scalars['String'];
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionTranche>>>;
  repartitionPerNotifier?: Maybe<Array<Maybe<RepartitionPerNotifier>>>;
  repartitionPerPathology?: Maybe<Array<Maybe<RepartitionPerPathology>>>;
  repartitionPerSex?: Maybe<RepartitionPerSex>;
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
  total?: Maybe<Scalars['Int']>;
};

export type WithRepartition = {
  __typename?: 'WithRepartition';
  with?: Maybe<Scalars['Int']>;
  without?: Maybe<Scalars['Int']>;
};

export type SpecialityFragmentFragment = {
  __typename?: 'Speciality';
  id: number;
  name: string;
  code: string;
  dosageIndication?: string | null;
  commercialisationState?: string | null;
  commercialisationType?: string | null;
  description?: string | null;
  atc?: {
    __typename?: 'MedicalATC';
    id: number;
    name?: string | null;
    code?: string | null;
  } | null;
  pharmaForm?: { __typename?: 'PharmaForm'; id?: number | null; name?: string | null } | null;
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
    repartitionPerSex?: {
      __typename?: 'RepartitionPerSex';
      male?: number | null;
      female?: number | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionTranche';
      id?: number | null;
      range?: string | null;
      value?: number | null;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'RepartitionPerNotifier';
      id?: number | null;
      job?: string | null;
      value?: number | null;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'RepartitionPerPathology';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
      htlEffects?: Array<{
        __typename?: 'HltEffect';
        id?: number | null;
        range?: string | null;
        value?: number | null;
      } | null> | null;
    } | null> | null;
    totalExposition?: {
      __typename?: 'TotalExposition';
      total?: number | null;
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
    code?: string | null;
    name?: string | null;
    dosage?: string | null;
  } | null> | null;
  repartitionPerSex?: {
    __typename?: 'RepartitionPerSex';
    male?: number | null;
    female?: number | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'RepartitionTranche';
    id?: number | null;
    range?: string | null;
    value?: number | null;
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
      __typename?: 'RepartitionTranche';
      id?: number | null;
      value?: number | null;
      range?: string | null;
    } | null> | null;
    sideEffectsOriginRepartition?: {
      __typename?: 'WithRepartition';
      with?: number | null;
      without?: number | null;
    } | null;
    natureRepartition?: Array<{
      __typename?: 'RepartitionTranche';
      id?: number | null;
      value?: number | null;
      range?: string | null;
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
  repartitionPerSex?: {
    __typename?: 'RepartitionPerSex';
    male?: number | null;
    female?: number | null;
  } | null;
  repartitionPerAge?: Array<{
    __typename?: 'RepartitionTranche';
    id?: number | null;
    range?: string | null;
    value?: number | null;
  } | null> | null;
  repartitionPerNotifier?: Array<{
    __typename?: 'RepartitionPerNotifier';
    id?: number | null;
    job?: string | null;
    value?: number | null;
  } | null> | null;
  repartitionPerPathology?: Array<{
    __typename?: 'RepartitionPerPathology';
    id?: number | null;
    range?: string | null;
    value?: number | null;
    valuePercent?: number | null;
    htlEffects?: Array<{
      __typename?: 'HltEffect';
      id?: number | null;
      range?: string | null;
      value?: number | null;
    } | null> | null;
  } | null> | null;
  totalExposition?: {
    __typename?: 'TotalExposition';
    total?: number | null;
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
  cisId: Scalars['Int'];
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
    description?: string | null;
    atc?: {
      __typename?: 'MedicalATC';
      id: number;
      name?: string | null;
      code?: string | null;
    } | null;
    pharmaForm?: { __typename?: 'PharmaForm'; id?: number | null; name?: string | null } | null;
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
      repartitionPerSex?: {
        __typename?: 'RepartitionPerSex';
        male?: number | null;
        female?: number | null;
      } | null;
      repartitionPerAge?: Array<{
        __typename?: 'RepartitionTranche';
        id?: number | null;
        range?: string | null;
        value?: number | null;
      } | null> | null;
      repartitionPerNotifier?: Array<{
        __typename?: 'RepartitionPerNotifier';
        id?: number | null;
        job?: string | null;
        value?: number | null;
      } | null> | null;
      repartitionPerPathology?: Array<{
        __typename?: 'RepartitionPerPathology';
        id?: number | null;
        range?: string | null;
        value?: number | null;
        valuePercent?: number | null;
        htlEffects?: Array<{
          __typename?: 'HltEffect';
          id?: number | null;
          range?: string | null;
          value?: number | null;
        } | null> | null;
      } | null> | null;
      totalExposition?: {
        __typename?: 'TotalExposition';
        total?: number | null;
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
      code?: string | null;
      name?: string | null;
      dosage?: string | null;
    } | null> | null;
    repartitionPerSex?: {
      __typename?: 'RepartitionPerSex';
      male?: number | null;
      female?: number | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionTranche';
      id?: number | null;
      range?: string | null;
      value?: number | null;
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
        __typename?: 'RepartitionTranche';
        id?: number | null;
        value?: number | null;
        range?: string | null;
      } | null> | null;
      sideEffectsOriginRepartition?: {
        __typename?: 'WithRepartition';
        with?: number | null;
        without?: number | null;
      } | null;
      natureRepartition?: Array<{
        __typename?: 'RepartitionTranche';
        id?: number | null;
        value?: number | null;
        range?: string | null;
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
    repartitionPerSex?: {
      __typename?: 'RepartitionPerSex';
      male?: number | null;
      female?: number | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionTranche';
      id?: number | null;
      range?: string | null;
      value?: number | null;
    } | null> | null;
    repartitionPerNotifier?: Array<{
      __typename?: 'RepartitionPerNotifier';
      id?: number | null;
      job?: string | null;
      value?: number | null;
    } | null> | null;
    repartitionPerPathology?: Array<{
      __typename?: 'RepartitionPerPathology';
      id?: number | null;
      range?: string | null;
      value?: number | null;
      valuePercent?: number | null;
      htlEffects?: Array<{
        __typename?: 'HltEffect';
        id?: number | null;
        range?: string | null;
        value?: number | null;
      } | null> | null;
    } | null> | null;
    totalExposition?: {
      __typename?: 'TotalExposition';
      total?: number | null;
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
    repartitionPerSex {
      male
      female
    }
    repartitionPerAge {
      id
      range
      value
    }
    repartitionPerNotifier {
      id
      job
      value
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
    repartitionPerSex {
      male
      female
    }
    repartitionPerAge {
      id
      range
      value
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
    description
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
        value
        range
      }
      sideEffectsOriginRepartition {
        with
        without
      }
      natureRepartition {
        id
        value
        range
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
  query Speciality($cisId: Int!) {
    getSpeciality(cisId: $cisId) {
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
 *      cisId: // value for 'cisId'
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
