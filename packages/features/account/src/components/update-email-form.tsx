import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useUpdateUser } from '@xolacekit/supabase';
import { Button, Input, Text, toast } from '@xolacekit/ui';

import { UpdateUserSchema } from '../lib/hooks/use-update-user';

export function UpdateEmailForm() {
  const updateEmailMutation = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <View className="flex flex-col gap-4">
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <Input inputMode={'email'} placeholder="Email" {...field} />
        )}
      />

      <Button
        disabled={updateEmailMutation.isPending}
        onPress={form.handleSubmit((data) => {
          updateEmailMutation.mutate(
            {
              ...data,
              redirectTo: `${window.location.origin}`,
            },
            {
              onSuccess: () => {
                toast.success('Email updated successfully');
                form.reset();
              },
              onError: () => {
                toast.error('Something went wrong');
              },
            },
          );
        })}
      >
        <Text>
          {updateEmailMutation.isPending ? 'Updating...' : 'Update Email'}
        </Text>
      </Button>
    </View>
  );
}
