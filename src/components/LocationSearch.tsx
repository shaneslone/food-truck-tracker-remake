import { ChangeEvent } from 'react';
import {
  Form,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
} from 'react-bootstrap';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

interface IProps {
  panTo: ({ lat, lng }: google.maps.LatLngLiteral) => void;
}

const LocationSearch: React.FC<IProps> = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  return (
    <OverlayTrigger
      trigger='focus'
      placement='top-start'
      overlay={
        <Popover>
          <PopoverHeader>Location Suggestions</PopoverHeader>
          <PopoverBody>
            <ListGroup>
              {status === 'OK' &&
                data.map(suggestion => (
                  <ListGroupItem
                    style={{ cursor: 'pointer' }}
                    key={suggestion.place_id}
                    onClick={async () => {
                      setValue(suggestion.description);
                      clearSuggestions();
                      try {
                        const results = await getGeocode({
                          address: suggestion.description,
                        });
                        const coords = await getLatLng(results[0]);
                        panTo(coords);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    {suggestion.description}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </PopoverBody>
        </Popover>
      }
    >
      <Form.Control
        autoComplete='off'
        type='text'
        placeholder='Enter a location'
        name='currentLocation'
        value={value}
        disabled={!ready}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
      />
    </OverlayTrigger>
  );
};

export default LocationSearch;
