import { useCallback, useMemo } from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import { RefreshControl, ScrollView, Share, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, XolaceButton, useColorScheme } from '@xolacekit/ui';

import { HealthTipAuthorCard } from '../../../../../../../../features/health-tips/components/health-tip-author-card';
import { HealthTipDetailHero } from '../../../../../../../../features/health-tips/components/health-tip-detail-hero';
import { HealthTipEngagementPreview } from '../../../../../../../../features/health-tips/components/health-tip-engagement-preview';
import { HealthTipMarkdown } from '../../../../../../../../features/health-tips/components/health-tip-markdown';
import { useHealthTipDetail } from '../../../../../../../../features/health-tips/hooks/use-health-tip-detail';

export default function HealthTipDetailsScreen() {
  const params = useLocalSearchParams<{
    slug?: string;
    title?: string;
    author_name?: string;
    topic?: string;
    read_time?: string;
    author_avatar_url?: string;
    excerpt?: string;
  }>();

  const { colorScheme } = useColorScheme();
  const slug = params.slug;

  const { data, isLoading, isRefetching, refetch, error } =
    useHealthTipDetail(slug);

  const metadata = useMemo(() => {
    return {
      title: data?.title ?? params.title ?? 'Health Tip',
      author_name:
        data?.author_name ?? params.author_name ?? 'Xolace Health Line',
      topic: (data?.topic ?? params.topic) as string | null,
      read_time: (data?.read_time ?? Number(params.read_time)) || null,
      author_avatar_url: data?.author_avatar_url ?? params.author_avatar_url,
      excerpt: data?.excerpt ?? params.excerpt,
      created_at: data?.created_at,
    };
  }, [
    data?.author_avatar_url,
    data?.author_name,
    data?.created_at,
    data?.excerpt,
    data?.read_time,
    data?.title,
    data?.topic,
    params.author_avatar_url,
    params.author_name,
    params.excerpt,
    params.read_time,
    params.title,
    params.topic,
  ]);

  const handleShare = useCallback(async () => {
    if (!slug) {
      return;
    }

    const shareTitle = metadata.title;
    const preview =
      metadata.excerpt ??
      'Thoughtful micro-habits to stay grounded from the Xolace well-being team.';
    const shareUrl = `https://xolace.app/health-tips/${slug}`;

    try {
      await Share.share({
        title: shareTitle,
        message: `${shareTitle}\n\n${preview}\n\nRead now: ${shareUrl}`,
      });
    } catch (sharingError) {
      console.warn('[HealthTips] share failed', sharingError);
    }
  }, [metadata.excerpt, metadata.title, slug]);

  const handleBackToList = useCallback(() => {
    router.back();
  }, []);

  const showInitialLoading = isLoading && !data;
  const showErrorState = Boolean(error && !data);

  if (!slug) {
    return (
      <SafeAreaView className="bg-background flex-1 items-center justify-center px-6">
        <Text className="text-foreground text-center text-lg font-semibold">
          This tip is not reachable
        </Text>
        <Text className="text-muted-foreground mt-2 text-center text-sm">
          A valid identifier was not provided.
        </Text>
      </SafeAreaView>
    );
  }

  if (showInitialLoading) {
    return (
      <SafeAreaView className="bg-background flex-1 px-4">
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (showErrorState) {
    return (
      <View className="bg-background flex-1 items-center justify-center px-6">
        <Text className="text-destructive text-lg font-semibold">
          Unable to open this wellness insight
        </Text>
        <Text className="text-muted-foreground mt-2 text-center text-sm">
          {error?.message ?? 'Something went wrong. Please try again shortly.'}
        </Text>
        <View className="mt-6 w-full flex-row gap-3">
          <XolaceButton
            label="Back to tips"
            className="border-border/60 flex-1 border bg-transparent"
            labelClassName="text-foreground"
            onPress={handleBackToList}
          />
          <XolaceButton
            label="Retry"
            className="flex-1"
            onPress={() => refetch()}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="bg-background flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 48,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HealthTipDetailHero
          title={metadata.title}
          topic={metadata.topic}
          readTime={metadata.read_time}
          onShare={handleShare}
          isShareDisabled={!data}
        />

        <HealthTipAuthorCard
          authorName={metadata.author_name}
          avatarUrl={metadata.author_avatar_url}
          excerpt={metadata.excerpt}
          createdAt={metadata.created_at ?? undefined}
        />

        <HealthTipMarkdown content={data?.content} isLoading={isLoading} />

        <HealthTipEngagementPreview />
      </ScrollView>
    </View>
  );
}

function LoadingState() {
  return (
    <View className="mt-10 space-y-5">
      <View className="bg-muted/30 h-40 rounded-3xl" />
      <View className="bg-muted/25 h-28 rounded-3xl" />
      <View className="bg-muted/20 h-64 rounded-3xl" />
    </View>
  );
}
