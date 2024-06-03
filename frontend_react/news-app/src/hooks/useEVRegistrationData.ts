// src/hooks/useEVRegistrationData.ts
import { useReducer, useCallback, useEffect } from 'react';
import useEVRegistrations from '@/hooks/useEVRegistrations';
import useFilteredData from '@/hooks/useFilteredData';
import { fetchEVRegistrations } from '@/services/evRegistrationService';
import { EVRegistration } from '@/types';

const ALL_REGIONS = 'All Regions';

interface State {
  selectedDate: Date;
  selectedRegion: string | null;
  activeTab: 'chart' | 'table' | 'trend';
  regionData: EVRegistration[];
  isLoading: boolean;
  error: Error | null;
}

type Action =
  | { type: 'SET_DATE'; payload: Date }
  | { type: 'SET_REGION'; payload: string | null }
  | { type: 'SET_TAB'; payload: 'chart' | 'table' | 'trend' }
  | { type: 'SET_REGION_DATA'; payload: EVRegistration[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null };

const initialState: State = {
  selectedDate: new Date(),
  selectedRegion: ALL_REGIONS,
  activeTab: 'chart',
  regionData: [],
  isLoading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_REGION_DATA':
      return { ...state, regionData: action.payload, isLoading: false, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const useEVRegistrationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedDate, selectedRegion } = state;

  const { data: allData, error: allDataError, isLoading: isAllDataLoading, refetch: refetchAllData } = useEVRegistrations();

  useEffect(() => {
    if (allData.length === 0) {
      refetchAllData();
    } else {
      console.log("Fetched all data:", allData); // Log the fetched all data
      dispatch({ type: 'SET_REGION_DATA', payload: allData });
    }
  }, [allData, refetchAllData]);

  const fetchRegionData = useCallback(async (date: Date, region: string | null) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    try {
      const data = await fetchEVRegistrations(year, month, region !== ALL_REGIONS ? region ?? undefined : undefined);
      console.log("Fetched region data:", data); // Log the fetched region data
      dispatch({ type: 'SET_REGION_DATA', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  }, []);

  const { regions, filteredData, dataForChart, yearlyDataForChart } = useFilteredData(
    state.regionData,
    selectedRegion,
    selectedDate
  );

  console.log("Region data for rendering:", state.regionData); // Log the data used for rendering

  const setDate = (date: Date) => dispatch({ type: 'SET_DATE', payload: date });
  const setRegion = (region: string | null) => dispatch({ type: 'SET_REGION', payload: region });
  const setTab = (tab: 'chart' | 'table' | 'trend') => dispatch({ type: 'SET_TAB', payload: tab });
  const fetchData = () => fetchRegionData(selectedDate, selectedRegion);

  return {
    state: {
      ...state,
      regions,
      filteredData,
      dataForChart,
      yearlyDataForChart,
      isLoading: isAllDataLoading || state.isLoading,
      error: allDataError || state.error,
    },
    setDate,
    setRegion,
    setTab,
    fetchData,
    refetchAllData,
  };
};

export default useEVRegistrationData;
