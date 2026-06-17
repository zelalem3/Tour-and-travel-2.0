import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';


import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const locations = {
  "Lalibela Adventure": { pos: [12.0319, 39.0412], label: "Lalibela (Rock Churches)" },
  "Simien Mountains Trek": { pos: [13.2967, 38.3703], label: "Simien Mountains" },
  "Danakil Depression Tour": { pos: [14.2417, 40.2983], label: "Danakil (Erta Ale)" },
  "Omo Valley Cultural": { pos: [5.7833, 36.5667], label: "Omo Valley" },
  "Addis": { pos: [9.03, 38.74], label: "Addis Ababa (Start)" }
};

const TravelMap = ({ selectedTour }) => {
  const destination = locations[selectedTour] || locations["Lalibela Adventure"];
  const addis = locations["Addis"];

  
  const routeLine = [addis.pos, destination.pos];

  return (
    <div className="map-wrapper rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[400px] w-full mt-10">
      <MapContainer center={[9.145, 40.4896]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
     
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        <Marker position={addis.pos}>
          <Popup>The Journey Starts Here: Addis Ababa</Popup>
        </Marker>

        <Marker position={destination.pos}>
          <Popup>Your Destination: {destination.label}</Popup>
        </Marker>

        <Polyline positions={routeLine} color="#fbbf24" weight={3} dashArray="10, 10" />
      </MapContainer>
    </div>
  );
};

export default TravelMap;