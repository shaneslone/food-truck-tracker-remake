import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MenuItem } from '../types';
import { Camera } from 'react-bootstrap-icons';
import AddPhoto from './AddPhoto';
import EditMenuItemModal from './EditMenuItemModal';

interface IProps {
  menuItem: MenuItem;
}

const AddPhotoButton: React.FC<IProps> = ({ menuItem }) => {
  const [addPhoto, setAddPhoto] = useState<boolean>(false);
  const toggleAddPhoto = () => {
    setAddPhoto(prev => !prev);
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={toggleAddPhoto}
        size='sm'
        className='m-1'
      >
        <Camera />
      </Button>
      <EditMenuItemModal show={addPhoto} toggle={toggleAddPhoto}>
        <AddPhoto menuItem={menuItem} />
      </EditMenuItemModal>
    </>
  );
};

export default AddPhotoButton;
