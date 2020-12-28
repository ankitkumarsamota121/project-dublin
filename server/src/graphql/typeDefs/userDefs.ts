import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllUsers: [User!]
  }

  extend type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
