// src/pages/EVRegistrationPage.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import DateRegionPicker from '@/components/ev_registration/DateRegionPicker';
import SummaryCards from '@/components/ev_registration/SummaryCards';
import TabNavigation from '@/components/ev_registration/TabNavigation';
import EVBarChart from '@/components/ev_registration/EVBarChart';
import EVDataTable from '@/components/ev_registration/EVDataTable';
import EVYearlyTrendChart from '@/components/ev_registration/EVYearlyTrendChart';
import useEVRegistrationData from '@/hooks/useEVRegistrationData';

const ALL_REGIONS = 'All Regions';

const EVRegistrationPage: React.FC = () => {
  const {
    state: { selectedDate, selectedRegion, activeTab, regionData, isLoading, error, regions, dataForChart, yearlyDataForChart },
    setDate,
    setRegion,
    setTab,
    fetchData,
    refetchAllData
  } = useEVRegistrationData();

  console.log("Page rendering with region data:", regionData); // Log the region data used for rendering

  return (
    <div className="flex flex-col pt-16 pb-20 p-4 max-w-4xl mx-auto sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">EV Registration Statistics</h1>
      </header>
      <DateRegionPicker
        selectedDate={selectedDate}
        setSelectedDate={setDate}
        selectedRegion={selectedRegion}
        setSelectedRegion={setRegion}
        handleFetchData={fetchData}
        regions={[ALL_REGIONS, ...regions.filter((region): region is string => region != null)]}
      />
      {isLoading && (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center">
          <p>Error: {error.message}</p>
          <button
            onClick={() => refetchAllData()}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      )}
      {!isLoading && !error && regionData.length === 0 && (
        <div className="text-center text-gray-500">No data available for the selected date and region.</div>
      )}
      {!isLoading && !error && regionData.length > 0 && (
        <div className="mt-6">
          <SummaryCards data={regionData} />
          <TabNavigation activeTab={activeTab} setActiveTab={setTab} />
          {activeTab === 'chart' && <EVBarChart data={dataForChart} />}
          {activeTab === 'table' && <EVDataTable data={regionData} />}
          {activeTab === 'trend' && <EVYearlyTrendChart data={yearlyDataForChart} />}
        </div>
      )}
    </div>
  );
};

export default EVRegistrationPage;
