import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FormContainer from '../components/FormContainer';

// Interfaces
import { IStoreState, IUser } from '../interfaces';

interface ILoginResp {
  user: IUser;
  token: string;
}
interface ILoginArgs {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [loginUser, { data }] = useMutation<{ loginUser: ILoginResp }, ILoginArgs>(LOGIN_USER);

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
