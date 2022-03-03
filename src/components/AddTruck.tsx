import { ChangeEvent } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FloatingLabel,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import useAddTruckForm from '../hooks/useAddTruckForm';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { stringifyLoction } from '../utils/locationHelpers';
import { Truck } from '../types';

interface IProps {
  truckToEdit?: Truck;
}

const AddTruck: React.FC<IProps> = ({ truckToEdit }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [
    truckInfo,
    errors,
    disabled,
    ajaxError,
    changeDepartureDate,
    updateLocation,
    onChange,
    onSubmit,
  ] = useAddTruckForm(truckToEdit);

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
              <FloatingLabel label='Name of Truck'>
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

        <Row className='d-flex justify-content-center m-4'>
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

        <Row className='d-flex justify-content-center m-4'>
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
          <Col md={4}>
            Departure Time
            <DateTimePicker
              name='departureTime'
              value={new Date(truckInfo.departureTime)}
              onChange={changeDepartureDate}
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

export default AddTruck;
