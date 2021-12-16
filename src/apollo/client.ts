import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const huckleberryClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://graph-node.huckleberry.finance/subgraphs/name/huckleberry/huckleberry-subgraph-5",
    fetch,
  }),
  cache: new InMemoryCache(),
});
