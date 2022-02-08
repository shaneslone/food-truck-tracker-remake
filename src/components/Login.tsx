import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useLogin from '../hooks/useLogin';
import { RootState } from '../types';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {
  const loading = useSelector<RootState, boolean>(state => state.user.loading);
  const ajaxError = useSelector<RootState, string>(
    state => state.user.errorMessage
  );

  const [credentials, errors, disabled, onChange, onSubmit] = useLogin();

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={4}>
          {ajaxError && <Alert variant='danger'>{ajaxError}</Alert>}
        </Col>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className='d-flex justify-content-center m-4'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Username'>
                <Form.Control
                  type='text'
                  placeholder='Enter username.'
                  name='username'
                  value={credentials.username}
                  onChange={onChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center m-4'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Password'>
                <Form.Control
                  type='password'
                  placeholder='Enter password.'
                  name='password'
                  value={credentials.password}
                  onChange={onChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md='auto'>
            <Button variant='primary' type='submit' disabled={disabled}>
              Log In
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
