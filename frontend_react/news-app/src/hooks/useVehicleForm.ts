// src/hooks/useVehicleForm.ts
import { useState, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createVehicleSpec } from '../services/apiService';
import { toast } from 'react-toastify';
import { VehicleSpec, ApiError } from '../types';
import useCustomErrorHandler from './useCustomErrorHandler';

const useVehicleForm = (initialFormData: VehicleSpec) => {
  const [formData, setFormData] = useState<VehicleSpec>(initialFormData);
  const { handleError } = useCustomErrorHandler();
  
  const mutation = useMutation<VehicleSpec, ApiError, VehicleSpec>({
    mutationFn: createVehicleSpec,
    onSuccess: () => {
      toast.success('Vehicle specification added successfully!');
      setFormData(initialFormData); // reset form
    },
    onError: (error: ApiError) => {
      handleError(error); // Delegate error handling to the custom error handler
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return { handleChange, handleSubmit, formData, isLoading: mutation.isLoading };
};

export default useVehicleForm;
