import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllTodos: [Todo]!
  }

  extend type Mutation {
    createTodo(desc: String!): Todo!
  }

  type Todo {
    desc: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
