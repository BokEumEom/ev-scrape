// src/pages/EVRegistrationPage.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import DateRegionPicker from '@/components/ev_registration/DateRegionPicker';
import SummaryCards from '@/components/ev_registration/SummaryCards';
import TabNavigation from '@/components/ev_registration/TabNavigation';
import EVBarChart from '@/components/ev_registration/EVBarChart';
import EVDataTable from '@/components/ev_registration/EVDataTable';
import EVYearlyTrendChart from '@/components/ev_registration/EVYearlyTrendChart';
import EVRegionChart from '@/components/ev_registration/EVRegionChart';
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

  const sampleData: { region: string, total: number, coordinates: [number, number] }[] = [
    { region: 'Seoul', total: 1200, coordinates: [126.9780, 37.5665] },
    { region: 'Busan', total: 800, coordinates: [129.0756, 35.1796] },
    { region: 'Incheon', total: 500, coordinates: [126.7052, 37.4563] },
    { region: 'Daegu', total: 300, coordinates: [128.6014, 35.8714] },
    { region: 'Daejeon', total: 200, coordinates: [127.3845, 36.3504] },
    { region: 'Gwangju', total: 150, coordinates: [126.8514, 35.1595] },
    // Add more sample data as needed
  ];
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
        <div className="text-gray-500 text-sm mt-2">선택한 날짜와 지역에 대한 데이터가 없습니다</div>
      )}
      {!isLoading && !error && regionData.length > 0 && (
        <div className="mt-6">
          <SummaryCards data={regionData} />
          <TabNavigation activeTab={activeTab} setActiveTab={setTab} />
          {activeTab === 'chart' && <EVBarChart data={dataForChart} />}
          {activeTab === 'table' && <EVDataTable data={regionData} />}
          {activeTab === 'trend' && <EVYearlyTrendChart data={yearlyDataForChart} />}
          {activeTab === 'region' && <EVRegionChart data={sampleData} />}
        </div>
      )}
    </div>
  );
};

export default EVRegistrationPage;
