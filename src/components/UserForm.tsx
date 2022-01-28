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
import { useSelector } from 'react-redux';
import { userState } from '../store/reducers/user';
import useUserForm from '../hooks/useUserForm';

const UserForm = () => {
  const loading = useSelector<userState, boolean>(state => state.loading);
  const ajaxError = useSelector<userState, string>(state => state.errorMessage);

  const [userInfo, errors, disabled, onChange, onSubmit] = useUserForm();

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
        <Col md={4}>
          {ajaxError && <Alert variant='danger'>{ajaxError}</Alert>}
        </Col>
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
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.username}
                </Form.Control.Feedback>
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
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Email'>
                <Form.Control
                  type='text'
                  placeholder='Enter your email.'
                  name='email'
                  value={userInfo.email}
                  onChange={onChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.email}
                </Form.Control.Feedback>
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
            <Form.Control.Feedback type='invalid' tooltip>
              {errors.accountType}
            </Form.Control.Feedback>
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
            <Button variant='primary' type='submit' disabled={disabled}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserForm;
