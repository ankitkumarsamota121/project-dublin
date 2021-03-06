import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

import { logout } from '../redux/actions';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

// Interfaces
import { IStoreState, IUser } from '../interfaces';

interface IGetResp {
  getUser: IUser;
}

const Header = () => {
  const { loading: loadingUser, data } = useQuery<IGetResp>(GET_USER);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: IStoreState) => state.token);

  useEffect(() => {
    // setLoading(loadingUser);
  }, [loading]);

  const logoutHandler = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Link href='/'>
          <Navbar.Brand>Project-Dublin</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {loading ? (
              'Loading...'
            ) : token ? (
              <NavDropdown title={data ? data.getUser.name : ''} id='username'>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href='/login'>Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
