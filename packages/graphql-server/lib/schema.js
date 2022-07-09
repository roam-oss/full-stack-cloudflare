import { gql } from "graphql-request";
export default gql `
  type Object {
    id: ID!
    type: ObjectType!
    data: String!
  }

  enum ObjectType {
    CACHE
  }

  input CreateObjectInput {
    id: ID
    type: ObjectType!
    data: String!
  }

  type Query {
    allObjects(type: ObjectType!): [Object]
    getObject(id: ID!, type: ObjectType!): Object!
  }

  type Mutation {
    putObject(input: CreateObjectInput!): Object!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
