import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllTodos: [Todo]!
  }

  extend type Mutation {
    createTodo(desc: String!): Todo!
    deleteTodo(id: ID!): DelResp!
    editTodo(id: ID!, desc: String, isCompleted: Boolean): Todo!
  }

  type Todo {
    id: ID
    desc: String
    isCompleted: Boolean
    createdAt: String
    updatedAt: String
  }

  type DelResp {
    success: Boolean
    message: String
  }
`;
