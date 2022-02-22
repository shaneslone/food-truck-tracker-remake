import TruckCard from './TruckCard';
import LocateTruckButton from './LocateTruckButton';
import { Truck } from '../types';

interface IProps {
  truck: Truck;
}
const DinerTruckCard: React.FC<IProps> = ({ truck }) => {
  return (
    <TruckCard truck={truck}>
      <LocateTruckButton truck={truck} />
    </TruckCard>
  );
};

export default DinerTruckCard;
