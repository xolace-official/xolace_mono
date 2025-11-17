import { memo, useCallback, useMemo } from 'react';

import { FlashList } from '@shopify/flash-list';
import {
  ActivityIndicator,
  RefreshControl,
  View,
} from 'react-native';

import { EnhancedPostCard } from '../../../components/cards/EnhancedPostCard';
import { usePostCollections } from '../hooks/use-post-collections';
import { CollectionsEmptyState } from './collections-empty-state';

type PostCollectionsListProps = {
  isActive: boolean;
};

function PostCollectionsListComponent({ isActive }: PostCollectionsListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = usePostCollections({ enabled: isActive });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof posts)[number] }) => (
        <EnhancedPostCard post={item} />
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
        title="No saved posts yet"
        description="Tap the bookmark on a post to add it to your favorites."
      />
    );

  return (
    <FlashList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={360}
      refreshControl={
        <RefreshControl
          refreshing={
            (isFetching && !isFetchingNextPage) ||
            (isLoading && !posts.length)
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

export const PostCollectionsList = memo(PostCollectionsListComponent);
