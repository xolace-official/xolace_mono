import { useCallback } from 'react';

import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';

import { useSupabase } from '@xolacekit/supabase';

export function useCreateDeepLink() {
  return makeRedirectUri({
    path: '/auth/callback',
  });
}

export function useCreateSessionFromUrl() {
  const supabase = useSupabase();

  return useCallback(
    async (url: string) => {
      const { params, errorCode } = QueryParams.getQueryParams(url);

      if (errorCode) {
        throw new Error(errorCode);
      }

      const { access_token, refresh_token } = params;

      if (!access_token || !refresh_token) {
        throw new Error('No access token or refresh token');
      }

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        throw error;
      }

      return data.session;
    },
    [supabase],
  );
}

export function usePerformOAuth(
  oAuthPromise: Promise<{
    data: { url: string };
    error: string | null;
  }>,
  redirectTo: string,
) {
  const createSessionFromUrl = useCreateSessionFromUrl();

  return useCallback(async () => {
    const { data, error } = await oAuthPromise;

    if (error) {
      throw error;
    }

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? '',
      redirectTo,
    );

    if (res.type === 'success') {
      const { url } = res;

      return await createSessionFromUrl(url);
    }

    throw new Error('Failed to open auth session');
  }, [createSessionFromUrl, oAuthPromise, redirectTo]);
}
