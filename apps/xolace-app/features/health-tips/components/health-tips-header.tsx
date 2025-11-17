import { View } from 'react-native';
import { BookOpenCheck } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

export function HealthTipsHeader() {
  return (
    <View className="px-6 pt-8 pb-4">
      <View className="flex-row items-center gap-3">
        <View className="rounded-2xl bg-primary/10 p-3">
          <BookOpenCheck size={28} color="#7C9CFF" strokeWidth={1.75} />
        </View>

        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Xolace
          </Text>
          <View className="mt-1 flex-row items-center gap-2">
            <Text className="text-2xl font-semibold text-foreground">
              Wellness Insight
            </Text>
            <View className="h-2 w-2 rounded-full bg-violet-400" />
          </View>
        </View>
      </View>

      <Text className="mt-4 text-base leading-6 text-muted-foreground">
        Expert-backed articles and guides for your mental health journey.
      </Text>
    </View>
  );
}
