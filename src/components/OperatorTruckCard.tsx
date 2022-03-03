import { Truck } from '../types';
import DeleteTruckButton from './DeleteTruckButton';
import EditTruckButton from './EditTruckButton';
import TruckCard from './TruckCard';

interface IProps {
  truck: Truck;
}
const OperatorTruckCard: React.FC<IProps> = ({ truck }) => {
  return (
    <TruckCard truck={truck}>
      <EditTruckButton truck={truck} />
      <DeleteTruckButton truck={truck} />
    </TruckCard>
  );
};

export default OperatorTruckCard;
