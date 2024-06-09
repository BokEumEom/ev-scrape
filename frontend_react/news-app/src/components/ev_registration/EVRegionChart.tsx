// src/components/ev_registration/EVRegionChart.tsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface EVRegionChartProps {
  data: { region: string, total: number, coordinates: [number, number] }[];
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const EVRegionChart: React.FC<EVRegionChartProps> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [127.02758, 37.49794],
      zoom: 10,
    });

    map.on('load', () => {
      // Convert data to GeoJSON
      const geojsonData = {
        type: 'FeatureCollection',
        features: data.map(item => ({
          type: 'Feature',
          properties: {
            total: item.total,
          },
          geometry: {
            type: 'Point',
            coordinates: item.coordinates,
          },
        })),
      };

      // Calculate min and max total values
      const totals = data.map(item => item.total);
      const maxTotal = Math.max(...totals);
      const minTotal = Math.min(...totals);

      // Add a new source from GeoJSON data
      map.addSource('evRegistrations', {
        type: 'geojson',
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add cluster layers
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'evRegistrations',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      // Add cluster count labels
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'evRegistrations',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      // Add unclustered points
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'evRegistrations',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'total'],
            minTotal, 10, // Minimum radius for minimum value
            maxTotal, 30 // Maximum radius for maximum value
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // Add unclustered point count labels
      map.addLayer({
        id: 'unclustered-count',
        type: 'symbol',
        source: 'evRegistrations',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'text-field': '{total}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      // Add a click event to zoom into clusters
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('evRegistrations').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          }
        );
      });

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => map.remove();
  }, [data]);

  return (
    <>
      <div>
        <h2>EV Registration Chart</h2>
      </div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
    </>
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
