import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setTruckToEdit } from '../store/actions/trucks';
import { Truck } from '../types';
import EditTruckModal from './EditTruckModal';
import TruckCard from './TruckCard';

interface IProps {
  truck: Truck;
}
const OperatorTruckCard: React.FC<IProps> = ({ truck }) => {
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
      <EditTruckModal truck={truck} show={show} toggle={toggle} />
      <TruckCard truck={truck}>
        <Button
          variant='primary'
          onClick={() => {
            edit(truck);
          }}
        >
          Edit
        </Button>
      </TruckCard>
    </>
  );
};

export default OperatorTruckCard;
