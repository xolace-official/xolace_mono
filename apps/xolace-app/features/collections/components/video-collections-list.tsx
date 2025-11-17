import { memo, useCallback, useMemo } from 'react';

import { FlashList } from '@shopify/flash-list';
import {
  ActivityIndicator,
  RefreshControl,
  View,
} from 'react-native';

import { GlimpseVideoCard } from '../../glimpse/glimpse-video-card';
import { useVideoCollections } from '../hooks/use-video-collections';
import { CollectionsEmptyState } from './collections-empty-state';

type VideoCollectionsListProps = {
  isActive: boolean;
};

function VideoCollectionsListComponent({
  isActive,
}: VideoCollectionsListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useVideoCollections({ enabled: isActive });

  const videos = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof videos)[number] }) => (
      <View className="px-4 py-3">
        <GlimpseVideoCard video={item} />
      </View>
    ),
    [],
  );

  const listEmpty =
    isLoading || isRefetching ? (
      <View className="py-12">
        <ActivityIndicator />
      </View>
    ) : (
      <CollectionsEmptyState
        title="Saved videos arrive here"
        description="Keep the glimpse videos you love close. Save one to see it here."
      />
    );

  return (
    <FlashList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={280}
      refreshControl={
        <RefreshControl
          refreshing={
            (isFetching && !isFetchingNextPage) ||
            (isLoading && !videos.length)
          }
          onRefresh={() => {
            void refetch();
          }}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={listEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="py-4">
            <ActivityIndicator />
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );
}

export const VideoCollectionsList = memo(VideoCollectionsListComponent);
