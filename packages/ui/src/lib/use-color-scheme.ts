import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import * as Uniwind from 'uniwind';
import { useUniwind } from 'uniwind';

type Theme = 'light' | 'dark' | 'system';

const setTheme = (Uniwind as { setTheme?: (theme: string) => void }).setTheme;
const setAdaptiveThemes = (
  Uniwind as { setAdaptiveThemes?: (enabled: boolean) => void }
).setAdaptiveThemes;

export function useColorScheme() {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const deviceColorScheme = useDeviceColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem('theme')) as
          | Theme
          | null;
        const desiredTheme = savedTheme ?? 'system';

        if (!savedTheme) {
          await AsyncStorage.setItem('theme', desiredTheme);
        }

        if (desiredTheme === 'system') {
          setAdaptiveThemes?.(true);
          setTheme?.(deviceColorScheme ?? 'light');
        } else {
          setAdaptiveThemes?.(false);
          setTheme?.(desiredTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [deviceColorScheme]);

  useEffect(() => {
    if (!hasAdaptiveThemes) {
      return;
    }

    setTheme?.(deviceColorScheme ?? 'light');
  }, [deviceColorScheme, hasAdaptiveThemes]);

  const setColorScheme = async (nextTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', nextTheme);

      if (nextTheme === 'system') {
        setAdaptiveThemes?.(true);
        setTheme?.(deviceColorScheme ?? 'light');
      } else {
        setAdaptiveThemes?.(false);
        setTheme?.(nextTheme);
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleColorScheme = async () => {
    const newTheme = (theme === 'dark' ? 'light' : 'dark') as Theme;
    await setColorScheme(newTheme);
  };

  const normalizedTheme = (theme as Theme) ?? 'dark';

  return {
    colorScheme: normalizedTheme,
    isDarkColorScheme: normalizedTheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
