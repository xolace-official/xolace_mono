import { useSignOut } from '@xolacekit/supabase';
import { Button, ButtonProps, Text, cn } from '@xolacekit/ui';

type SignOutButtonProps = {
  className?: string;
  textClassName?: string;
  variant?: ButtonProps['variant'];
};

export function SignOutButton({
  className,
  textClassName,
  variant = 'destructive',
}: SignOutButtonProps) {
  const signOutMutation = useSignOut();

  return (
    <Button
      variant={variant}
      className={cn('mt-auto', className)}
      onPress={() => signOutMutation.mutate()}
    >
      <Text className={cn('text-base font-medium', textClassName)}>
        Sign Out
      </Text>
    </Button>
  );
}
