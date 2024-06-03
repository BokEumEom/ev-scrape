// src/hooks/useEVRegistrations.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAllEVRegistrations } from '@/services/evRegistrationService';
import { EVRegistration } from '@/types';

const useEVRegistrations = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['allEVRegistrations'],
    queryFn: fetchAllEVRegistrations,
    initialData: [],
  });

  return {
    data: data as EVRegistration[],
    error,
    isLoading,
    refetch,
  };
};

export default useEVRegistrations;
