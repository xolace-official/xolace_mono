import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { FlashList } from '@shopify/flash-list';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Pressable, View } from 'react-native';

import { Card, Skeleton, Text } from '@xolacekit/ui';

import { EnhancedPostCard } from '../../../components/cards/EnhancedPostCard';
import type { EnhancedPost } from '../../../lib/dummy-data/post';

type CampfirePostsListProps = {
  posts: EnhancedPost[];
  header?: ReactNode;
  isLoading?: boolean;
  isRefreshing?: boolean;
  error?: string;
  onRetry?: () => void;
  onRefresh?: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  campfireOverride?: {
    name: string;
    iconUrl?: string;
    slug?: string;
  };
};

export function CampfirePostsList({
  posts,
  header,
  isLoading,
  isRefreshing,
  error,
  onRetry,
  onRefresh,
  onScroll,
  campfireOverride,
}: CampfirePostsListProps) {
  const headerElement = useMemo(() => header ?? null, [header]);

  if (isLoading && posts.length === 0) {
    return (
      <View className="px-4">
        {headerElement}
        <PostSkeleton />
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View className="px-4">
        {headerElement}
        <ErrorState message={error} onRetry={onRetry} />
      </View>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <View className="px-4">
        {headerElement}
        <EmptyState />
      </View>
    );
  }

  return (
    <FlashList
      data={posts}
      renderItem={({ item }) => (
        <EnhancedPostCard
          post={item}
          campfireOverride={
            campfireOverride
              ? {
                  name: campfireOverride.name,
                  iconUrl: campfireOverride.iconUrl,
                  slug: campfireOverride.slug,
                }
              : undefined
          }
        />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={headerElement}
      ItemSeparatorComponent={() => <View className="h-4" />}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onScroll={onScroll}
      scrollEventThrottle={16}
      estimatedItemSize={320}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
    />
  );
}

function PostSkeleton() {
  return (
    <View className="gap-4 pb-6">
      {Array.from({ length: 2 }, (_, index) => (
        <Card
          key={`post-skeleton-${index}`}
          className="border-border/50 bg-card/80 p-4"
        >
          <View className="flex-row items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-1/3 rounded-full" />
              <Skeleton className="h-3 w-1/5 rounded-full" />
            </View>
          </View>
          <View className="mt-4 gap-3">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-5/6 rounded-full" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
          </View>
        </Card>
      ))}
    </View>
  );
}

function EmptyState() {
  return (
    <View className="items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/40 px-6 py-10">
      <Text className="text-lg font-semibold text-foreground">
        No sparks yet
      </Text>
      <Text className="mt-2 text-center text-sm text-muted-foreground">
        Be the first to share something with the campfire.
      </Text>
    </View>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View className="items-center justify-center rounded-3xl border border-destructive/40 bg-destructive/5 px-6 py-10">
      <Text className="text-lg font-semibold text-destructive">
        Unable to load campfire posts
      </Text>
      <Text className="mt-2 text-center text-sm text-destructive/80">
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          className="mt-3 rounded-full bg-destructive px-4 py-2"
        >
          <Text className="text-sm font-semibold text-destructive-foreground">
            Try again
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
