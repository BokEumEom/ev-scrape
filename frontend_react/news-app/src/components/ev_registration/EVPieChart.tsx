import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface EVPieChartProps {
  data: { region: string, total: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EVPieChart: React.FC<EVPieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="region"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toLocaleString()} 대`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EVPieChart;
