import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

interface IStoreState {
  token: string;
}

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IStoreState) => state.token);
  //   const token = 'something';

  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>Project-Dublin</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {token ? (
              <NavDropdown title='UserName' id='username'>
                <Link href='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </Link>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href='/login'>
                <Nav.Link>Login</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
