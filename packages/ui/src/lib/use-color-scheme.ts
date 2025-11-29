import { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUniwind, Uniwind } from 'uniwind';

export function useColorScheme() {
  const { theme } = useUniwind();
  

  const setColorScheme = useCallback(async (nextTheme: string) => {
    console.log('theme', theme);
    try {
      Uniwind.setTheme(nextTheme);
      await AsyncStorage.setItem('theme', nextTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [theme]);

  return {
    colorScheme: theme,
    isDarkColorScheme: theme === 'dark',
    setColorScheme,
  };
}
