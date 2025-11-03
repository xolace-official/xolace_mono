import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useColorScheme } from '@xolacekit/ui';
import { DrawerToggleButton } from '@react-navigation/drawer';

import { NAV_THEME } from '@xolacekit/ui';

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen 
      name="index" 
      options={{
         title: 'Settings', 
          headerLeft: () => <DrawerToggleButton />,
         headerLargeTitle: true,
         headerShadowVisible: false,
         headerStyle: {
            backgroundColor: colorScheme === 'dark' ? NAV_THEME.dark.colors.background : NAV_THEME.light.colors.background,
         },
         headerLargeTitleStyle: {
          color: 'black'
         }
         }} />
    </Stack>
  );
}
