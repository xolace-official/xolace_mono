import { Stack } from 'expo-router';

import { ProfileScreen } from '../../../../../components/profile';

export default function ProfileRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackVisible: true,
          headerBackTitle: 'Settings',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <ProfileScreen />
    </>
  );
}
