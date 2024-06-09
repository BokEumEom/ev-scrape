// src/components/ev_registration/EVBarChart.tsx
import PropTypes from 'prop-types';
import React from 'react';
import { Bar, BarChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface EVBarChartProps {
  data: { region: string, total: number }[];
}

const EVBarChart: React.FC<EVBarChartProps> = ({ data }) => {
  const BAR_COLOR = "#8884d8";
  const formatXAxis = (tickItem: number) => {
    if (tickItem >= 1000) {
      return `${tickItem / 1000}k`;
    }
    return tickItem;
  };
  return (
      <>
      <div className="py-4 bg-gray-50 rounded-lg">
        <h3 className="text-center text-bold text-sm">전국누적 등록 갯수</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical"> {/* 레이아웃을 수평으로 변경 */}
          <XAxis 
            type="number" // X축 타입을 숫자로 변경
            tick={{ fill: '#000', fontSize: 10, fontFamily: 'pretendard' }} // X축 tick 스타일
            axisLine={{ stroke: '#000', strokeWidth: 1 }} // X축 보더 스타일
            tickLine={{ stroke: '#000', strokeWidth: 1 }} // X축 tick 라인 스타일
            tickFormatter={formatXAxis} // X축 tick 포맷터 적용
          >
            <Label value="단위-대" offset={0} position="insideBottom" fontSize="12px" />
          </XAxis>
          <YAxis 
            dataKey="region" // Y축 데이터 키를 지역으로 변경
            type="category" // Y축 타입을 카테고리로 변경
                      tick={{ fill: '#000', fontSize: 10, fontFamily: 'pretendard' }} // X축 tick 스타일
            axisLine={{ stroke: '#000', strokeWidth: 1 }} // X축 보더 스타일
            axisLine={{ stroke: '#000', strokeWidth: 1 }} // Y축 보더 스타일
            tickLine={{ strokeWidth: 1 }} // Y축 tick 라인 스타일
          >
            <Label value="전국" angle={-90} position="insideLeft" fontSize="12px"/>
          </YAxis>
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()} 대`} 
            contentStyle={{
              borderRadius: '10px',
              backgroundColor: '#fff',
              border: '1px solid #fff',
              padding: '7px',
            }}
          />
          <Bar dataKey="total" fill={BAR_COLOR} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </>
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
