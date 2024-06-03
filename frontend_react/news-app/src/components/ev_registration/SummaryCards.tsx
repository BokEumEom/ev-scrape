// src/components/ev_registration/SummaryCards.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { IoCarOutline, IoLocationSharp, IoStatsChartOutline, IoLocateSharp } from 'react-icons/io5';
import { EVRegistration } from '@/types';

interface SummaryCardsProps {
  data: EVRegistration[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const totalRegistrations = data.reduce((acc, item) => acc + item.count, 0);

  const regionWithMostRegistrations = data.reduce((max, item) => item.count > max.count ? item : max, data[0]);
  const monthlyGrowth = 'N/A'; // Placeholder for actual calculation
  const regionsWithData = data.length;

  const cardInfo = [
    { label: 'Total Registrations', icon: <IoCarOutline />, value: totalRegistrations, color: 'purple' },
    { label: 'Most Registrations by Region', icon: <IoLocationSharp />, value: regionWithMostRegistrations.region, color: 'orange' },
    { label: 'Monthly Growth', icon: <IoStatsChartOutline />, value: monthlyGrowth, color: 'pink' },
    { label: 'Regions with Data', icon: <IoLocateSharp />, value: regionsWithData, color: 'blue' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
      {cardInfo.map((card, index) => (
        <div key={index} className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center`}>
          <div className={`text-${card.color}-600 bg-${card.color}-100 p-3 rounded-full mb-2`}>
            {React.cloneElement(card.icon, { className: 'text-3xl' })}
          </div>
          <div className="text-center">
            <h2 className="text-sm font-bold mb-1">{card.label}</h2>
            <p className="text-sm font-semibold">{typeof card.value === 'number' ? card.value.toLocaleString() : card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

SummaryCards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SummaryCards;
