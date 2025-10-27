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
        name="index"
        options={{
          title: 'Campfire',
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => (
            <View className="ml-2 flex flex-row">
              <Bell color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
