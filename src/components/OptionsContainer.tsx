import { useState, ReactNode } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';

interface IProps {
  children?: ReactNode;
}

const OptionsContainer: React.FC<IProps> = ({ children }) => {
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
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <Gear /> Options
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='bottom'>
        {children}
      </Offcanvas>
    </>
  );
};

export default OptionsContainer;
