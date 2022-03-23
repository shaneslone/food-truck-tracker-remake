import { Card, Col, Container, Row } from 'react-bootstrap';

const About = () => {
  return (
    <Container fluid className='mt-5'>
      <Row>
        <Col className='text-center h2'>
          Food Truck Tracker is for everyone!
        </Col>
      </Row>
      <Row className='d-flex justify-content-evenly'>
        <Col md={6} className='p-2'>
          <Card>
            <Card.Header>Diners</Card.Header>
            <Card.Body>
              As a diner, find your favorite food trucks whever you are, and
              whever they are! You can save your favorite trucks and locate them
              with a single click. View truck locations, menues, and departure
              times. You can also give feedback by reviewing food trucks and
              individual menu items!
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='p-2'>
          <Card>
            <Card.Header>Owners</Card.Header>
            <Card.Body>
              As an owner, list the food trucks you own so customers can find
              you no matter where you are located. List your truck, add menu
              items, set departure times for your current location. You can
              eaily update the location of your truck to keep your customers
              informed thoughtout the day. Review valuable feedback from your
              customer to know if you food is a hit, or needs a little work!
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
