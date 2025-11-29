import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: false,
        headerStyle: {
          backgroundColor:
            colorScheme === 'dark'
              ? NAV_THEME.dark.colors.background
              : NAV_THEME.light.colors.background,
        },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerLeft: () => <DrawerToggleButton />,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeTitleStyle: {
            color: 'black',
          },
        }}
      />

      <Stack.Screen
        name="glimpse"
        options={{
          title: 'Glimpses',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="health-tips"
        options={{
          title: 'Health tips',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
