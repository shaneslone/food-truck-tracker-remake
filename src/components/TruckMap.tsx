import { useRef, useCallback, useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Alert, Button } from 'react-bootstrap';
import axiosWithAuth from '../utils/axoisWithAuth';
import { parseLocation } from '../utils/locationHelpers';
import { RootState, Truck, User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import TruckMapCard from './TruckMapCard';
import { fetchTrucks } from '../store/actions/trucks';

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const TruckMap = () => {
  const dispatch = useDispatch();
  const error = useSelector<RootState, string>(
    state => state.trucks.errorMessage
  );
  const trucks = useSelector<RootState, Truck[]>(
    state => state.trucks.allTrucks
  );
  const [selected, setSelected] = useState<Truck | null>(null);
  const user = useSelector<RootState, User>(state => state.user.user);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    parseLocation('43.6034958,-110.7363361')
  );

  useEffect(() => {
    dispatch(fetchTrucks());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setCenter(parseLocation(user.currentLocation));
    }
  }, [user.currentLocation]);

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

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      {error && (
        <Alert
          variant='danger'
          style={{
            position: 'absolute',
            top: '15px',
            left: '50%',
            transform: 'translate(-50%)',
          }}
        >
          {error}
        </Alert>
      )}
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
          <TruckMapCard truck={selected} />
        </InfoWindow>
      )}
      <Button
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        Show Options
      </Button>
    </GoogleMap>
  );
};

export default TruckMap;
