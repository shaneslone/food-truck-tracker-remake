import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import useFetchTruck from "../hooks/useFetchTruck";
import LoadingSpinner from "./LoadingSpinner";
import { Rating } from "react-simple-star-rating";
import MenuItemCard from "./MenuItemCard";

const TruckInfo = () => {
  const [
    currentTruck,
    Loading,
    errorMessage,
    rating,
    handleRating,
    getCustomerRating,
  ] = useFetchTruck();

  if (Loading) return <LoadingSpinner />;
  return (
    <Container className="d-flex align-items-center flex-column bg-danger">
      <Row>
        <Col className="d-flex justify-content-center m-2">
          {currentTruck.name}
        </Col>
        <Col className="d-flex justify-content-center m-2">
          <Button>Add to Favorites</Button>
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
            <ListGroup.Item className="d-flex justify-content-center align-items-center">
              Average Customer Rating:{" "}
              <Rating
                ratingValue={0}
                initialValue={currentTruck.customerRatingsAvg}
                allowHalfIcon
                transition
                readonly
                fillColorArray={[
                  "#f17a45",
                  "#f19745",
                  "#f1a545",
                  "#f1b345",
                  "#f1d045",
                ]}
              />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center align-items-center">
              Your Rating:{" "}
              <Rating
                ratingValue={rating}
                initialValue={getCustomerRating()}
                onClick={handleRating}
                allowHalfIcon
                transition
                fillColorArray={[
                  "#f17a45",
                  "#f19745",
                  "#f1a545",
                  "#f1b345",
                  "#f1d045",
                ]}
              />
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
