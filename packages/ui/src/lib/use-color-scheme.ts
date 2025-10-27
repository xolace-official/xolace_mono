// @xolacekit/ui or wherever your hook is
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

export function useColorScheme() {
  const nativewindColorScheme = useNativewindColorScheme();
  const deviceColorScheme = useDeviceColorScheme(); // Get system preference

  // Initialize theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
          if (savedTheme === 'system') {
            nativewindColorScheme.setColorScheme(deviceColorScheme ?? 'dark');
          } else {
            nativewindColorScheme.setColorScheme(savedTheme);
          }
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Handle system theme changes
  useEffect(() => {
    const checkSystemTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'system') {
        nativewindColorScheme.setColorScheme(deviceColorScheme ?? 'dark');
      }
    };
    checkSystemTheme();
  }, [deviceColorScheme]);

  const setColorScheme = async (theme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);

      if (theme === 'system') {
        nativewindColorScheme.setColorScheme(deviceColorScheme ?? 'dark');
      } else {
        nativewindColorScheme.setColorScheme(theme);
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleColorScheme = async () => {
    const newTheme = nativewindColorScheme.colorScheme === 'dark' ? 'light' : 'dark';
    await setColorScheme(newTheme);
  };

  return {
    colorScheme: nativewindColorScheme.colorScheme ?? 'dark',
    isDarkColorScheme: nativewindColorScheme.colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}