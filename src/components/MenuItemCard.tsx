import { Button, ButtonGroup, Card, Carousel, Image } from "react-bootstrap";
import { MenuItem } from "../types";

interface Iprops {
  menuItem: MenuItem;
}

const MenuItemCard: React.FC<Iprops> = ({ menuItem }) => {
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
        <ButtonGroup>
          <Button variant="outline-primary">
            <i className="bi bi-star"></i>
          </Button>
          <Button variant="outline-primary">
            <i className="bi bi-star"></i>
          </Button>
          <Button variant="outline-primary">
            <i className="bi bi-star"></i>
          </Button>
          <Button variant="outline-primary">
            <i className="bi bi-star"></i>
          </Button>
          <Button variant="outline-primary">
            <i className="bi bi-star"></i>
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default MenuItemCard;
