import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TODO, DELETE_TODO, EDIT_TODO } from '../graphql/mutations';
import { GET_ALL_TODOS } from '../graphql/queries';

import { useSelector } from 'react-redux';

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

// Interfaces
import { IStoreState, ITodo, IDelResp } from '../interfaces';

interface IGetTodos {
  getAllTodos: ITodo[];
}

interface ICreateResp extends ITodo {}

interface ICreateArgs {
  desc: string;
}

interface IEditResp extends ITodo {}

interface IEditArgs {
  id: string;
  desc?: string;
  isCompleted?: boolean;
}

interface IDeleteResp extends IDelResp {}

interface IDeleteArgs {
  id: string;
}

const TodosScreen: React.FC<ITodosScreenProps> = () => {
  const router = useRouter();

  const { loading: loadingGet, data: getData, refetch } = useQuery<IGetTodos>(GET_ALL_TODOS, {
    fetchPolicy: 'network-only',
  });
  const [createTodo, { loading: loadingCreate }] = useMutation<
    { createTodo: ICreateResp },
    ICreateArgs
  >(CREATE_TODO);
  const [editTodo, { loading: loadingEdit }] = useMutation<{ editTodo: IEditResp }, IEditArgs>(
    EDIT_TODO
  );
  const [deleteTodo, { loading: loadingDelete }] = useMutation<
    { deleteTodo: IDeleteResp },
    IDeleteArgs
  >(DELETE_TODO);

  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: IStoreState) => state.token);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    refetch();
    setLoading(loadingCreate || loadingEdit || loadingDelete);
  }, [token, loadingCreate, loadingEdit, loadingDelete]);

  useEffect(() => {
    if (getData) {
      console.log('Fetched Data!');
    }
  }, [getData, loading]);

  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo({ variables: { desc: todo } });
    setTodo('');
  };

  const editHandler = (id: string) => {
    editTodo({ variables: { id, isCompleted: true } });
  };

  const deleteHandler = (id: string) => {
    deleteTodo({ variables: { id } });
  };

  return (
    <>
      {console.log('Rendering!!!')}
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
            <Button className='ml-4' variant='success' type='submit' disabled={loadingCreate}>
              Add
            </Button>
          </Form>
          <ListGroup className='mt-2'>
            {getData
              ? getData.getAllTodos.map((todo) => (
                  <ListGroup.Item key={todo.id}>
                    <Row className='align-items-center'>
                      <Col xs={9}>
                        {todo.isCompleted ? (
                          <p style={{ textDecoration: 'line-through' }}>{todo.desc}</p>
                        ) : (
                          <p>{todo.desc}</p>
                        )}
                      </Col>
                      <Col xs={3}>
                        <ButtonGroup className='ml-auto' size='sm'>
                          <Button
                            variant='success'
                            disabled={loadingEdit}
                            onClick={() => editHandler(todo.id)}
                          >
                            Done
                          </Button>
                          <Button
                            variant='danger'
                            disabled={loadingDelete}
                            onClick={() => deleteHandler(todo.id)}
                          >
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
      {loading}
    </>
  );
};

export default TodosScreen;
