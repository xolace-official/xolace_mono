// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-video-list.tsx
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, View } from 'react-native';

import { Text } from '@xolacekit/ui';

import { GlimpseVideoCard } from './glimpse-video-card';
import type { GlimpseVideo } from './types';

interface GlimpseVideoListProps {
  videos: GlimpseVideo[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function GlimpseVideoList({
  videos,
  isLoading,
  hasMore,
  onLoadMore,
}: GlimpseVideoListProps) {
  if (isLoading && videos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-center text-base text-muted-foreground">
          No videos found. Be the first to share your story!
        </Text>
      </View>
    );
  }

  return (
    <FlashList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GlimpseVideoCard video={item} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="h-4" />}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        hasMore ? (
          <View className="items-center py-4">
            <ActivityIndicator size="small" className="text-primary" />
          </View>
        ) : null
      }
    />
  );
}
