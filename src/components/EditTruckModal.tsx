import { useState } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { Truck } from '../types';
import AddMenuItem from './AddMenuItem';
import AddPhoto from './AddPhoto';
import MenuItemCard from './MenuItemCard';

interface IProps {
  show: boolean;
  toggle: () => void;
  truck: Truck;
}

const EditTruckModal: React.FC<IProps> = ({ show, toggle, truck }) => {
  const [addMenuItem, setAddMenuItem] = useState<boolean>(false);
  const toggleAddMenuItem = () => {
    setAddMenuItem(prev => !prev);
  };
  return (
    <Modal show={show} onHide={toggle} size='lg' centered>
      <Container>
        <Modal.Header closeButton>
          <Modal.Title>{truck.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='d-flex justify-content-center'>
            <Col md='auto'>
              <Button variant='primary' onClick={toggleAddMenuItem}>
                {addMenuItem ? 'Finished' : 'Add New Menu Item'}
              </Button>
            </Col>
          </Row>
          <Row>{addMenuItem && <AddMenuItem />}</Row>
          <Row>
            {truck.menu.length > 0 && <Col className='h3'>Menu Items</Col>}
          </Row>
          <Row className='d-flex justify-content-center'>
            {truck.menu.map(menuItem => {
              return (
                <Col md={4}>
                  <MenuItemCard menuItem={menuItem}>
                    <AddPhoto menuItem={menuItem} />
                  </MenuItemCard>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default EditTruckModal;
