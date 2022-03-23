import { Card, Col, Container, Row } from 'react-bootstrap';
import bg1 from '../../images/bg1.jpg';
const style = {
  backgroundImage: `url(${bg1})`,
  width: '100%',
  height: '100vh',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};
const Reviews = () => {
  return (
    <Container
      fluid
      className='text-center d-flex justify-content-evenly align-items-center flex-column mt-5'
      style={style}
    >
      <Row>
        <Col md='auto' className='bg-white h2'>
          What people are saying?
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Finding my favorite trucks is so easy!</Card.Header>
            <Card.Body>
              I never have to wonder where my favorite food trucks are. Food
              Truck Tracker gives me the power to find the food I want with zero
              hassle! I can't live without it!
            </Card.Body>
            <Card.Footer>Jane Smith - loyal diner</Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>My business is up 50%!</Card.Header>
            <Card.Body>
              Unlike a standard restaurant, owning a food truck means your
              business can be anywhere at any time. Food Truck Tracker has let
              me keep my loyal customer informed about where and when they can
              find me. It's be amazing for business, sales have never been
              better!
            </Card.Body>
            <Card.Footer>Alex Williams - truck owner</Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              I can't imagine living without Food Truck Tracker!
            </Card.Header>
            <Card.Body>
              I don't ever want to go back to wondering when or if my favorite
              food truck would be near my office for lunch. Know I can take the
              guesswork out of getting the grub I love with Food Truck Tracker's
              simple and easy to use site. I cant live without it!
            </Card.Body>
            <Card.Footer>April Jones - hungry businesswoman</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
