
import { View } from 'react-native';
import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme, Text, BookOpenCheck } from '@xolacekit/ui';

import BackButton from '../../../../../../../components/shared/BackButton';



function HealthTipsHeaderTitle() {
  return (
    <View className="flex-row items-center gap-3">
        <View className="p-3 rounded-2xl bg-primary/10">
          <BookOpenCheck size={20} color="#7C9CFF" strokeWidth={1.75} />
        </View>

        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Xolace
          </Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-lg font-semibold text-foreground">
              Wellness Insight
            </Text>
            <View className="w-2 h-2 rounded-full bg-violet-400" />
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
    </Stack>
  );
}
