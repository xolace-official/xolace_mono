import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export default function DiscoveryLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Discover Campfires',
          headerLeft: () => <DrawerToggleButton />,
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
        }}
      />
    </Stack>
  );
}
