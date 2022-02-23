import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { locateTruck } from '../store/actions/trucks';
import { Truck } from '../types';

interface IProps {
  truck: Truck;
}
const LocateTruckButton: React.FC<IProps> = ({ truck }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findTruck = () => {
    dispatch(locateTruck(truck));
    navigate('/map');
  };

  return (
    <Button className='m-1' onClick={findTruck}>
      Locate Truck
    </Button>
  );
};

export default LocateTruckButton;
