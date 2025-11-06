// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/components/joined-campfires-list.tsx
import { ActivityIndicator, FlatList, View } from 'react-native';

import { Text } from '@xolacekit/ui';

import { JoinedCampfireCard } from './join-campfire-card';
import type { UserCampfireFavoriteJoin } from './types';

interface JoinedCampfiresListProps {
  campfires: UserCampfireFavoriteJoin[];
  isLoading: boolean;
  searchQuery: string;
}

export function JoinedCampfiresList({
  campfires,
  isLoading,
  searchQuery,
}: JoinedCampfiresListProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  function EmptyComponent() {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-center text-base text-muted-foreground">
          {searchQuery
            ? 'No campfires found matching your search.'
            : "You haven't joined any campfires yet."}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={campfires}
      keyExtractor={(item) => item.campfireId}
      renderItem={({ item }) => <JoinedCampfireCard campfire={item} />}
      ListEmptyComponent={EmptyComponent}
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
}
