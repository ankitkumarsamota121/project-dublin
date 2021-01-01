import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Link from 'next/link';

import { login } from '../redux/actions';

interface ILoginScreenProps {}

interface IStoreState {
  token: string;
}

const LoginScreen: React.FC<ILoginScreenProps> = () => {
  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const token = useSelector((state: IStoreState) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      // Dispatch UserLogin here.
      dispatch(login(data.loginUser.token));
      //   router.push('/profile');
    }
    if (token) {
      router.push('/todos');
    }
  }, [data, token]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    loginUser({
      variables: {
        email,
        password,
      },
    });
  };

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
