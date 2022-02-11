import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import useFetchTruck from "../hooks/useFetchTruck";
import LoadingSpinner from "./LoadingSpinner";
import MenuItemCard from "./MenuItemCard";

const TruckInfo = () => {
  const [currentTruck, Loading, errorMessage] = useFetchTruck();

  console.log(currentTruck);

  if (Loading) return <LoadingSpinner />;
  return (
    <Container className="d-flex align-items-center flex-column bg-danger">
      <Row className="w-auto">
        <Col className="d-flex justify-content-center m-2">
          {currentTruck.name}
        </Col>
      </Row>
      <Row className="w-75 m-2">
        <Col>
          <Image
            style={{
              width: "100%",
            }}
            src={currentTruck.imageOfTruck}
          />
        </Col>
      </Row>
      <Row className="w-75 m-2">
        <Col>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-center">{`Cuisine Type: ${currentTruck.cuisineType}`}</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center">{`Departure Time: ${currentTruck.departureTime}`}</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center">
              {`Avarage Customer Review: ${currentTruck.customerRatingsAvg}`}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row xs={1} md={2} className="w-75 m-2">
        {currentTruck.menu.map((menuItem) => (
          <Col>
            <MenuItemCard key={menuItem.menuId} menuItem={menuItem} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TruckInfo;
