"use client";

import { PropsWithChildren } from "react";
import { ApolloProvider } from "./apollo-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      {children}
    </ApolloProvider>
  );
}
