import { useEffect } from 'react';

import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

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
void SplashScreen.preventAutoHideAsync();

function SplashController() {
  const { isLoading } = useAuthSession();
  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync().catch(() => {});
  }, [isLoading]);
  return null;
}

export default function RootLayout() {
  useRegisterAutoRefresh();
  useAuthSyncStore();

  return (
    <RootProvider>
      <SplashController />
      <Slot />
    </RootProvider>
  );
}
