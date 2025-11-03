import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Bell } from '@xolacekit/ui';
import { useColorScheme } from '@xolacekit/ui';

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerBlurEffect: 'systemChromeMaterial',
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
        }}
      />
    </Stack>
  );
}
