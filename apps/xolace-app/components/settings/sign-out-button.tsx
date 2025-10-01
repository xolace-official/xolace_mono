import { useSignOut } from '@xolacekit/supabase';
import { Button, Text } from '@xolacekit/ui';

export function SignOutButton() {
  const signOutMutation = useSignOut();

  return (
    <Button
      variant={'destructive'}
      className={'mt-auto'}
      onPress={() => signOutMutation.mutate()}
    >
      <Text>Sign Out</Text>
    </Button>
  );
}
