import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState, User } from '../types';
import MenuContainer from './MenuContainer';
import { Person } from 'react-bootstrap-icons';
import LogoutButton from './LogoutButton';

const Menu = () => {
  const user = useSelector<RootState, User>(state => state.user.user);
  return (
    <MenuContainer>
      <Container>
        <Row>
          <Col>
            <Person />
            {user.username}
          </Col>
          <Col>
            <LogoutButton />
          </Col>
        </Row>
      </Container>
    </MenuContainer>
  );
};

export default Menu;
