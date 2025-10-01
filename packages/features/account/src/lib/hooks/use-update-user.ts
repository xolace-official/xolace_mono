import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { useSupabase } from '@xolacekit/supabase';

export const UpdateUserSchema = z.union([
  z.object({
    email: z.string().email('Please enter a valid email'),
  }),
  z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
]);

export type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;

/**
 * This mutation is used to update the user's account data.
 * It takes in an object with the updated data and returns the updated data.
 */
export function useUpdateUser() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async (values: UpdateUserFormValues) => {
      const { error: updateError } = await supabase.auth.updateUser({
        ...values,
      });

      if (updateError) {
        throw updateError;
      }
    },
  });
}
