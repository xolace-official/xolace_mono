// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/discovery-header.tsx
import { View } from 'react-native';

import { Compass, Text, cn, useColorScheme } from '@xolacekit/ui';

export function DiscoveryHeader() {
  const { colorScheme } = useColorScheme();

  //
  return (
    <View className="mt-3">
      <View
        className={cn(
          'flex-row items-center gap-3 rounded-2xl border p-4',
          colorScheme === 'dark'
            ? 'border-white/10 bg-white/5'
            : 'border-gray-200 bg-white',
        )}
      >
        <View className="items-center justify-center rounded-full size-9 bg-primary/15">
          <Compass color="#A78BFA" size={18} />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold">
            Curated for you
          </Text>
          <Text className="text-xs text-muted-foreground">
            Explore vibrant spaces trending across the community this week.
          </Text>
        </View>
      </View>
    </View>
  );
}
