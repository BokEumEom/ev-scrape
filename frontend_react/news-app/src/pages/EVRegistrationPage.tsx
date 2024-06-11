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


  const registrationRegion = [
    { region: '서울', total: 1200, coordinates: [126.9784, 37.5665] },
    { region: '부산', total: 800, coordinates: [129.0756, 35.1796] },
    { region: '대구', total: 300, coordinates: [128.6014, 35.8714] },
    { region: '인천', total: 500, coordinates: [126.7052, 37.4563] },
    { region: '광주', total: 150, coordinates: [126.8514, 35.1595] },
    { region: '대전', total: 200, coordinates: [127.3845, 36.3504] },
    { region: '울산', total: 100, coordinates: [129.3114, 35.5384] },
    { region: '세종', total: 50, coordinates: [127.2906, 36.4804] },
    { region: '경기', total: 1100, coordinates: [127.5183, 37.4138] },
    { region: '강원', total: 300, coordinates: [128.1555, 37.8328] },
    { region: '충북', total: 150, coordinates: [127.7302, 36.6372] },
    { region: '충남', total: 200, coordinates: [126.8454, 36.5184] },
    { region: '전북', total: 100, coordinates: [127.1480, 35.8242] },
    { region: '전남', total: 90, coordinates: [126.9860, 34.8679] },
    { region: '경북', total: 250, coordinates: [128.7294, 36.5760] },
    { region: '경남', total: 300, coordinates: [128.2132, 35.4606] },
    { region: '제주', total: 200, coordinates: [126.4983, 33.4996] },
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
          {activeTab === 'region' && <EVRegionChart data={registrationRegion} />}
        </div>
      )}
    </div>
  );
};

export default EVRegistrationPage;
