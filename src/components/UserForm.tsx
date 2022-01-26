import { ChangeEvent, useState } from 'react';
import { UserMin } from '../types';
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/actions/users';
import { userState } from '../store/reducers/user';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector<userState, boolean>(state => state.loading);
  const error = useSelector<userState, string>(state => state.errorMessage);

  const initalValues: UserMin = {
    username: '',
    password: '',
    email: '',
    currentLocation: '',
    accountType: '',
  };

  const [userInfo, setUserInfo] = useState<UserMin>(initalValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.type === 'radio' ? e.target.id : e.target.value;
    setUserInfo(userInfo => ({
      ...userInfo,
      [e.target.name]: value,
    }));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(createUser(userInfo, navigate));
    setUserInfo(initalValues);
  };

  if (loading) {
    <Container
      style={{ height: '100vh' }}
      fluid
      className='d-flex justify-content-center align-items-center'
    >
      <Spinner animation='border' variant='primary' />
    </Container>;
  }

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={4}>{error && <Alert variant='danger'>{error}</Alert>}</Col>
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
                  value={userInfo.username}
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
                  placeholder='Enter a password.'
                  name='password'
                  value={userInfo.password}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Email'>
                <Form.Control
                  type='text'
                  placeholder='Enter your email.'
                  name='email'
                  value={userInfo.email}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Current Location'>
                <Form.Control
                  type='text'
                  placeholder='Current Location.'
                  name='currentLocation'
                  value={userInfo.currentLocation}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={2}>
            <Form.Check
              inline
              name='accountType'
              type='radio'
              id='DINER'
              label='Diner'
              checked={userInfo.accountType === 'DINER'}
              onChange={onChange}
            />
          </Col>
          <Col md={2}>
            <Form.Check
              inline
              name='accountType'
              type='radio'
              id='OPERATOR'
              label='Operator'
              checked={userInfo.accountType === 'OPERATOR'}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserForm;
