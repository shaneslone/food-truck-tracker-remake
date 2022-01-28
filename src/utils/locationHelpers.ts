export const parseLocation = (location: string): google.maps.LatLngLiteral => {
  const [lat, lng] = location.split(',');
  return {
    lat: parseInt(lat),
    lng: parseInt(lng),
  };
};

export const stringifyLoction = (location: google.maps.LatLngLiteral) => {
  return `${location.lat},${location.lng}`;
};
