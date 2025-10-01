import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@xolacekit/supabase';

export function useFetchAccount(userId: string | null | undefined) {
  const supabase = useSupabase();
  const queryKey = ['user', 'account'];

  const queryFn = async () => {
    if (!userId) {
      return null;
    }

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', userId)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
}
