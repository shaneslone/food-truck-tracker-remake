import { Modal, Container, Row, Col } from 'react-bootstrap';
import { Truck } from '../types';
import MenuItemCard from './MenuItemCard';

interface IProps {
  show: boolean;
  toggle: () => void;
  truck: Truck;
}

const EditTruckModal: React.FC<IProps> = ({ show, toggle, truck }) => {
  return (
    <Modal show={show} onHide={toggle}>
      <Container>
        <Row>
          <Col className='h3'>Menu Items</Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          {truck.menu.map(menuItem => {
            return (
              <Col md={4}>
                <MenuItemCard menuItem={menuItem} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Modal>
  );
};

export default EditTruckModal;
