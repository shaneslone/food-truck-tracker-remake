import { Card, Carousel, Image } from "react-bootstrap";
import { MenuItem } from "../types";

interface Iprops {
  menuItem: MenuItem;
}

const MenuItemCard: React.FC<Iprops> = ({ menuItem }) => {
  return (
    <Card>
      <Card.Header>{menuItem.itemName}</Card.Header>
      <Card.Body>
        {menuItem.itemPhotos.length === 1 && <Image />}
        {menuItem.itemPhotos.length > 1 && <Carousel></Carousel>}
      </Card.Body>
    </Card>
  );
};

export default MenuItemCard;
