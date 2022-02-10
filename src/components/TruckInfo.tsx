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
    <Container className="d-flex align-items-center flex-column bg-danger">
      <Row className="w-25">
        <Col className="d-flex justify-content-center">{currentTruck.name}</Col>
      </Row>
      <Row className="w-75">
        <Col>
          <Image
            style={{
              width: "100%",
            }}
            src={currentTruck.imageOfTruck}
          />
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
