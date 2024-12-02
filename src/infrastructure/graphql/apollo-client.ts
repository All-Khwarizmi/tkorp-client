import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { PaginatedAnimalResponse, PaginatedPersonResponse } from '../../core/entities/types';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          animals: {
            keyArgs: ['orderBy'],
            merge(
              existing: PaginatedAnimalResponse = {
                items: [],
                total: 0,
                hasMore: false,
              },
              incoming: PaginatedAnimalResponse
            ) {
              return {
                ...incoming,
                items: [...(existing.items || []), ...incoming.items],
              };
            },
          },
          persons: {
            keyArgs: [],
            merge(
              existing: PaginatedPersonResponse = {
                items: [],
                total: 0,
                hasMore: false,
              },
              incoming: PaginatedPersonResponse
            ) {
              return {
                ...incoming,
                items: [...(existing.items || []), ...incoming.items],
              };
            },
          },
        },
      },
    },
  }),
});
