// src/hooks/useFilteredData.ts
import { useMemo } from 'react';
import { EVRegistration } from '@/types';

const useFilteredData = (data: EVRegistration[], selectedRegion: string | null, selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const regions = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.region)));
  }, [data]);

  const filteredData = useMemo(() => {
    return selectedRegion && selectedRegion !== 'All Regions'
      ? data.filter((item) => item.region === selectedRegion && item.year === year && item.month === month)
      : data.filter((item) => item.year === year && item.month === month);
  }, [data, selectedRegion, year, month]);

  const dataForChart = useMemo(() => {
    return regions.map((region) => {
      const total = filteredData
        .filter((item) => item.region === region)
        .reduce((acc, item) => acc + item.count, 0);
      return { region, total };
    });
  }, [filteredData, regions]);

  const yearlyDataForChart = useMemo(() => {
    const yearlyData = data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = 0;
      }
      acc[curr.year] += curr.count;
      return acc;
    }, {} as Record<number, number>);

    return Object.keys(yearlyData).map((year) => ({
      year: Number(year),
      total: yearlyData[year],
    }));
  }, [data]);

  return {
    regions,
    filteredData,
    dataForChart,
    yearlyDataForChart,
    year,
    month,
  };
};

export default useFilteredData;
