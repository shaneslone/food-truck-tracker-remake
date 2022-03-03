import { Form, FloatingLabel, Button } from 'react-bootstrap';
import useAddMenuItemPhoto from '../hooks/useAddMenuItemPhoto';
import { MenuItem } from '../types';

interface IProps {
  menuItem: MenuItem;
}

const AddPhoto: React.FC<IProps> = ({ menuItem }) => {
  const [url, onChange, onSubmit] = useAddMenuItemPhoto(menuItem);

  return (
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
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddPhoto;
