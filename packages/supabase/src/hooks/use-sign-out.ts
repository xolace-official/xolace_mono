import { useMutation } from '@tanstack/react-query';

import { useSupabase } from './use-supabase';

export function useSignOut() {
  const client = useSupabase();

  return useMutation({
    mutationFn: () => {
      console.log('SIGNED_OUT-mutation');
      return client.auth.signOut();
    },
  });
}
