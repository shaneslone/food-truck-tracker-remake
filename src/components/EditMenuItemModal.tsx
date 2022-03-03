import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface IProps {
  show: boolean;
  toggle: () => void;
  children?: ReactNode;
}

const EditMenuItemModal: React.FC<IProps> = ({ children, show, toggle }) => {
  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton />
      {children}
    </Modal>
  );
};

export default EditMenuItemModal;
