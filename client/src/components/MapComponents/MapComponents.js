import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './MapComponents.css'; // Import your CSS file for styling

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2); // Default to center of the world
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Static markers with predefined latitude and longitude values
    const staticMarkers = [
      { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
      { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
      { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946 },
      { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
      { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
      { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867 },
      { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714 },
      { name: 'Pune', latitude: 18.5204, longitude: 73.8567 },
      { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873 },
      { name: 'Lucknow', latitude: 26.8467, longitude: 80.9462 }
    ];

    const showPresentLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update map view to present location
            map.setView([latitude, longitude], 15);

            // Display a marker at the present location
            const customIcon = L.divIcon({ className: 'dynamic-marker' });
            L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

            // Display all existing static markers
            displayStaticMarkers(staticMarkers);

            // Add event listener to the button to show nearest markers on click
            document.getElementById('showMarkersButton').addEventListener('click', () => {
              // Clear existing markers
              clearMarkers();

              // Find nearest markers
              findNearestMarkers(latitude, longitude, staticMarkers, 5);
            });
          },
          error => {
            console.error('Error getting present location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };

    const displayStaticMarkers = (markers) => {
      markers.forEach(marker => {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: blue" class="marker"></div>`,
        });

        L.marker([marker.latitude, marker.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${marker.name}</b><br/>Latitude: ${marker.latitude}<br/>Longitude: ${marker.longitude}`)
          .openPopup();
      });
    };

    const findNearestMarkers = (currentLatitude, currentLongitude, markers, limit) => {
      // Sort the static markers by distance from the current location
      markers.sort((a, b) => {
        const distanceA = Math.sqrt(
          Math.pow(a.latitude - currentLatitude, 2) + Math.pow(a.longitude - currentLongitude, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(b.latitude - currentLatitude, 2) + Math.pow(b.longitude - currentLongitude, 2)
        );

        return distanceA - distanceB;
      });

      // Display the nearest markers on the map with different colors
      markers.slice(0, limit).forEach((marker, index) => {
        const markerColor = index < 5 ? 'blue' : 'red';

        L.marker([marker.latitude, marker.longitude], { icon: getColoredMarker(markerColor) })
          .addTo(map)
          .bindPopup(`<b>${marker.name}</b><br/>Latitude: ${marker.latitude}<br/>Longitude: ${marker.longitude}`)
          .openPopup();
      });

      function getColoredMarker(color) {
        return L.divIcon({ className: `dynamic-marker ${color}` });
      }
    };

    const clearMarkers = () => {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };

    // Call the function to show the present location and set up the button event listener
    showPresentLocation();

    // Clean up on component unmount
    
  }, []); // Empty dependency array ensures useEffect runs once after initial render
  return (
    <div>
      <button id="showMarkersButton">SOS</button>
      <div id="map"></div>
    </div>
  );
};

export default MapComponent;
