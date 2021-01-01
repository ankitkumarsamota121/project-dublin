import { gql } from '@apollo/client';

export const HELLO_WORLD = gql`
  query hello {
    hello
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      name
      email
    }
  }
`;
