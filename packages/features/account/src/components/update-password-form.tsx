import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Input, Text, toast } from '@xolacekit/ui';

import {
  UpdatePasswordFormValues,
  UpdatePasswordSchema,
  useUpdatePassword,
} from '../lib/hooks/use-update-password';

export function UpdatePasswordForm() {
  const updatePasswordMutation = useUpdatePassword();

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <View className="flex flex-col gap-4">
      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <Input
            secureTextEntry
            placeholder="Enter your new password"
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <Input
            secureTextEntry
            placeholder="Confirm your new password"
            {...field}
          />
        )}
      />

      <Button
        disabled={updatePasswordMutation.isPending}
        onPress={form.handleSubmit((values) => {
          updatePasswordMutation.mutate(values, {
            onSuccess: () => {
              toast.success('Password updated successfully');
              form.reset();
            },
            onError: () => {
              toast.error('Something went wrong');
            },
          });
        })}
      >
        <Text>
          {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
        </Text>
      </Button>
    </View>
  );
}
