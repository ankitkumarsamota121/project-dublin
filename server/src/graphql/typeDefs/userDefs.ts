import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllUsers: [User]!
    getUser(id: ID!): User!
    loginUser(email: String!, password: String!): AuthResp!
  }

  extend type Mutation {
    registerUser(name: String!, email: String!, password: String!): AuthResp!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthResp {
    user: User!
    token: String!
  }
`;
