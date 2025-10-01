import { useEffect } from 'react';

import { Redirect, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';

import {
  AuthProvider,
  AuthProviderLoading,
  AuthProviderSignedIn,
  AuthProviderSignedOut,
} from '@xolacekit/supabase';

void SplashScreen.preventAutoHideAsync();

export default function MainLayout() {
  return (
    <AuthProvider>
      <AuthProviderLoading>
        <SplashScreenLoading />
      </AuthProviderLoading>

      <AuthProviderSignedIn>
        <MainLayoutTabs />
      </AuthProviderSignedIn>

      <AuthProviderSignedOut>
        <Redirect href={'/auth/sign-in'} />
      </AuthProviderSignedOut>
    </AuthProvider>
  );
}

function MainLayoutTabs() {
  return (
    <Tabs initialRouteName={'index'}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/',
          tabBarIcon: () => <HomeIcon className={'h-5'} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          href: '/settings',
          headerShown: false,
          tabBarIcon: () => <SettingsIcon className={'h-5'} />,
        }}
      />
    </Tabs>
  );
}

function SplashScreenLoading() {
  useEffect(() => {
    return () => {
      void SplashScreen.hideAsync();
    };
  });

  return null;
}
