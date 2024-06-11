// src/components/ev_registration/EVRegionChart.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

interface RegionData {
  lat: number;
  lng: number;
  name: string;
  registrationCount: number;
}

interface EVRegionChartProps {
  data: RegionData[];
}

const EVRegionChart: React.FC<EVRegionChartProps> = ({ data }) => (
  <MapContainer center={[37.5665, 126.9780]} zoom={10} style={{ height: '80vh', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup>
      {data.map((region, index) => (
        <Marker key={index} position={[region.lat, region.lng]}>
          <Popup>
            {region.name}: {region.registrationCount}
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  </MapContainer>
);

export default EVRegionChart;
