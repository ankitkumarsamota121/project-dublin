import React from 'react';
import Link from 'next/link';

import { Container, Jumbotron, Button } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Header />
      <Container style={{ minHeight: '80vh' }}>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple TODO list application, Developed to learn the basics of Typescript +
            GraphQL + NextJS + MongoDB + Express.
          </p>
          <p>
            <Link href='/login'>
              <Button variant='primary'>Sign In</Button>
            </Link>
          </p>
        </Jumbotron>
      </Container>
      <Footer />
    </>
  );
};

export default HomeScreen;
