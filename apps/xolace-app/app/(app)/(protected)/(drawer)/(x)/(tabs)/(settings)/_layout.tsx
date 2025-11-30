import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: false,
        headerTitleAlign: "center",
        
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="settings"
        options={{
          headerLeft: () => <DrawerToggleButton />,
          headerShown: true,
          headerTintColor: "white",
          headerTransparent: true,
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
