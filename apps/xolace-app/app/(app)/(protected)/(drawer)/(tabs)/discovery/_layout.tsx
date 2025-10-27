import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

export default function DiscoveryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Campfires',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Stack>
  );
}
