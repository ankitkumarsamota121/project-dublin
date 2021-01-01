import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TODO, DELETE_TODO, EDIT_TODO } from '../graphql/mutations';
import { GET_ALL_TODOS } from '../graphql/queries';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Container,
  ListGroup,
  Form,
  FormControl,
  Button,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

interface ITodosScreenProps {}

interface IStoreState {
  token: string;
}

const TodosScreen: React.FC<ITodosScreenProps> = () => {
  const router = useRouter();
  const { loading, error, data: getData, refetch } = useQuery(GET_ALL_TODOS);
  const [createTodo, { data: createData }] = useMutation(CREATE_TODO);
  const [editTodo, { data: editData }] = useMutation(EDIT_TODO);
  const [deleteTodo, { data: deleteData }] = useMutation(DELETE_TODO);
  const [todo, setTodo] = useState('');

  const token = useSelector((state: IStoreState) => state.token);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    console.log(getData);
  }, [token, editData, createData, getData, deleteTodo]);

  const createHandler = (e: any) => {
    e.preventDefault();

    createTodo({ variables: { desc: todo } });
    refetch();
  };

  const editHandler = (id: string) => {
    editTodo({ variables: { id, isCompleted: true } });
    refetch();
  };

  const deleteHandler = (id: string) => {
    deleteTodo({ variables: { id } });
    refetch();
  };

  return (
    <>
      <Header />
      <Container className='mt-4' style={{ minHeight: '80vh' }}>
        <FormContainer>
          <h1 style={{ textAlign: 'center' }}>TODOS</h1>
          <Form className='px-2' style={{ display: 'flex' }} onSubmit={createHandler}>
            <FormControl
              type='text'
              placeholder='I have to do...'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button className='ml-4' variant='success' type='submit'>
              Add
            </Button>
          </Form>
          <ListGroup className='mt-2'>
            {getData
              ? getData.getAllTodos.map((todo: any) => (
                  <ListGroup.Item key={todo.id}>
                    <Row className='align-items-center'>
                      <Col xs={9}>Some Todo</Col>
                      <Col xs={3}>
                        <ButtonGroup className='ml-auto' size='sm'>
                          <Button variant='success' onClick={() => editHandler(todo.id)}>
                            Done
                          </Button>
                          <Button variant='danger' onClick={() => deleteHandler(todo.id)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              : 'Loading...'}
          </ListGroup>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default TodosScreen;
