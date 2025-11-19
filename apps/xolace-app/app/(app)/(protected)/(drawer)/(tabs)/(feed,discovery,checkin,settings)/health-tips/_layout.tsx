import { Stack } from 'expo-router';
import { View } from 'react-native';

import { BookOpenCheck, NAV_THEME, Text, useColorScheme } from '@xolacekit/ui';

import BackButton from '../../../../../../../components/shared/BackButton';

function HealthTipsHeaderTitle() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="rounded-2xl bg-primary/10 p-3">
        <BookOpenCheck size={20} color="#7C9CFF" strokeWidth={1.75} />
      </View>

      <View className="flex-1">
        <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          Xolace
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text className="text-lg font-semibold text-foreground">
            Wellness Insight
          </Text>
          <View className="h-2 w-2 rounded-full bg-violet-400" />
        </View>
      </View>
    </View>
  );
}

export default function HealthTipsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Health tips',
          headerLeft: () => <BackButton />,
          headerTitle: () => <HealthTipsHeaderTitle />,
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="[slug]"
        options={{
          title: 'Wellness insight',
          headerLeft: () => <BackButton />,
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
