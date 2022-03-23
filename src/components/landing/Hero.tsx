import { Col, Container, Row } from 'react-bootstrap';
import heroImage from '../../images/hero.jpg';

const style = {
  backgroundImage: `url(${heroImage})`,
  width: '100%',
  height: '100vh',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const Hero = () => {
  return (
    <Container
      fluid
      style={style}
      className='text-center d-flex align-items-center justify-content-center'
    >
      <Row>
        <Col md='auto' className='bg-white h2'>
          Find the food that you love! Join today as either a diner or truck
          owner!
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
