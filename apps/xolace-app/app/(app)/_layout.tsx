import { Stack } from 'expo-router';

import { useAuthChangeListener, useAuthSession } from '@xolacekit/supabase';

export default function AppLayout() {
  useAuthChangeListener({
    appHomePath: '/',
  });
  const { isAuthenticated } = useAuthSession();

  return (
    <Stack>
      {/* Public auth screens (sign-in/up/etc.) visible when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Private app screens visible when authenticated */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
