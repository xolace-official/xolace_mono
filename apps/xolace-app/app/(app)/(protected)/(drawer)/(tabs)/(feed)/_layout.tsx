import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Bell } from '@xolacekit/ui';
import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerBlurEffect: 'regular',
        headerTransparent: true,
        headerStyle: {
          backgroundColor:
            colorScheme === 'dark'
              ? NAV_THEME.dark.colors.background
              : NAV_THEME.light.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Campfire',
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => (
            <View className="flex flex-row ml-2">
              <Bell color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
          ),
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
