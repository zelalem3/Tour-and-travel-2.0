import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function ToursMap({ tours }) {

  const center = [9.145, 40.4896];


  const getCoords = (title) => {
    if (title.includes("Lalibela")) return [12.0319, 39.0412];
    if (title.includes("Simien")) return [13.2967, 38.3703];
    if (title.includes("Danakil")) return [14.2417, 40.2983];
    if (title.includes("Omo")) return [5.7833, 36.5667];
    if (title.includes("Bale")) return [6.7, 39.7];
    return [9.03, 38.74]; // Default to Addis
  };

  return (
    <div style={{ 
      height: '500px', 
      width: '100%', 
      borderRadius: '40px', 
      overflow: 'hidden', 
      border: '1px solid rgba(251, 191, 36, 0.2)',
      marginTop: '100px',
      boxShadow: '0 0 50px rgba(0,0,0,0.5)'
    }}>
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap'
        />
        {tours.map((tour) => (
          <Marker key={tour._id} position={getCoords(tour.title)}>
            <Popup>
              <div style={{ color: '#020617', textAlign: 'center' }}>
                <strong style={{ display: 'block' }}>{tour.title}</strong>
                <span style={{ color: '#ea580c', fontWeight: 'bold' }}>${tour.price}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}