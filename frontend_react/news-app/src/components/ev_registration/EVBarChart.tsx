// src/components/ev_registration/EVBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

interface EVBarChartProps {
  data: { region: string, total: number }[];
}

const EVBarChart: React.FC<EVBarChartProps> = ({ data }) => {
  const BAR_COLOR = "#8884d8";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="region" fontSize="10px" />
        <YAxis fontSize="10px" padding={{ left: 2, right: 2 }} />
        <Tooltip formatter={(value) => `${value.toLocaleString()} 대`} />
        <Bar dataKey="total" fill={BAR_COLOR} />
      </BarChart>
    </ResponsiveContainer>
  );
};

EVBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      region: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EVBarChart;
