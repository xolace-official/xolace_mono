import { useEffect } from 'react';

import * as Linking from 'expo-linking';
import { router } from 'expo-router';

import { useCreateSessionFromUrl } from '@xolacekit/auth';
import { LoadingOverlay } from '@xolacekit/ui';

export default function CallbackPage() {
  const createSessionFromUrl = useCreateSessionFromUrl();
  const url = Linking.useURL();

  useEffect(() => {
    (async () => {
      if (!url || !url.includes('callback')) {
        return;
      }

      try {
        const session = await createSessionFromUrl(url);

        if (session) {
          return router.replace('/');
        }
      } catch (error) {
        console.error(error);

        router.push('/auth/error');
      }
    })();
  }, [createSessionFromUrl, url]);

  return <LoadingOverlay size="large">Signing you in...</LoadingOverlay>;
}
