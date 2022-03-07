import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
  Alert,
<<<<<<< HEAD
} from "react-bootstrap";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { RootState } from "../types";
import LoadingSpinner from "./LoadingSpinner";
=======
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { RootState } from '../types';
import LoadingSpinner from './LoadingSpinner';
>>>>>>> master

const Login = () => {
  const loading = useSelector<RootState, boolean>(
    (state) => state.user.loading
  );
  const ajaxError = useSelector<RootState, string>(
    (state) => state.user.errorMessage
  );

  const [credentials, errors, disabled, onChange, onSubmit] = useLogin();

  if (loading) return <LoadingSpinner />;

  return (
<<<<<<< HEAD
    <Container fluid>
      <Row className="d-flex justify-content-center">
=======
    <Container fluid className='text-center'>
      <Row className='d-flex justify-content-center'>
>>>>>>> master
        <Col md={4}>
          {ajaxError && (
            <Alert variant="danger" data-testid="login-alert">
              {ajaxError}
            </Alert>
          )}
        </Col>
      </Row>
<<<<<<< HEAD
      <Form onSubmit={onSubmit} data-testid="login-form">
        <Row className="d-flex justify-content-center m-4">
=======
      <Row>
        <Col className='text-center h1'>Food Truck Tracker</Col>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className='d-flex justify-content-center m-4'>
>>>>>>> master
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label="Username">
                <Form.Control
                  type="text"
                  placeholder="Enter username."
                  data-testid="username"
                  name="username"
                  value={credentials.username}
                  onChange={onChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center m-4">
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  placeholder="Enter password."
                  data-testid="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
<<<<<<< HEAD
        <Row className="d-flex justify-content-center">
          <Col md="auto">
            <Button
              variant="primary"
              type="submit"
              data-testid="login-btn"
              disabled={disabled}
            >
=======
        <Row className='d-flex justify-content-center'>
          <Col md='auto' className='d-flex justify-content-center'>
            <Button variant='primary' type='submit' disabled={disabled}>
>>>>>>> master
              Log In
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          Don't have an account?{' '}
          <Link to={'/signup'}>Click here to sign up!</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
