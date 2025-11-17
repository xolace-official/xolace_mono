import type { ReactNode } from 'react';

import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

import { Text, XolaceButton } from '@xolacekit/ui';

import type { HealthTipListItem } from '../types';
import { HealthTipCard } from './health-tip-card';

type HealthTipsListProps = {
  tips: HealthTipListItem[];
  header?: ReactNode;
  isLoading?: boolean;
  isRefetching?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onRefresh?: () => void;
  onPressTip?: (tip: HealthTipListItem) => void;
};

export function HealthTipsList({
  tips,
  header,
  isLoading,
  isRefetching,
  errorMessage,
  onRetry,
  onRefresh,
  onPressTip,
}: HealthTipsListProps) {
  const headerElement = header ? (
    <View className="pb-2">{header}</View>
  ) : undefined;

  if (isLoading && tips.length === 0) {
    return (
      <View className="flex-1">
        {headerElement}
        <SkeletonList />
      </View>
    );
  }

  if (errorMessage && tips.length === 0) {
    return (
      <View className="flex-1">
        {headerElement}
        <View className="px-6">
          <ErrorState message={errorMessage} onRetry={onRetry} />
        </View>
      </View>
    );
  }

  if (!isLoading && tips.length === 0) {
    return (
      <View className="flex-1">
        {headerElement}
        <View className="px-6">
          <EmptyState />
        </View>
      </View>
    );
  }

  return (
    <FlashList
      data={tips}
      renderItem={({ item }) => (
        <HealthTipCard tip={item} onPress={onPressTip} />
      )}
      keyExtractor={(item) => `${item.slug}-${item.id}`}
      ListHeaderComponent={headerElement}
      ItemSeparatorComponent={() => <View className="h-4" />}
      showsVerticalScrollIndicator={false}
      refreshing={isRefetching}
      onRefresh={onRefresh}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingBottom: 32,
      }}
    />
  );
}

function SkeletonList() {
  return (
    <View className="gap-4 px-6">
      {Array.from({ length: 3 }, (_, index) => (
        <View
          key={`tip-skeleton-${index}`}
          className="p-4 border rounded-3xl border-border/40 bg-card/60"
        >
          <View className="w-1/2 h-4 rounded-full bg-muted/40" />
          <View className="w-11/12 mt-3 rounded-full h-7 bg-muted/40" />
          <View className="w-10/12 h-4 mt-2 rounded-full bg-muted/30" />
          <View className="w-24 h-3 mt-6 rounded-full bg-muted/30" />
          <View className="w-32 h-3 mt-2 rounded-full bg-muted/20" />
        </View>
      ))}
    </View>
  );
}

function EmptyState() {
  return (
    <View className="items-center justify-center flex-1 px-6 py-10 border border-dashed rounded-3xl border-border/60 bg-card/40">
      <Text className="text-lg font-semibold text-foreground">
        Nothing to show yet
      </Text>
      <Text className="mt-2 text-sm text-center text-muted-foreground">
        Once the community publishes new tips, they will live here. Check back
        soon or refresh the feed.
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
    <View className="items-center justify-center px-6 py-10 border rounded-3xl border-destructive/40 bg-destructive/5">
      <Text className="text-lg font-semibold text-destructive">
        Unable to load health tips
      </Text>
      <Text className="mt-2 text-sm text-center text-destructive/80">
        {message}
      </Text>
      {onRetry ? (
        <XolaceButton label='Try Again' className="mt-4" size="sm" onPress={onRetry}/>
      ) : null}
    </View>
  );
}
