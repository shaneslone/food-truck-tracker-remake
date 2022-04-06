import {
  Form,
  FloatingLabel,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import useAddMenuItemPhoto from '../hooks/useAddMenuItemPhoto';
import { MenuItem } from '../types';

interface IProps {
  menuItem: MenuItem;
}

const AddPhoto: React.FC<IProps> = ({ menuItem }) => {
  const [url, onChange, onSubmit] = useAddMenuItemPhoto(menuItem);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FloatingLabel label='Enter photo url.'>
          <Form.Control
            autoComplete='off'
            type='text'
            name='url'
            value={url}
            onChange={onChange}
          />
        </FloatingLabel>
        <Row className='d-flex justify-content-center'>
          <Col xs='auto' className='m-1'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddPhoto;
