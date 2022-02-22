import { ReactNode, useState } from 'react';
import { Col, Container, Row, Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { Person } from 'react-bootstrap-icons';
import LogoutButton from './LogoutButton';
import MapButton from './MapButton';
import { useSelector } from 'react-redux';
import { RootState, User } from '../types';

interface IProps {
  children?: ReactNode;
}

const MenuContainer: React.FC<IProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const user = useSelector<RootState, User>(state => state.user.user);

  const toggleShow = () => {
    setShow(prevShow => !prevShow);
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={toggleShow}
        style={{
          position: 'fixed',
          right: '5%',
          top: '5%',
          zIndex: '10',
        }}
      >
        <List />
      </Button>
      <Offcanvas
        show={show}
        onHide={toggleShow}
        placement='end'
        style={{ maxHeight: '100vh', overflow: 'scroll' }}
      >
        <Offcanvas.Header closeButton>
          <Container fluid>
            <Row className='m-2'>
              <Col className='d-flex align-items-center'>
                <Person />
                {user.username}
              </Col>
              <Col>
                <MapButton />
              </Col>
              <Col>
                <LogoutButton />
              </Col>
            </Row>
          </Container>
        </Offcanvas.Header>
        {children}
      </Offcanvas>
    </>
  );
};

export default MenuContainer;
