import { useQuery, useMutation, useQueryClient } from 'react-query';
import { RootState } from "@/lib/store";
import userSlice from '@/lib/features/user.Slice';

export const useUser = (id: string) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery(
    ['user', id],
    () => userSlice.getUser(id).then(res => res.data),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const updateUser = useMutation(
    (userData: any) => userSlice.updateUser(id, userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', id]);
      },
    }
  );

  return { 
    user, isLoading, error,
    updateUser: updateUser.mutate,
  };
};