// src/components/ev_registration/EVYearlyTrendChart.tsx
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface EVYearlyTrendChartProps {
  data: { year: number, total: number }[];
}

const EVYearlyTrendChart: React.FC<EVYearlyTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis dataKey="year" fontSize="8px" />
        <YAxis fontSize="8px" />
        <Tooltip formatter={(value) => `${value.toLocaleString()} 대`} />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EVYearlyTrendChart;