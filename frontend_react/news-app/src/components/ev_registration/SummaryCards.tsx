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
    { label: '총 등록 수', icon: <IoCarOutline />, value: totalRegistrations, color: 'purple' },
    { label: ' 지역별 가장 많은 등록 수', icon: <IoLocationSharp />, value: regionWithMostRegistrations.region, color: 'orange' },
    { label: ' 월간 성장률', icon: <IoStatsChartOutline />, value: monthlyGrowth, color: 'pink' },
    { label: '데이터 수집 지역', icon: <IoLocateSharp />, value: regionsWithData, color: 'blue' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-4">
      {cardInfo.map((card, index) => (
        <div key={index} className={`bg-white p-2 rounded-lg shadow-lg flex flex-col items-center`}>
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
