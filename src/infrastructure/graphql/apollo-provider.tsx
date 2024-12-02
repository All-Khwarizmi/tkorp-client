import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { apolloClient } from './apollo-client';

export function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
