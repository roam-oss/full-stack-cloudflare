type GraphQLQueryRequest = {
  query: string;
  variables: Record<string, unknown>;
};
type GraphQLKeys = "info";

type GraphQLKVNamespace<K extends string = undefined> = KVNamespace<
  K extends undefined ? GraphQLKeys : GraphQLKeys | K
>;

interface AppEnv<K extends string = undefined> {
  GRAPHQL_DATA: GraphQLKVNamespace<K>;
}

type API<K extends string = undefined> = PagesFunction<AppEnv<K>>;
