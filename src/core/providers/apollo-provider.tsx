"use client";

import { PropsWithChildren } from "react";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import { apolloClient } from "../../infrastructure/graphql/apollo-client";

export function ApolloProvider({ children }: PropsWithChildren) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
