import { Stack } from 'expo-router';
import { View } from 'react-native';

import { UpdateAccountContainer } from '@xolacekit/account/dist';

export default function AccountSettingsPage() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: 'Account',
          headerBackTitle: 'Settings',
          headerBackVisible: true,
          headerBackButtonMenuEnabled: true,
          headerShown: true,
        }}
      />

      <UpdateAccountContainer />
    </View>
  );
}
