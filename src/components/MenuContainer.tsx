import { ReactNode, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-list'
          viewBox='0 0 16 16'
        >
          <path
            fill-rule='evenodd'
            d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
          />
        </svg>
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='end'>
        {children}
      </Offcanvas>
    </>
  );
};

export default MenuContainer;
