import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

export default function GlimpseLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Glimpses',
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Stack>
  );
}
