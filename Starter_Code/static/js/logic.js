var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
// Creating a map
var map = L.map('map').setView([0, 0], 2);

// tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//Get earthquake data 


fetch(url)
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
      var coordinates = feature.geometry.coordinates;
      var magnitude = feature.properties.mag;
      var location = feature.properties.place;

      // Creating circle marker
      var marker = L.circleMarker([coordinates[1], coordinates[0]]).addTo(map);

      // Adding e popup 
      marker.bindPopup(`Location: ${location}<br>Magnitude: ${magnitude}`);
    });
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
  });