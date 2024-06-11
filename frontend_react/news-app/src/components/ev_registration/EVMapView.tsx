import React from 'react';
import { EVRegistration } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface EVMapViewProps {
  data: EVRegistration[];
}

const EVMapView: React.FC<EVMapViewProps> = ({ data }) => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={10} className="h-96 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <span>{item.region}: {item.count} registrations</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EVMapView;
