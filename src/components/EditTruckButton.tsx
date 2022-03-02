import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { setTruckToEdit } from '../store/actions/trucks';
import { Truck } from '../types';
import EditTruckModal from './EditTruckModal';

interface IProps {
  truck: Truck;
}
const EditTruckButton: React.FC<IProps> = ({ truck }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setShow(prevShow => !prevShow);
  };

  const edit = (truck: Truck) => {
    dispatch(setTruckToEdit(truck));
    toggle();
  };

  return (
    <>
      <EditTruckModal show={show} toggle={toggle} />
      <Button
        variant='primary'
        onClick={() => {
          edit(truck);
        }}
      >
        <Pencil />
      </Button>
    </>
  );
};

export default EditTruckButton;
