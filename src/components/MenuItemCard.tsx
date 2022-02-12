import { Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { MenuItem, RootState, User } from "../types";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Iprops {
  menuItem: MenuItem;
}

const MenuItemCard: React.FC<Iprops> = ({ menuItem }) => {
  const user = useSelector<RootState, User>((state) => state.user.user);
  const [rating, setRating] = useState<number>(0);

  const handleRating = (rating: number) => setRating(rating);

  const getCustomerRating = () => {
    const result = user.menuItemReviews.filter(
      (review) => review.menuItem.menuId === menuItem.menuId
    );
    if (result.length) return result[0].score;
    return 0;
  };

  return (
    <Card className="w-100">
      <Card.Header className="d-flex justify-content-center">
        {menuItem.itemName}
      </Card.Header>
      <Card.Body className="d-flex align-items-center flex-column">
        {menuItem.itemPhotos.length === 1 && (
          <Image src={menuItem.itemPhotos[0].url} style={{ width: "100%" }} />
        )}
        {menuItem.itemPhotos.length > 1 && (
          <Carousel>
            {menuItem.itemPhotos.map((photo) => {
              <Carousel.Item>
                <Image src={photo.url} />
              </Carousel.Item>;
            })}
          </Carousel>
        )}
        <Card.Text className="d-flex justify-content-center">
          {menuItem.itemDescription}
        </Card.Text>
        <Card.Text className="d-flex justify-content-center">
          {`Price: ${menuItem.itemPrice}`}
        </Card.Text>
        <Container className="d-flex align-items-center flex-column">
          <Row className="w-auto">
            <Col>Customer Average Rating</Col>
          </Row>
          <Row className="w-auto">
            <Col>
              <Rating
                ratingValue={0}
                initialValue={menuItem.customerRatingsAvg}
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
            </Col>
          </Row>
          <Row className="w-auto">
            <Col>Your Rating</Col>
          </Row>
          <Row className="w-auto">
            <Col>
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
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MenuItemCard;
