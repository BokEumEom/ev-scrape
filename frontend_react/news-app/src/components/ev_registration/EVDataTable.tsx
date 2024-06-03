// src/components/ev_registration/EVDataTable.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { EVRegistration } from '@/types';

interface EVDataTableProps {
  data: EVRegistration[];
}

const EVDataTable: React.FC<EVDataTableProps> = ({ data }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Region</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border">{item.region}</td>
              <td className="px-4 py-2 border">{item.year}</td>
              <td className="px-4 py-2 border">{item.month}</td>
              <td className="px-4 py-2 border">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EVDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Adjusted to number
      region: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EVDataTable;
