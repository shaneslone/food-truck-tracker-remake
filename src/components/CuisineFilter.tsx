import { ChangeEvent, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchTrucks, fetchTrucksByCuisine } from '../store/actions/trucks';

const CuisineFilter = () => {
  const dispatch = useDispatch();
  const [cusineType, setCusineType] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCusineType(e.target.value);
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchTrucksByCuisine(cusineType));
  };

  const onReset = () => {
    setCusineType('');
    dispatch(fetchTrucks());
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row className='d-flex justify-content-center m-4'>
          <Col md={8}>
            <Form.Group>
              <FloatingLabel label='What would you like to eat?'>
                <Form.Control
                  type='text'
                  name='cusineType'
                  value={cusineType}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button variant='primary' type='submit'>
              Filter
            </Button>
          </Col>
          <Col md={1}>
            <Button variant='primary' type='reset' onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CuisineFilter;
