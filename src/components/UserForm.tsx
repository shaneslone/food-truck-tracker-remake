import { ChangeEvent } from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
  Alert,
  OverlayTrigger,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userState } from '../store/reducers/user';
import useUserForm from '../hooks/useUserForm';
import LoadingSpinner from './LoadingSpinner';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { stringifyLoction } from '../utils/locationHelpers';

const UserForm = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const loading = useSelector<userState, boolean>(state => state.loading);
  const ajaxError = useSelector<userState, string>(state => state.errorMessage);

  const [userInfo, errors, disabled, updateLocation, onChange, onSubmit] =
    useUserForm();

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
        <Row className='d-flex justify-content-center m-4'>
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
        <Row className='d-flex justify-content-center m-4'>
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
        <Row className='d-flex justify-content-center m-4'>
          <Col md={4}>
            <OverlayTrigger
              trigger='focus'
              placement='bottom-start'
              overlay={
                <Popover>
                  <PopoverHeader>Location Suggestions</PopoverHeader>
                  <PopoverBody>
                    <ListGroup>
                      {status === 'OK' &&
                        data.map(suggestion => (
                          <ListGroupItem
                            style={{ cursor: 'pointer' }}
                            key={suggestion.place_id}
                            onClick={async () => {
                              setValue(suggestion.description);
                              clearSuggestions();
                              try {
                                const results = await getGeocode({
                                  address: suggestion.description,
                                });
                                const coords = await getLatLng(results[0]);
                                updateLocation(stringifyLoction(coords));
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                          >
                            {suggestion.description}
                          </ListGroupItem>
                        ))}
                    </ListGroup>
                  </PopoverBody>
                </Popover>
              }
            >
              <Form.Group>
                <FloatingLabel label='Current Location'>
                  <Form.Control
                    autoComplete='off'
                    type='text'
                    placeholder='Current Location.'
                    name='currentLocation'
                    value={value}
                    disabled={!ready}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setValue(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center m-4'>
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
          <Col md='auto'>
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
