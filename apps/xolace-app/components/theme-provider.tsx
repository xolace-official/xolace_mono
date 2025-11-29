import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { Platform } from 'react-native';
import { Uniwind } from 'uniwind';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export function GlobalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');

        if (Platform.OS === 'web') {
          if (typeof document !== 'undefined') {
            // Adds the background color to the html element to prevent white background on overscroll.
            /* eslint-disable-next-line no-undef */
            document.documentElement.classList.add('bg-background');
          }
        }

        if (savedTheme) {
          // If we have a saved theme, force it.
          // This fixes the issue where "sunset" might revert to "light" if Uniwind defaults to system/light initially.
          if (savedTheme !== Uniwind.currentTheme) {
            Uniwind.setTheme(savedTheme as any);
          }
        } else {
          // If no saved theme, save the current one (likely system default)
          await AsyncStorage.setItem('theme', colorScheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsColorSchemeLoaded(true);
        SplashScreen.hideAsync();
      }
    })();
    // Run once on mount to hydrate the theme preference.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light}>
      {children}
    </ThemeProvider>
  );
}
