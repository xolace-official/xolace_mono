import { Stack } from 'expo-router';
import { View } from 'react-native';

import { UpdateProfileContainer } from '@xolacekit/account';
import { ProfileScreen } from '../../../../../../../components/profile';

export default function ProfileSettingsPage() {
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
