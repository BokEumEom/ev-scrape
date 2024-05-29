// src/hooks/useVehicleForm.ts
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createVehicleSpec } from '@/services/vehicleService';
import { toast } from 'react-toastify';
import { VehicleSpec, ApiError } from '@/types';
import useCustomErrorHandler from './useCustomErrorHandler';

// 차량 폼 데이터를 관리하는 커스텀 훅
const useVehicleForm = (initialFormData: VehicleSpec) => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<VehicleSpec>(initialFormData);
  // 에러 메시지 상태
  const [errors, setErrors] = useState<string[]>([]);
  // 커스텀 에러 핸들러 사용
  const { handleError } = useCustomErrorHandler();
  
  // 차량 사양 생성 뮤테이션 설정
  const mutation = useMutation<VehicleSpec, ApiError, VehicleSpec>({
    mutationFn: createVehicleSpec,
    onSuccess: () => {
      toast.success('Vehicle specification added successfully!');
      setFormData(initialFormData); // 폼 데이터 리셋
      setErrors([]); // 에러 메시지 초기화
    },
    onError: (error: ApiError) => {
      handleError(error); // 커스텀 에러 핸들러로 에러 처리
      setErrors([error.message]); // 에러 메시지 설정
    }
  });

  // 입력 필드 값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData); // 폼 데이터가 유효하면 뮤테이션 실행
    }
  };

  // 폼 검증 함수
  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!formData.manufacturer) newErrors.push('Manufacturer is required'); // 제조사 필드 검증
    if (!formData.model) newErrors.push('Model is required'); // 모델 필드 검증
    // 필요한 다른 필드 검증 추가

    setErrors(newErrors); // 에러 메시지 설정
    return newErrors.length === 0; // 에러가 없으면 true 반환
  };

  // 훅에서 반환하는 값들
  return { handleChange, handleSubmit, formData, isLoading: mutation.isLoading, errors };
};

export default useVehicleForm;