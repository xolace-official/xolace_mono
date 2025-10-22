import { Stack } from 'expo-router';
import { View } from 'react-native';

import { UpdateProfileContainer } from '@xolacekit/account';

export default function ProfileSettingsPage() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackVisible: true,
          headerBackTitle: 'Settings',
          headerBackButtonMenuEnabled: true,
        }}
      />

      <UpdateProfileContainer />
    </View>
  );
}
