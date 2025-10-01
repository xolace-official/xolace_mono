import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Toaster } from '@xolacekit/ui';

import { GlobalThemeProvider } from './theme-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GlobalThemeProvider>
          {children}

          <Toaster />
        </GlobalThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
