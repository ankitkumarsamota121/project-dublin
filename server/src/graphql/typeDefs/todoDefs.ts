import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllTodos: [Todo]!
  }

  extend type Mutation {
    createTodo(desc: String!): String!
  }

  type Todo {
    desc: String
    user: User
  }
`;
