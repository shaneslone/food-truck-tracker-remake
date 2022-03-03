import { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrucks, setTruckToEdit } from '../store/actions/trucks';
import { getUser } from '../store/actions/users';
import { RootState, Truck } from '../types';
import axiosWithAuth from '../utils/axoisWithAuth';
import EditMenuItemModal from './EditMenuItemModal';

interface IProps {
  truck: Truck;
}
const DeleteTruckButton: React.FC<IProps> = ({ truck }) => {
  const [show, setShow] = useState<boolean>(false);
  const toggle = () => {
    setShow(prev => !prev);
  };
  const [ajaxError, setAjaxError] = useState<string>('');
  const dispatch = useDispatch();
  const deleteTruck = async () => {
    if (truck) {
      try {
        await axiosWithAuth().delete(`/trucks/truck/${truck.truckId}`);
        dispatch(getUser());
        dispatch(fetchTrucks());
        toggle();
      } catch (e) {
        setAjaxError(`Failed to delete ${truck.name}!`);
      }
    }
  };

  if (!truck) return null;
  return (
    <>
      <EditMenuItemModal show={show} toggle={toggle}>
        <Container>
          <Row className='d-flex justify-content-center'>
            <Col md={4}>
              {ajaxError && <Alert variant='danger'>{ajaxError}</Alert>}
            </Col>
          </Row>
          <Row className='text-center'>
            <Col>Are you sure you want to delete {truck.name}?</Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Col md='auto'>
              <Button variant='primary' onClick={deleteTruck}>
                Confirm Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </EditMenuItemModal>
      <Button variant='primary' onClick={toggle} size='sm' className='m-1'>
        <XCircle />
      </Button>
    </>
  );
};

export default DeleteTruckButton;
