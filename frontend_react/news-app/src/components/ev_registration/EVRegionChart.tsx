// src/components/ev_registration/EVRegionChart.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface EVRegionChartProps {
  data: { region: string, total: number, coordinates: number[] }[];
}

const EVRegionChart: React.FC<EVRegionChartProps> = ({ data }) => {
  const getColor = (d: number) => {
    return d > 1000 ? '#00ADC6' :
           d > 500  ? '#00ADC6' :
           d > 200  ? '#009EA0' :
           d > 100  ? '#007770' :
           d > 50   ? '#006854' :
           d > 20   ? '#006854' :
           d > 10   ? '#006854' :
                      '#006854';
  };

  const getRadius = (d: number) => {
    return d > 1000 ? 40 :
           d > 500  ? 30 :
           d > 200  ? 20 :
           d > 100  ? 15 :
           d > 50   ? 10 :
           d > 20   ? 8 :
           d > 10   ? 6 :
                      4;
  };

  return (
    <div>
      <h2>EV Registration Chart</h2>
      <MapContainer center={[36.5, 127.5]} zoom={7} style={{ width: '100%', height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => (
          <CircleMarker
            key={index}
            center={[item.coordinates[1], item.coordinates[0]]}
            color={getColor(item.total)}
            radius={getRadius(item.total)}
            fillOpacity={0.7}
          >
            <Popup>
              <div>
                <strong>{item.region}</strong><br />
                {item.total}기
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

EVRegionChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      region: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default EVRegionChart;
