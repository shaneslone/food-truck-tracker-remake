import { ReactNode, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

interface IProps {
  children?: ReactNode;
}

const MenuContainer: React.FC<IProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow(prevShow => !prevShow);
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={toggleShow}
        style={{
          position: 'fixed',
          right: '5%',
          top: '5%',
          zIndex: '10',
        }}
      >
        <List />
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='end'>
        {children}
      </Offcanvas>
    </>
  );
};

export default MenuContainer;
