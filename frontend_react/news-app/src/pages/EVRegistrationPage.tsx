// src/pages/EVRegistrationPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';
import DateRegionPicker from '@/components/ev_registration/DateRegionPicker';
import SummaryCards from '@/components/ev_registration/SummaryCards';
import TabNavigation from '@/components/ev_registration/TabNavigation';
import EVBarChart from '@/components/ev_registration/EVBarChart';
import EVDataTable from '@/components/ev_registration/EVDataTable';
import EVYearlyTrendChart from '@/components/ev_registration/EVYearlyTrendChart';
import useEVRegistrations from '@/hooks/useEVRegistrations';
import useFilteredData from '@/hooks/useFilteredData';
import { fetchEVRegistrations } from '@/services/evRegistrationService';
import { EVRegistration } from '@/types';

const ALL_REGIONS = 'All Regions';

const EVRegistrationPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState<string | null>(ALL_REGIONS);
  const [activeTab, setActiveTab] = useState<'chart' | 'table' | 'trend'>('chart');
  const [regionData, setRegionData] = useState<EVRegistration[]>([]);

  const { data: allData, error: allDataError, isLoading: isAllDataLoading, refetch: refetchAllData } = useEVRegistrations();

  const fetchRegionData = useCallback(async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    try {
      const data = await fetchEVRegistrations(year, month, selectedRegion !== ALL_REGIONS ? selectedRegion : undefined);
      setRegionData(data);
    } catch (error) {
      console.error('Failed to fetch region data:', error);
    }
  }, [selectedDate, selectedRegion]);

  useEffect(() => {
    fetchRegionData();
  }, [fetchRegionData]);

  const { regions, filteredData, dataForChart, yearlyDataForChart } = useFilteredData(allData, selectedRegion, selectedDate);

  const handleFetchDataClick = () => {
    fetchRegionData();
  };

  useEffect(() => {
    console.log("All Data:", allData);
    console.log("Filtered Data:", filteredData);
    console.log("Data for Chart:", dataForChart);
    console.log("Yearly Data for Chart:", yearlyDataForChart);
  }, [allData, filteredData, dataForChart, yearlyDataForChart]);

  return (
    <div className="flex flex-col pt-16 pb-20 p-4 max-w-4xl mx-auto sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">EV Registration Statistics</h1>
      </header>
      <DateRegionPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        handleFetchData={handleFetchDataClick}
        regions={[ALL_REGIONS, ...regions.filter((region): region is string => region != null)]}
      />
      {isAllDataLoading && (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={isAllDataLoading} />
        </div>
      )}
      {allDataError && (
        <div className="text-red-500 text-center">
          <p>Error: {(allDataError as Error).message}</p>
          <button
            onClick={() => refetchAllData()}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      )}
      {!isAllDataLoading && !allDataError && regionData && regionData.length === 0 && (
        <div className="text-center text-gray-500">No data available for the selected date and region.</div>
      )}
      {!isAllDataLoading && !allDataError && regionData && regionData.length > 0 && (
        <div className="mt-6">
          <SummaryCards data={regionData} />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'chart' && <EVBarChart data={dataForChart} />}
          {activeTab === 'table' && <EVDataTable data={regionData} />}
          {activeTab === 'trend' && <EVYearlyTrendChart data={yearlyDataForChart} />}
        </div>
      )}
    </div>
  );
};

export default EVRegistrationPage;
