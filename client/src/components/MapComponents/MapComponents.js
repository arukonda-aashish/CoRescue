import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2); // Default to center of the world
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Example markers for demonstration purposes
    const exampleMarkers = [
      { name: 'Marker 1', latitude: 28.7041, longitude: 77.1025 },
      { name: 'Marker 2', latitude: 19.0760, longitude: 72.8777 }
      // Add more markers as needed
    ];

    // Display example markers on the map
    exampleMarkers.forEach(marker => {
      L.marker([marker.latitude, marker.longitude]).addTo(map)
        .bindPopup(`<b>${marker.name}</b><br/>Location: ${marker.latitude}, ${marker.longitude}`);
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={sosButtonStyle}>SOS</div>
      <div id="map" style={{ width: '100%', height: 'calc(100% - 50px)', position: 'absolute', top: '200px', left: '0' }}></div>
    </div>
  );
};

const sosButtonStyle = {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: 'red',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  zIndex: '1000' // Ensure the SOS button is above the map
};  

export default MapComponent;
