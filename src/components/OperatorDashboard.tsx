import { Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, User } from '../types';

const OperatorDashboard = () => {
  const user = useSelector<RootState, User>(state => state.user.user);
  const navigate = useNavigate();
  const addTruck = () => {
    navigate('/addtruck');
  };
  return (
    <Container>
      <Row className='d-flex align-items-center'>
        <Col md='auto'>
          <Button variant='primary' onClick={addTruck}>
            Add Truck
          </Button>
        </Col>
      </Row>
      <Row className='d-flex align-items-center'>
        <Col md='auto'>My Trucks</Col>
      </Row>
    </Container>
  );
};

export default OperatorDashboard;
