import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Feed', headerLeft: () => <DrawerToggleButton /> ,
        }}
      />
    </Stack>
  );
}
