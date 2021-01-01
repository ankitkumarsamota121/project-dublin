import React from 'react';

import { useQuery } from '@apollo/client';
import { HELLO_WORLD } from '../graphql/queries';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

interface ITodosScreenProps {}

interface IStoreState {
  token: string;
}

const TodosScreen: React.FC<ITodosScreenProps> = () => {
  const { loading, error, data } = useQuery(HELLO_WORLD);

  const dispatch = useDispatch();

  const token = useSelector((state: IStoreState) => state.token);

  return (
    <>
      <Header />
      <Container style={{ minHeight: '80vh' }}>
        <h1>Todos Screen</h1>
        <p>{loading ? 'Loading...' : data.hello}</p>
        <h1>{token && 'User Logged In!'}</h1>
      </Container>
      <Footer />
    </>
  );
};

export default TodosScreen;
