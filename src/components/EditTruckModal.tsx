import { useState } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState, Truck } from '../types';
import AddMenuItem from './AddMenuItem';
import AddPhotoButton from './AddPhotoButton';
import AddTruck from './AddTruck';
import DeleteMenuItemButton from './DeleteMenuItemButton';
import EditMenuItemButton from './EditMenuItemButton';
import MenuItemCard from './MenuItemCard';

interface IProps {
  show: boolean;
  toggle: () => void;
}

const EditTruckModal: React.FC<IProps> = ({ show, toggle }) => {
  const [addMenuItem, setAddMenuItem] = useState<boolean>(false);
  const toggleAddMenuItem = () => {
    setAddMenuItem(prev => !prev);
  };

  const [editTruck, setEditTruck] = useState<boolean>(false);
  const toggleEditTruck = () => {
    setEditTruck(prev => !prev);
  };

  const truck = useSelector<RootState, Truck | null>(
    state => state.trucks.truckToEdit
  );

  if (!truck) return null;
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
            <Col>
              <Button variant='primary' onClick={toggleEditTruck}>
                {editTruck ? 'Finished' : 'Edit Truck'}
              </Button>
            </Col>
          </Row>
          <Row>{addMenuItem && <AddMenuItem />}</Row>
          <Row>{editTruck && <AddTruck truckToEdit={truck} />}</Row>
          <Row>
            {truck.menu.length > 0 && <Col className='h3'>Menu Items</Col>}
          </Row>
          <Row className='d-flex justify-content-center'>
            {truck.menu.map(menuItem => {
              return (
                <Col md={4}>
                  <MenuItemCard menuItem={menuItem}>
                    <AddPhotoButton menuItem={menuItem} />
                    <EditMenuItemButton itemToEdit={menuItem} />
                    <DeleteMenuItemButton itemToDelete={menuItem} />
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
