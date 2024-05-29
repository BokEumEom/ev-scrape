// src/services/vehicleService.ts
import { AxiosError } from 'axios';
import { axiosInstance } from './apiService';
import { VehicleSpec, VehicleDetails, ApiError } from '@/types';
import { handleApiError } from '@/utils/handleApiError';

const VEHICLES_BASE_URL = '/api/v1/vehicles';

/**
 * VehicleSpec 객체를 생성하는 함수
 * @param {VehicleSpec} vehicleSpec - 생성할 VehicleSpec 객체
 * @returns {Promise<VehicleSpec | undefined>} - 생성된 VehicleSpec 객체
 * @throws {ApiError} - 생성 중 발생한 에러
 */
export const createVehicleSpec = async (vehicleSpec: VehicleSpec): Promise<VehicleSpec> => {
  const url = `/api/v1/vehicles`;

  try {
    const { data } = await axiosInstance.post<VehicleSpec>(url, vehicleSpec);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<{ message: string; errors: string[] }>;
      console.error('Failed to create vehicle specification:', axiosError.response?.data || axiosError.message);
      throw new ApiError(
        axiosError.response?.status || 500,
        axiosError.response?.data?.message || 'Unexpected error occurred',
        axiosError.response?.data?.errors
      );
    } else {
      console.error('An unexpected error occurred:', error);
      throw new ApiError(500, 'Internal Server Error');
    }
  }
};

/**
 * VehicleSpec 목록을 가져오는 함수
 * @returns {Promise<VehicleDetails[] | undefined>} - VehicleSpec 객체 배열
 * @throws {Error} - 데이터 가져오기 중 발생한 에러
 */
export const fetchVehicleSpecifications = async (): Promise<VehicleDetails[] | undefined> => {
  try {
    const { data } = await axiosInstance.get<VehicleDetails[]>(VEHICLES_BASE_URL);
    return data;
  } catch (error) {
    handleApiError(error);
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch data');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
