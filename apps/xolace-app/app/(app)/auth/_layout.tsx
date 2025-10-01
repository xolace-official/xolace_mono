import { Redirect, Stack } from 'expo-router';

import {
  AuthProvider,
  AuthProviderSignedIn,
  AuthProviderSignedOut,
} from '@xolacekit/supabase';

export default function AuthTabsLayout() {
  return (
    <AuthProvider>
      <AuthProviderSignedIn>
        <Redirect href={'/'} />
      </AuthProviderSignedIn>

      <AuthProviderSignedOut>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              title: 'Sign In',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="sign-up"
            options={{
              title: 'Sign Up',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="password-reset"
            options={{
              title: 'Password Reset',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="callback"
            options={{
              title: '',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="error"
            options={{
              title: '',
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProviderSignedOut>
    </AuthProvider>
  );
}
