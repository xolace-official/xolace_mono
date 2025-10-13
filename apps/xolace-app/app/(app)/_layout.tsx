import { Stack } from 'expo-router';

import { useSelectHasCompletedOnboarding } from '@xolacekit/state';
import { useAuthChangeListener, useAuthSession } from '@xolacekit/supabase';

export default function AppLayout() {
  useAuthChangeListener({
    appHomePath: '/',
  });
  const { isAuthenticated } = useAuthSession();
  const hasCompletedOnboarding = useSelectHasCompletedOnboarding();

  return (
    <Stack>
      {/* Private app screens visible when authenticated */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Public auth screens (sign-in/up/etc.) visible when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated && hasCompletedOnboarding}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* 3) ONBOARDING: only shown if NOT completed AND NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated && !hasCompletedOnboarding}>
        <Stack.Screen
          name="(onboarding)/onboarding"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}
