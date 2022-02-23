import { Button } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../store/actions/users';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(userLogout(navigate));
  };
  return (
    <Button variant='primary' onClick={onClick}>
      <BoxArrowRight /> Logout
    </Button>
  );
};

export default LogoutButton;
