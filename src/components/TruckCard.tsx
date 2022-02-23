import { Truck } from '../types';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface IProps {
  truck: Truck;
  children?: ReactNode;
}
const TruckCard: React.FC<IProps> = ({ truck, children }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={truck.imageOfTruck} />
      <Card.Body>
        <Card.Title
          style={{ cursor: 'pointer' }}
          className='text-center'
          onClick={() => {
            navigate(`/truck/${truck.truckId}`);
          }}
        >
          {truck.name}
        </Card.Title>
        <ListGroup variant='flush'>
          <ListGroup.Item>Food Type: {truck.cuisineType}</ListGroup.Item>
          <ListGroup.Item>
            Departure Time: {new Date(truck.departureTime).toLocaleString()}
          </ListGroup.Item>
        </ListGroup>
        <Container className='d-flex justify-content-center'>
          {children}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default TruckCard;
