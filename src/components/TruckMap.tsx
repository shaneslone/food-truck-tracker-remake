import { useRef, useCallback, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Spinner, Container } from 'react-bootstrap';
import axiosWithAuth from '../utils/axoisWithAuth';
import { parseLocation } from '../utils/parseLocation';
import { Truck } from '../types';

const libraries: 'places'[] = ['places'];

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const TruckMap = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [error, setError] = useState<string>('');
  const [selected, setSelected] = useState<Truck | null>(null);

  const fetchTrucks = async () => {
    try {
      const res = await axiosWithAuth().get('/trucks/trucks');
      setTrucks(res.data);
    } catch (e) {
      setError('Failed to load trucks!');
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    parseLocation('43.6034958,-110.7363361')
  );

  const mapRef = useRef<google.maps.Map | null>(null);
  const onMapLoad = useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);

  // pans the map to the target location
  const panTo = useCallback(({ lat, lng }) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
    }
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY!,
    libraries: libraries,
  });

  if (!isLoaded)
    return (
      <Container
        style={{ height: '100vh' }}
        fluid
        className='d-flex justify-content-center align-items-center'
      >
        <Spinner animation='border' variant='primary' />
      </Container>
    );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      {trucks &&
        trucks.map(truck => (
          <Marker
            key={truck.truckId}
            position={parseLocation(truck.currentLocation)}
            onClick={() => {
              setCenter(parseLocation(truck.currentLocation));
              setSelected(truck);
            }}
          />
        ))}
      {selected && (
        <InfoWindow
          position={parseLocation(selected.currentLocation)}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <h2>{selected.name}</h2>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default TruckMap;
