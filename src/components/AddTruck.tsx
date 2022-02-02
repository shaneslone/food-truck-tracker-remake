import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

import useAddTruckForm from '../hooks/useAddTruckForm';

const AddTruck = () => {
  const [truckInfo, errors, disabled, ajaxError, onChange, onSubmit] =
    useAddTruckForm();

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
              <FloatingLabel label='name'>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  name='name'
                  value={truckInfo.name}
                  onChange={onChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Truck Image'>
                <Form.Control
                  type='text'
                  placeholder='Truck Image URL'
                  name='imageOfTruck'
                  value={truckInfo.imageOfTruck}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Cuisine Type'>
                <Form.Control
                  type='text'
                  placeholder='Cuisine Type'
                  name='cuisineType'
                  value={truckInfo.cuisineType}
                  onChange={onChange}
                  isInvalid={!!errors.cuisineType}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.cuisineType}
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
                  placeholder='Current Location'
                  name='currentLocation'
                  value={truckInfo.currentLocation}
                  onChange={onChange}
                  isInvalid={!!errors.currentLocation}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.cuisineType}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Depature Time'>
                <Form.Control
                  type='datetime-local'
                  placeholder={new Date().toLocaleString()}
                  name='departureTime'
                  value={truckInfo.departureTime}
                  onChange={onChange}
                  isInvalid={!!errors.departureTime}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.departureTime}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
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

export default AddTruck;
