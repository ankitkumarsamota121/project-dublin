import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      success
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($desc: String!) {
    createTodo(desc: $desc) {
      desc
    }
  }
`;

export const EDIT_TODO = gql`
  mutation editTodo($id: ID!, $desc: String, $isCompleted: Boolean) {
    editTodo(id: $id, desc: $desc, isCompleted: $isCompleted) {
      id
      desc
      isCompleted
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      success
    }
  }
`;
