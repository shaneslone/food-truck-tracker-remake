import { Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, User } from '../types';
import OperatorTruckCard from './OperatorTruckCard';

const OperatorDashboard = () => {
  const user = useSelector<RootState, User>(state => state.user.user);
  const navigate = useNavigate();
  const addTruck = () => {
    navigate('/addtruck');
  };
  return (
    <Container fluid>
      <Row className='d-flex justify-content-center m-1'>
        <Col md='auto'>
          <Button variant='primary' onClick={addTruck}>
            Add Truck
          </Button>
        </Col>
      </Row>
      <Row className='d-flex align-items-center'>
        <Col md='auto'>My Trucks</Col>
      </Row>
      <Row>
        <Accordion>
          {user.ownedTrucks.map(truck => {
            return (
              <Accordion.Item eventKey={truck.name}>
                <Accordion.Header>{truck.name}</Accordion.Header>
                <Accordion.Body>
                  <OperatorTruckCard truck={truck} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Row>
    </Container>
  );
};

export default OperatorDashboard;
