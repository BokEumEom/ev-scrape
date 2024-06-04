// src/components/ev_registration.tsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { EVRegistration } from '@/types';

const geoUrl = "https://raw.githubusercontent.com/BokEumEom/ev-scrape/main/frontend_react/news-app/public/korea-regions.json";

interface EVRegistrationMapProps {
  data: EVRegistration[];
}

const EVRegistrationMap: React.FC<EVRegistrationMapProps> = ({ data }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  const getRegionData = (region: string) => {
    const regionData = data.find(d => d.region === region);
    return regionData ? regionData.count : 0;
  };

  return (
    <div className="relative">
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const region = geo.properties.name;
              const count = getRegionData(region);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${region}: ${count}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div className="absolute bg-white p-2 border rounded shadow-lg">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default EVRegistrationMap;
