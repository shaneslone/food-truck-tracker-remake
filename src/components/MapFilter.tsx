import { useState } from 'react';
import {
  Col,
  Container,
  DropdownButton,
  InputGroup,
  Row,
} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import CuisineFilter from './CuisineFilter';
import LocationSearch from './LocationSearch';

interface IProps {
  panTo: ({ lat, lng }: google.maps.LatLngLiteral) => void;
}

const MapFilter: React.FC<IProps> = ({ panTo }) => {
  const [filterType, setFilterType] = useState<string>('Filter Type');

  const onSelect = (type: string) => {
    return () => {
      setFilterType(type);
    };
  };

  const selectFilter = () => {
    if (filterType === 'Location') return <LocationSearch panTo={panTo} />;
    if (filterType === 'Cuisine Type') return <CuisineFilter />;
    else return null;
  };

  return (
    <Container fluid className='text-center'>
      <Row>
        <Col className='h2 m-2'>
          Filter the map to find the trucks you are looking for!
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col md={8} className='m-2'>
          <InputGroup>
            <DropdownButton title={filterType}>
              <DropdownItem
                id='Cuisine Type'
                onClick={onSelect('Cuisine Type')}
              >
                Cuisine Type
              </DropdownItem>
              <DropdownItem id='Location' onClick={onSelect('Location')}>
                Location
              </DropdownItem>
            </DropdownButton>
            {selectFilter()}
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MapFilter;
