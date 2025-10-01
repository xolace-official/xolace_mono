import { Stack } from 'expo-router';
import { View } from 'react-native';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@xolacekit/ui';

import { ThemeModeToggle } from '../../../../../components/settings/theme-mode-toggle';

export default function ApplicationSettingsPage() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: 'Application',
          headerBackVisible: true,
          headerBackTitle: 'Settings',
          headerBackButtonMenuEnabled: true,
        }}
      />

      <View className="gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>

            <CardDescription>
              Customize your app's theme and appearance
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ThemeModeToggle />
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
