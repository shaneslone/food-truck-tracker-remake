import { ChangeEvent, useState } from 'react';
import { Credentials, User } from '../types';
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/users';
import { userState } from '../store/reducers/user';

const Login = () => {
  const dispatch = useDispatch();

  const user = useSelector<userState, User>(state => state.user);
  const error = useSelector<userState, string>(state => state.errorMessage);

  const initalState: Credentials = {
    username: '',
    password: '',
  };

  const [credentials, setCredentials] = useState(initalState);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login(credentials));
    setCredentials(initalState);
  };

  return (
    <Container>
      <Row>
        <Col>{user && JSON.stringify(user)}</Col>
      </Row>
      <Row>
        <Col>{error && <p>{error}</p>}</Col>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Username'>
                <Form.Control
                  type='text'
                  placeholder='Enter username.'
                  name='username'
                  value={credentials.username}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Password'>
                <Form.Control
                  type='password'
                  placeholder='Enter password.'
                  name='password'
                  value={credentials.password}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Button variant='primary' type='submit'>
              Log In
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
