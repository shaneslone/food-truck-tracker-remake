import { ChangeEvent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchTrucksByRating } from '../store/actions/trucks';

const RatingFilter = () => {
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(fetchTrucksByRating(e.target.value));
  };
  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md='auto'>Filter trucks by average rating.</Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col md='auto'>
          <Form.Select onChange={onChange}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
};

export default RatingFilter;
