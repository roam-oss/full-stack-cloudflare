import { graphql, buildSchema } from "graphql";
import { v4 as uuidv4 } from "uuid";
import {
  MutationResolvers,
  Object,
  QueryResolvers,
  ObjectType,
} from "./generated/graphql";
import { ObjectRecordKeyType } from "./types";
import schemaSource from "./schema";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(schemaSource);

// const all = async (kv, type) => {
//   const listResults = await kv.list({ prefix: `${type}:record:` });
//   const results = await Promise.all(
//     listResults.keys.map(async ({ name: key }) => JSON.parse(await kv.get(key)))
//   );

//   return results;
// };

// const get = async (kv, type, id) => {
//   const data = await kv.get(`${type}:record:${id}`);
//   return JSON.parse(data);
// };

const put = async (
  kv: GraphQLKVNamespace<ObjectRecordKeyType>,
  type: ObjectType,
  { id: providedId = undefined, ...data }: { id?: string }
) => {
  const id = providedId || uuidv4();
  const record: Object = { data: JSON.stringify(data), id, type };
  const key: ObjectRecordKeyType = `${type}:record:${id}`;
  await kv.put(key, JSON.stringify(record));
  return record;
};

// const _delete = async (kv, type, id) => {
//   const data = await get(kv, type, id);
//   if (!data) throw new Error(`Could not find ${type} to delete`);
//   await kv.delete(`${type}:record:${id}`);
//   return data;
// };

// The rootValue provides a resolver function for each API endpoint
const queryResolvers: QueryResolvers<{ kv: GraphQLKVNamespace }> = {
  // getObject: async (_parent, { id, type }, { kv }) => get(kv, type, id),
  // allObjects: async ({ type }, { kv }) => all(kv, type),
  // allPlaylist: async (_, { kv }) => all(kv, "playlist"),
  // getPlaylist: async ({ playlistId }, { kv }) =>
  //   get(kv, "playlist", playlistId),
  // deletePlaylist: async ({ playlistId }, { kv }) =>
  //   _delete(kv, "playlist", playlistId),
  // createPlaylist: async ({ input }, { kv }) => put(kv, "playlist", input),
};

const mutationResolvers: MutationResolvers<{ kv: GraphQLKVNamespace }> = {
  putObject: async (_parent, { input }, { kv }) => put(kv, input.type, input),
};

const rootValue = {
  ...queryResolvers,
  ...mutationResolvers,
};

const execute = async (
  body: { query: string; variables: Record<string, unknown> },
  env: AppEnv
) => {
  const res = await graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
    rootValue,
    contextValue: {
      kv: env.GRAPHQL_DATA,
    },
  });
};

export default execute;
