import { useQuery } from '@tanstack/react-query';

import { useSupabase } from './use-supabase';

const queryKey = ['supabase', 'user'];

export function useUser() {
  const client = useSupabase();

  const queryFn = async () => {
    const response = await client.auth.getUser();

    // this is most likely a session error or the user is not logged in
    if (response.error) {
      return null;
    }

    if (response.data?.user) {
      return response.data.user;
    }

    return Promise.reject(new Error('Unexpected result format'));
  };

  return useQuery({
    queryFn,
    queryKey,
  });
}
