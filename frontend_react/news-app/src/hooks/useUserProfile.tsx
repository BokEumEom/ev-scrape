// src/hooks/useUserProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, signOutUser } from '../services/userService';

const useUserProfile = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile
  });

  const mutation = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
    },
  });

  const handleSignOut = async () => {
    mutation.mutate();
  };

  return { user, isLoading, error, handleSignOut };
};

export default useUserProfile;
