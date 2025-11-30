import { Stack } from 'expo-router';
import { View } from 'react-native';

import { BookOpenCheck, NAV_THEME, Text, useColorScheme } from '@xolacekit/ui';

import BackButton from '../../../../../../../../components/shared/BackButton';

function HealthTipsHeaderTitle() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="bg-primary/10 rounded-2xl p-3">
        <BookOpenCheck size={20} color="#7C9CFF" strokeWidth={1.75} />
      </View>

      <View className="flex-1">
        <Text className="text-primary text-xs font-semibold tracking-[0.4em] uppercase">
          Xolace
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text className="text-foreground text-lg font-semibold">
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
          title: 'Wellness Insight',
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
