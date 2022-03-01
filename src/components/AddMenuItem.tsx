import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import useAddMenuItem from '../hooks/useAddMenuItemForm';
import { MenuItem } from '../types';

interface IProps {
  itemToEdit?: MenuItem;
}

const AddMenuItem: React.FC<IProps> = ({ itemToEdit }) => {
  const [menuItem, errors, disabled, ajaxError, onChange, onSubmit] =
    useAddMenuItem(itemToEdit);

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col>{ajaxError && <Alert variant='danger'>{ajaxError}</Alert>}</Col>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className='d-flex justify-content-center m-4'>
          <Col>
            <Form.Group>
              <FloatingLabel label='Item Name'>
                <Form.Control
                  type='text'
                  placeholder='Enter Item Name'
                  name='itemName'
                  value={menuItem.itemName}
                  onChange={onChange}
                  isInvalid={!!errors.itemName}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.itemName}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center m-4'>
          <Col>
            <Form.Group>
              <FloatingLabel label='Item Description'>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Enter Item Description'
                  name='itemDescription'
                  value={menuItem.itemDescription}
                  onChange={onChange}
                  isInvalid={!!errors.itemDescription}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.itemDescription}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center m-4'>
          <Col>
            <Form.Group>
              <FloatingLabel label='Item Price'>
                <Form.Control
                  type='number'
                  placeholder='Enter Item Price'
                  name='itemPrice'
                  value={menuItem.itemPrice}
                  onChange={onChange}
                  isInvalid={!!errors.itemPrice}
                />
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.itemPrice}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md='auto'>
            <Button variant='primary' type='submit' disabled={disabled}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddMenuItem;
