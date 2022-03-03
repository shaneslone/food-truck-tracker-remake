import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState, User } from '../types';
import MenuContainer from './MenuContainer';
import OperatorDashboard from './OperatorDashboard';
import UserDashboard from './UserDashboard';

const Menu = () => {
  const user = useSelector<RootState, User>(state => state.user.user);
  const isDiner =
    user.roles.filter(role => role.role.name === 'DINER').length > 0;
  const displayDashboard = () => {
    if (isDiner) {
      return <UserDashboard />;
    } else {
      return <OperatorDashboard />;
    }
  };
  return (
    <MenuContainer>
      <Container>
        <Row>
          <Col>{displayDashboard()}</Col>
        </Row>
      </Container>
    </MenuContainer>
  );
};

export default Menu;
