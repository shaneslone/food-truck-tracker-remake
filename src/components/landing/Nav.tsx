import {
  Col,
  Navbar,
  NavLink,
  Row,
  Container,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar fixed='top' bg='light'>
      <Container fluid>
        <Row className='d-flex justify-content-space-between w-100'>
          <Col md={8}>
            <Navbar.Brand>Food Truck Tracker</Navbar.Brand>
          </Col>
          <Col md={4} className='d-flex justify-content-end'>
            <Nav>
              <NavItem>
                <NavLink
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  Join
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
