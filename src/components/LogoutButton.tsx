import { Button } from 'react-bootstrap';
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
      Logout
    </Button>
  );
};

export default LogoutButton;
