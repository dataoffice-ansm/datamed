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

export type GenderRepartition = {
  __typename?: 'GenderRepartition';
  female?: Maybe<Scalars['Int']>;
  male?: Maybe<Scalars['Int']>;
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

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
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

export type RepartitionPerAge = {
  __typename?: 'RepartitionPerAge';
  id?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type RepartitionPerSex = {
  __typename?: 'RepartitionPerSex';
  female?: Maybe<Scalars['Int']>;
  male?: Maybe<Scalars['Int']>;
};

export type RepartitionTuple = {
  __typename?: 'RepartitionTuple';
  codePart?: Maybe<Scalars['String']>;
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
  icon?: Maybe<Icon>;
  iconId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  laboratory?: Maybe<Laboratory>;
  name: Scalars['String'];
  repartitionPerAge?: Maybe<Array<Maybe<RepartitionPerAge>>>;
  repartitionPerSex?: Maybe<RepartitionPerSex>;
  substances?: Maybe<Array<Maybe<Substance>>>;
};

export type SpecialityLight = {
  __typename?: 'SpecialityLight';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Substance = {
  __typename?: 'Substance';
  code: Scalars['String'];
  dosage?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  pharmaForm?: Maybe<Scalars['String']>;
  retrieveSpecialities?: Maybe<SpecialitiesReturn>;
};

export type SubstancesReturn = {
  __typename?: 'SubstancesReturn';
  meta?: Maybe<Meta>;
  substances?: Maybe<Array<Maybe<Substance>>>;
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
    commercialisationState?: string | null;
    commercialisationType?: string | null;
    description?: string | null;
    atc?: {
      __typename?: 'MedicalATC';
      id: number;
      name?: string | null;
      code?: string | null;
    } | null;
    repartitionPerSex?: {
      __typename?: 'RepartitionPerSex';
      male?: number | null;
      female?: number | null;
    } | null;
    repartitionPerAge?: Array<{
      __typename?: 'RepartitionPerAge';
      id?: number | null;
      range?: string | null;
      value?: number | null;
    } | null> | null;
    icon?: { __typename?: 'Icon'; id: number; name?: string | null } | null;
    laboratory?: { __typename?: 'Laboratory'; id: number; name?: string | null } | null;
    substances?: Array<{
      __typename?: 'Substance';
      id: number;
      code: string;
      name: string;
      dosage?: string | null;
      pharmaForm?: string | null;
    } | null> | null;
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
    pharmaForm?: string | null;
    dosage?: string | null;
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
      id
      name
      code
      atc {
        id
        name
        code
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
      description
      icon {
        id
        name
      }
      laboratory {
        id
        name
      }
      substances {
        id
        code
        name
        dosage
        pharmaForm
      }
    }
  }
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
      id
      code
      name
      pharmaForm
      dosage
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
    }
  }
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
