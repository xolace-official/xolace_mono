import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import { ToggleGroup, ToggleGroupItem } from '@xolacekit/ui';

type Theme = 'light' | 'dark' | 'system';

export function ThemeModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="flex justify-start">
      <ToggleGroup
        className="justify-start"
        type="single"
        value={colorScheme}
        onValueChange={async (value) => {
          setColorScheme(value as Theme);
          await AsyncStorage.setItem('theme', value as Theme);
        }}
      >
        <ToggleGroupItem value="light" aria-label="Light Mode">
          <Sun className="h-4 w-4 text-secondary-foreground" />
        </ToggleGroupItem>

        <ToggleGroupItem value="dark" aria-label="Dark Mode">
          <Moon className="h-4 w-4 text-secondary-foreground" />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
