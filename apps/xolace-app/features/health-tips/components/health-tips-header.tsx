import { View } from 'react-native';

import { Text, cn, useColorScheme } from '@xolacekit/ui';

export function HealthTipsHeader() {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        'mt-2 flex-row items-center gap-3 rounded-2xl border p-4',
        colorScheme === 'dark'
          ? 'border-white/10 bg-white/5'
          : 'border-gray-200 bg-white',
      )}
    >
      <Text className="text-base leading-6 text-muted-foreground">
        Expert-backed articles and guides for your mental health journey.
      </Text>
    </View>
  );
}
