// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/discovery-header.tsx
import { View } from 'react-native';

import { Compass, Text, cn } from '@xolacekit/ui';

export function DiscoveryHeader() {
  //
  return (
    <View className="mt-3">
      <View
        className={cn(
          'bg-manual-glass border-manual-border-glass flex-row items-center gap-3 rounded-2xl border p-4',
        )}
      >
        <View className="bg-primary/15 size-9 items-center justify-center rounded-full">
          <Compass color="#A78BFA" size={18} />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold">Curated for you</Text>
          <Text className="text-muted-foreground text-xs">
            Explore vibrant spaces trending across the community this week.
          </Text>
        </View>
      </View>
    </View>
  );
}
