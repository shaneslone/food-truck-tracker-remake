import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Truck } from '../types';
import EditTruckModal from './EditTruckModal';
import TruckCard from './TruckCard';

interface IProps {
  truck: Truck;
}
const OperatorTruckCard: React.FC<IProps> = ({ truck }) => {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => {
    setShow(prevShow => !prevShow);
  };

  return (
    <>
      <EditTruckModal truck={truck} show={show} toggle={toggle} />
      <TruckCard truck={truck}>
        <Button variant='primary' onClick={toggle}>
          Edit
        </Button>
      </TruckCard>
    </>
  );
};

export default OperatorTruckCard;
