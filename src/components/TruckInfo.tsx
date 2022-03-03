import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import useFetchTruck from '../hooks/useFetchTruck';
import LoadingSpinner from './LoadingSpinner';
import { Rating } from 'react-simple-star-rating';
import MenuItemCard from './MenuItemCard';
import Menu from './Menu';
import { Star, StarFill } from 'react-bootstrap-icons';

const TruckInfo = () => {
  const [
    currentTruck,
    isDiner,
    Loading,
    errorMessage,
    rating,
    handleRating,
    getCustomerRating,
    getFavoriteTruck,
    handleFavoriteTruck,
  ] = useFetchTruck();

  if (Loading) return <LoadingSpinner />;
  if (!currentTruck)
    return <Alert variant='danger'>Failed to load truck.</Alert>;
  return (
    <Container className='d-flex align-items-center flex-column'>
      <Menu />
      <Row className='d-flex justify-content-center'>
        <Col md={4}>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        </Col>
      </Row>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col className='d-flex justify-content-center m-2 h1'>
          {currentTruck.name}
        </Col>
      </Row>
      <Row className='w-75 m-2'>
        <Col>
          <Image
            style={{
              width: '100%',
            }}
            src={currentTruck.imageOfTruck}
          />
        </Col>
      </Row>
      <Row className='w-75 m-2'>
        <Col>
          <ListGroup>
            <ListGroup.Item className='d-flex justify-content-center'>
              {' '}
              {isDiner && (
                <Button onClick={handleFavoriteTruck}>
                  {getFavoriteTruck() ? (
                    <span>
                      <StarFill /> Unfavorite
                    </span>
                  ) : (
                    <span>
                      <Star /> Favorite
                    </span>
                  )}
                </Button>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-center'>{`Cuisine Type: ${currentTruck.cuisineType}`}</ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-center'>{`Departure Time: ${currentTruck.departureTime}`}</ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-center align-items-center'>
              Average Customer Rating:{' '}
              <Rating
                ratingValue={0}
                initialValue={currentTruck.customerRatingsAvg}
                allowHalfIcon
                transition
                readonly
                size={20}
                fillColorArray={[
                  '#f17a45',
                  '#f19745',
                  '#f1a545',
                  '#f1b345',
                  '#f1d045',
                ]}
              />
            </ListGroup.Item>
            {isDiner && (
              <ListGroup.Item className='d-flex justify-content-center align-items-center'>
                Your Rating:{' '}
                <Rating
                  ratingValue={rating}
                  initialValue={getCustomerRating()}
                  onClick={handleRating}
                  allowHalfIcon
                  transition
                  size={20}
                  fillColorArray={[
                    '#f17a45',
                    '#f19745',
                    '#f1a545',
                    '#f1b345',
                    '#f1d045',
                  ]}
                />
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row xs={1} md={2} className='w-75 m-2 d-flex justify-content-center'>
        {currentTruck.menu.map(menuItem => (
          <Col key={menuItem.menuId}>
            <MenuItemCard menuItem={menuItem} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TruckInfo;
