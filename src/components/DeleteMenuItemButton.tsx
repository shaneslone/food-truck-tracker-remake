import { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/actions/users';
import { MenuItem } from '../types';
import axiosWithAuth from '../utils/axoisWithAuth';
import EditMenuItemModal from './EditMenuItemModal';

interface IProps {
  itemToDelete: MenuItem;
}

const DeleteMenuItemButton: React.FC<IProps> = ({ itemToDelete }) => {
  const [deleteMenuItem, setDeleteMenuItem] = useState<boolean>(false);
  const toggleDeleteMenuItem = () => {
    setDeleteMenuItem(prev => !prev);
  };

  const [ajaxError, setAjaxError] = useState<string>('');

  const dispatch = useDispatch();

  const confirmDelete = async () => {
    try {
      await axiosWithAuth().delete(
        `/menuitems/menuitem/${itemToDelete.menuId}`
      );
      dispatch(getUser());
      toggleDeleteMenuItem();
    } catch (e) {
      setAjaxError(`Failed to delete ${itemToDelete.itemName}`);
    }
  };
  return (
    <>
      <Button
        variant='primary'
        onClick={toggleDeleteMenuItem}
        className='m-1'
        size='sm'
      >
        <XCircle />
      </Button>
      <EditMenuItemModal show={deleteMenuItem} toggle={toggleDeleteMenuItem}>
        <Container>
          <Row className='d-flex justify-content-center'>
            <Col md={4}>
              {ajaxError && <Alert variant='danger'>{ajaxError}</Alert>}
            </Col>
          </Row>
          <Row className='text-center'>
            <Col>Are you sure you want to delete {itemToDelete.itemName}?</Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Col xs='auto'>
              <Button variant='primary' onClick={confirmDelete}>
                Confirm Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </EditMenuItemModal>
    </>
  );
};

export default DeleteMenuItemButton;
