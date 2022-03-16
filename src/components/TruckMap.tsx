import { useRef, useCallback, useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Alert } from 'react-bootstrap';
import { parseLocation } from '../utils/locationHelpers';
import { RootState, Truck, User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import TruckCard from './TruckCard';
import { fetchTrucks, locateTruck } from '../store/actions/trucks';
import OptionsContainer from './OptionsContainer';
import Menu from './Menu';
import MapFilter from './MapFilter';

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
  const truckToLocate = useSelector<RootState, Truck | null>(
    state => state.trucks.truckToLocate
  );
  const [selected, setSelected] = useState<Truck | null>(null);
  const user = useSelector<RootState, User>(state => state.user.user);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    parseLocation('43.6034958,-110.7363361')
  );

  useEffect(() => {
    dispatch(fetchTrucks());
    if (truckToLocate) {
      setCenter(parseLocation(truckToLocate.currentLocation));
      setSelected(truckToLocate);
    } else {
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
    }
    return () => {
      dispatch(locateTruck(null));
    };
  }, [user.currentLocation, dispatch, truckToLocate]);

  const mapRef = useRef<google.maps.Map | null>(null);
  const onMapLoad = useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);

  // pans the map to the target location
  const panTo = useCallback(({ lat, lng }: google.maps.LatLngLiteral) => {
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
      <Menu />
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
          <TruckCard truck={selected} />
        </InfoWindow>
      )}
      <OptionsContainer>
        <MapFilter panTo={panTo} />
      </OptionsContainer>
    </GoogleMap>
  );
};

export default TruckMap;
