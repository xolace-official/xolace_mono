import React, { useEffect } from 'react';

import { AppState } from 'react-native';

import { useAuthChangeListener, useSupabase, useUser } from '../hooks';

export function AuthProvider(props: React.PropsWithChildren) {
  const user = useUser();

  useRegisterAutoRefresh();

  useAuthChangeListener({
    appHomePath: '/',
  });

  const childrenArray = React.Children.toArray(props.children);

  const childrenByType = {
    signedIn: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthProviderSignedIn,
    ),
    loading: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthProviderLoading,
    ),
    signedOut: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthProviderSignedOut,
    ),
  };

  if (user.isLoading) {
    return childrenByType.loading;
  }

  if (user.data) {
    return childrenByType.signedIn;
  }

  return childrenByType.signedOut;
}

export function AuthProviderLoading(props: { children: React.ReactNode }) {
  return props.children;
}

export function AuthProviderSignedIn(props: { children: React.ReactNode }) {
  return props.children;
}

export function AuthProviderSignedOut(props: { children: React.ReactNode }) {
  return props.children;
}

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
function useRegisterAutoRefresh() {
  const supabase = useSupabase();

  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void supabase.auth.startAutoRefresh();
      } else {
        void supabase.auth.stopAutoRefresh();
      }
    });
  }, [supabase]);
}
