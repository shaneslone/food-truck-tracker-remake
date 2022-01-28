import { Container, Spinner } from 'react-bootstrap';
const LoadingSpinner = () => {
  return (
    <Container
      style={{ height: '100vh' }}
      fluid
      className='d-flex justify-content-center align-items-center'
    >
      <Spinner animation='border' variant='primary' />
    </Container>
  );
};

export default LoadingSpinner;
