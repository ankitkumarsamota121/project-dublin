import React from 'react';

import { useQuery } from '@apollo/client';
import { HELLO_WORLD } from '../graphql/queries';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

interface IHomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const { loading, error, data } = useQuery(HELLO_WORLD);

  return (
    <>
      <Header />
      <Container>
        <h1>Home Screen</h1>
      </Container>
      <Footer />
    </>
  );
};

export default HomeScreen;
