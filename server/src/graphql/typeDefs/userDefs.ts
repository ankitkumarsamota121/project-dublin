import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllUsers: [User]!
    getUser: User!
  }

  extend type Mutation {
    loginUser(email: String!, password: String!): AuthResp!
    registerUser(name: String!, email: String!, password: String!): AuthResp!
    deleteUser: DelUserResp!
  }

  type User {
    name: String!
    email: String!
  }

  type AuthResp {
    user: User!
    token: String!
  }

  type DelUserResp {
    success: Boolean
    message: String
  }
`;
