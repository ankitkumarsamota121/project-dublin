import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { HELLO_WORLD } from '../graphql/queries';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Link from 'next/link';

interface ILoginScreenProps {}

const LoginScreen: React.FC<ILoginScreenProps> = () => {
  //   const { loading, error, data } = useQuery(HELLO_WORLD);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {};

  return (
    <>
      <Header />
      <Container className='mt-4' style={{ minHeight: '80vh' }}>
        <FormContainer>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New Customer? <Link href='/register'>Register</Link>
            </Col>
          </Row>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default LoginScreen;
