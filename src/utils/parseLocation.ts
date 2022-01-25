export const parseLocation = (location: string): google.maps.LatLngLiteral => {
  const [lat, lng] = location.split(',');
  return {
    lat: parseInt(lat),
    lng: parseInt(lng),
  };
};
