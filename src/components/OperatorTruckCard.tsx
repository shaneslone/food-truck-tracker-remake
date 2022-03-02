import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { setTruckToEdit } from '../store/actions/trucks';
import { Truck } from '../types';
import EditTruckButton from './EditTruckButton';
import EditTruckModal from './EditTruckModal';
import TruckCard from './TruckCard';

interface IProps {
  truck: Truck;
}
const OperatorTruckCard: React.FC<IProps> = ({ truck }) => {
  return (
    <TruckCard truck={truck}>
      <EditTruckButton truck={truck} />
    </TruckCard>
  );
};

export default OperatorTruckCard;
