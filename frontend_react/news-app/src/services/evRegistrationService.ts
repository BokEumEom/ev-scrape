// src/services/evRegistrationService.ts
import { AxiosError } from 'axios';
import { axiosInstance } from './apiService';
import { EVRegistration } from '@/types';
import { handleApiError } from '@/utils/handleApiError';

const EV_REGISTRATION_BASE_URL = '/api/v1/ev-registration';

export const fetchEVRegistrations = async (year: number, month: number, region?: string): Promise<EVRegistration[]> => {
  try {
    const url = new URL(EV_REGISTRATION_BASE_URL, axiosInstance.defaults.baseURL);
    url.searchParams.append('year', year.toString());
    url.searchParams.append('month', month.toString());
    if (region) {
      url.searchParams.append('region', region);
    }
    const { data } = await axiosInstance.get<EVRegistration[]>(url.toString());
    return data;
  } catch (error) {
    handleApiError(error);
    console.error(error);
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch data');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchAllEVRegistrations = async (): Promise<EVRegistration[]> => {
  try {
    const { data } = await axiosInstance.get<EVRegistration[]>(`${EV_REGISTRATION_BASE_URL}?limit=0`);
    return data;
  } catch (error) {
    handleApiError(error);
    console.error(error);
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch data');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};