import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Map } from 'react-bootstrap-icons';

const MapButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/map');
  };

  return (
    <Button variant='primary' onClick={onClick} size='sm' className='m-1'>
      <Map /> Map
    </Button>
  );
};

export default MapButton;
