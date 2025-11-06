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
        headerBlurEffect: 'systemChromeMaterialDark',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="manage/index"
        options={{
          title: 'Your Campfires',
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => (
            <View className="flex flex-row ml-2">
              <Bell color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
          ),
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
