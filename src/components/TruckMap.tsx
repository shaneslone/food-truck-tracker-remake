import { useRef, useCallback, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { parseLocation } from '../utils/parseLocation';

const libraries: 'places'[] = ['places'];

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '94vh',
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const TruckMap = () => {
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

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      onLoad={onMapLoad}
    ></GoogleMap>
  );
};

export default TruckMap;
