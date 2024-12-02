import { PropsWithChildren } from "react";
import { ApolloClientProvider } from "../../infrastructure/graphql/apollo-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ApolloClientProvider>
      {children}
    </ApolloClientProvider>
  );
}
