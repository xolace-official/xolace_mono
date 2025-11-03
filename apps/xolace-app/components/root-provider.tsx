import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Toaster } from '@xolacekit/ui';

import { GlobalThemeProvider } from './theme-provider';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GlobalThemeProvider>
          <KeyboardProvider>
          {children}
          </KeyboardProvider>
          <Toaster />
        </GlobalThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
