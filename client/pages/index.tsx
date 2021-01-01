import Head from 'next/head';
// import styles from '../styles/Home.module.css'

import { useQuery, gql } from '@apollo/client';

const HELLO_WORLD = gql`
  query hello {
    hello
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(HELLO_WORLD);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{loading ? 'Loading...' : data['hello']}</p>
    </div>
  );
}
