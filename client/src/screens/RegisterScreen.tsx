import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';

import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FormContainer from '../components/FormContainer';

// Interfaces
import { IStoreState, IUser } from '../interfaces';

interface IRegisterResp {
  user: IUser;
  token: string;
}
interface IRegisterArgs {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const token = useSelector((state: IStoreState) => state.token);
  const router = useRouter();

  const [registerUser, { data }] = useMutation<{ registerUser: IRegisterResp }, IRegisterArgs>(
    REGISTER_USER
  );

  useEffect(() => {
    console.log(data, token);
    if (data) {
      dispatch(login(data.registerUser.token));
    }
    if (token) {
      router.push('/todos');
    }
  }, [data, token]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
    } else {
      registerUser({
        variables: {
          name,
          email,
          password,
        },
      });
    }
  };

  return (
    <>
      <Header />
      <Container className='mt-4' style={{ minHeight: '80vh' }}>
        <FormContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
            <Form.Group controlId='confirmPassword'>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Register
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              Have an Account? <Link href='/login'>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default RegisterScreen;
