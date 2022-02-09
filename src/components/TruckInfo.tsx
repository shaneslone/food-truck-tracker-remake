import {
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import useFetchTruck from "../hooks/useFetchTruck";
import LoadingSpinner from "./LoadingSpinner";

const TruckInfo = () => {
  const [currentTruck, Loading, errorMessage] = useFetchTruck();

  console.log(currentTruck);

  if (Loading) return <LoadingSpinner />;
  return (
    <Container>
      <Row>
        <Col>{currentTruck.name}</Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image
          style={{
            width: '100%'
          }}
          src={currentTruck.imageOfTruck} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem>{currentTruck.cuisineType}</ListGroupItem>
            <ListGroupItem>{currentTruck.departureTime}</ListGroupItem>
            <ListGroupItem>{currentTruck.customerRatingsAvg}</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TruckInfo;
