const coords = {};
navigator.geolocation.getCurrentPosition((position) => {
  (coords.latitude = position.coords.latitude),
    (coords.longitude = position.coords.longitude);
});

export default coords;
