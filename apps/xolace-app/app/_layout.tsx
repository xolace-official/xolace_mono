import { useEffect } from 'react';

import { PortalHost } from '@rn-primitives/portal';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';

import { useAppStore } from '@xolacekit/state';
// import from packages
import {
  useAuthSession,
  useAuthSyncStore,
  useRegisterAutoRefresh,
} from '@xolacekit/supabase';

// root provider
import { RootProvider } from '../components/root-provider';
// Import global styles
import './global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// void SplashScreen.preventAutoHideAsync();

const isWeb = Platform.OS === 'web';
if (!isWeb) {
  // no-void to avoid unhandled promise in RN debugger
  SplashScreen.preventAutoHideAsync();
}

function SplashController() {
  const { isLoading } = useAuthSession();
  const _hasHydrated = useAppStore((s) => s._hasHydrated);
  useEffect(() => {
    if (isWeb && _hasHydrated && !isLoading)
      SplashScreen.hideAsync().catch(() => {});
  }, [isLoading, _hasHydrated]);
  return null;
}

export default function RootLayout() {
  useRegisterAutoRefresh();
  useAuthSyncStore();

  return (
    <RootProvider>
      <SplashController />
      <Slot />
      <PortalHost />
    </RootProvider>
  );
}
