import { Truck } from '../types';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IProps {
  truck: Truck;
}
const TruckMapCard: React.FC<IProps> = props => {
  const { truck } = props;

  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={truck.imageOfTruck} />
      <Card.Body>
        <Card.Title>{truck.name}</Card.Title>
        <ListGroup variant='flush'>
          <ListGroup.Item>Food Type: {truck.cuisineType}</ListGroup.Item>
          <ListGroup.Item>
            Average Rating:{' '}
            {truck.customerRatingsAvg ? truck.customerRatingsAvg : 'N/A'}
          </ListGroup.Item>
          <ListGroup.Item>Departure Time: {truck.departureTime}</ListGroup.Item>
        </ListGroup>

        <Button
          variant='primary'
          onClick={() => {
            navigate(`/truck/${truck.truckId}`);
          }}
        >
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TruckMapCard;
