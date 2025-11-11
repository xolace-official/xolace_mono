import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export default function CheckinLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
      }}
    >
      <Stack.Screen
        name="checkin"
        options={{
          title: 'Check In',
          headerLeft: () => <DrawerToggleButton />,  
          animation: 'fade_from_bottom',
        }}
      />

      <Stack.Screen
        name="glimpse"
        options={{
          title: 'Glimpses',
          headerShown: false
        }}
      />
    </Stack>
  );
}
