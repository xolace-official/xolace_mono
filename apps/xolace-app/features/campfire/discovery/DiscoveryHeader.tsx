// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/discovery-header.tsx
import { View } from 'react-native';
import { Text } from '@xolacekit/ui';

export function DiscoveryHeader() {
  return (
    <View className="mt-4">
      <Text className="text-3xl font-bold text-center text-foreground">
        Discover Campfire
      </Text>
      <Text className="px-8 mt-2 text-base text-center text-muted-foreground">
        Find your circle. Join discussions that matter to you.
      </Text>
    </View>
  );
}