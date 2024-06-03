// src/components/ev_registration/EVYearlyTrendChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EVYearlyTrendChartProps {
  data: { year: number, total: number }[];
}

const EVYearlyTrendChart: React.FC<EVYearlyTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toLocaleString()} 대`} />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EVYearlyTrendChart;
