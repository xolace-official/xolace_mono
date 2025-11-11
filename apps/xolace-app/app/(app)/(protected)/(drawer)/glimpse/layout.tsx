import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';

export default function CollectionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Collections',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Stack>
  );
}
