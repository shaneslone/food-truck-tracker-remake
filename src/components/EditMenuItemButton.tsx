import { MenuItem } from '../types';
import { Button } from 'react-bootstrap';
import EditMenuItemModal from './EditMenuItemModal';
import AddMenuItem from './AddMenuItem';
import { useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';

interface IProps {
  itemToEdit: MenuItem;
}

const EditMenuItemButton: React.FC<IProps> = ({ itemToEdit }) => {
  const [editMenuItem, setEditMenuItem] = useState<boolean>(false);
  const toggleEditMenuItem = () => {
    setEditMenuItem(prev => !prev);
  };
  return (
    <>
      <Button
        variant='primary'
        onClick={toggleEditMenuItem}
        className='m-1'
        size='sm'
      >
        <Pencil />
      </Button>
      <EditMenuItemModal show={editMenuItem} toggle={toggleEditMenuItem}>
        <AddMenuItem itemToEdit={itemToEdit} />
      </EditMenuItemModal>
    </>
  );
};

export default EditMenuItemButton;
