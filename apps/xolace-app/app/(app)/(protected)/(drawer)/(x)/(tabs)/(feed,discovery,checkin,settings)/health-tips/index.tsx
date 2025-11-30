import { useCallback } from 'react';

import { router, useSegments } from 'expo-router';
import { View } from 'react-native';

import { HealthTipsHeader } from '../../../../../../../../features/health-tips/components/health-tips-header';
import { HealthTipsList } from '../../../../../../../../features/health-tips/components/health-tips-list';
import { useHealthTipsQuery } from '../../../../../../../../features/health-tips/hooks/use-health-tips-query';
import type { HealthTipListItem } from '../../../../../../../../features/health-tips/types';

export default function HealthTipsScreen() {
  const segments = useSegments() as string[];
  const isFeedContext = segments.includes('(feed)');

  const {
    data: tips = [],
    isLoading,
    isRefetching,
    refetch,
    error,
  } = useHealthTipsQuery();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePressTip = useCallback((tip: HealthTipListItem) => {
    const params: Record<string, string> = {
      slug: tip.slug,
      title: tip.title,
      author_name: tip.author_name,
      topic: tip.topic,
      read_time: tip.read_time?.toString() ?? '0',
    };

    if (tip.author_avatar_url) {
      params.author_avatar_url = tip.author_avatar_url;
    }

    if (tip.excerpt) {
      params.excerpt = tip.excerpt;
    }

    router.push({
      pathname: '/health-tips/[slug]',
      params: { slug: tip.slug },
    });
  }, []);

  return (
    <View className={`bg-background flex-1 ${isFeedContext ? '' : 'pb-20'}`}>
      <HealthTipsList
        tips={tips}
        header={<HealthTipsHeader />}
        isLoading={isLoading}
        isRefetching={isRefetching}
        errorMessage={error?.message}
        onRetry={refetch}
        onRefresh={handleRefresh}
        onPressTip={handlePressTip}
      />
    </View>
  );
}
