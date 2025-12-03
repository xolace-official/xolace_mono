import { Moon, Sun } from 'lucide-react-native';
import { View } from 'react-native';

import { useColorScheme } from '@xolacekit/ui';
import { ToggleGroup, ToggleGroupItem } from '@xolacekit/ui';

type Theme = 'light' | 'dark' | 'system' | 'sunset';

export function ThemeModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="flex justify-start">
      <ToggleGroup
        className="justify-start"
        type="single"
        value={colorScheme}
        onValueChange={(value) => {
          setColorScheme(value as Theme);
        }}
      >
        <ToggleGroupItem value="light" aria-label="Light Mode">
          <Sun className="text-secondary-foreground h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="dark" aria-label="Dark Mode">
          <Moon className="text-secondary-foreground h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="sunset" aria-label="Sunset Mode">
          <Moon className="text-secondary-foreground h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
