import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { Platform } from 'react-native';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export function GlobalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');

      if (Platform.OS === 'web') {
        if (typeof document !== 'undefined') {
          // Adds the background color to the html element to prevent white background on overscroll.
          /* eslint-disable-next-line no-undef */
          document.documentElement.classList.add('bg-background');
        }
      }

      if (!theme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      const colorTheme = theme === 'dark' ? 'dark' : 'light';

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }

      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light}>
      {children}
    </ThemeProvider>
  );
}
