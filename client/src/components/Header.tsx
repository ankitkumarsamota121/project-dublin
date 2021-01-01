import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

import { logout } from '../redux/actions';
import { useRouter } from 'next/router';

interface IStoreState {
  token: string;
}

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: IStoreState) => state.token);

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
            {token ? (
              <NavDropdown title='UserName' id='username'>
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
