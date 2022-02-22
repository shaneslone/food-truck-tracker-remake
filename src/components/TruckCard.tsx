import { Truck } from "../types";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { locateTruck } from "../store/actions/trucks";

interface IProps {
  truck: Truck;
}
const TruckCard: React.FC<IProps> = (props) => {
  const { truck } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findTruck = () => {
    dispatch(locateTruck(truck));
    navigate("/map");
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={truck.imageOfTruck} />
      <Card.Body>
        <Card.Title>{truck.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Food Type: {truck.cuisineType}</ListGroup.Item>
          <ListGroup.Item>Departure Time: {truck.departureTime}</ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/truck/${truck.truckId}`);
          }}
        >
          More Info
        </Button>
        <Button onClick={findTruck}>Locate Truck</Button>
      </Card.Body>
    </Card>
  );
};

export default TruckCard;
