// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/campfire-list.tsx
import { FlatList, View } from 'react-native';
import { Text } from '@xolacekit/ui';
import { CampfireCard } from './campfire-card';
import type { Campfire } from '../../../app/(app)/(protected)/(drawer)/(tabs)/discovery';

interface CampfireListProps {
  campfires: Campfire[];
}

export function CampfireList({ campfires }: CampfireListProps) {
function EmptyComponent () {
    return (
      <View className="items-center justify-center flex-1 py-12">
        <Text className="text-center text-muted-foreground">
          No campfires found. Try adjusting your filters.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={campfires}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CampfireCard campfire={item} />}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyComponent}
      ItemSeparatorComponent={() => <View className="h-px my-4 bg-border" />}
    />
  );
}