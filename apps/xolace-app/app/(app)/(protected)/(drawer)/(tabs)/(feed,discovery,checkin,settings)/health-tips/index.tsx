import { useCallback } from 'react';

import { useSegments } from 'expo-router';
import { View } from 'react-native';

import { HealthTipsHeader } from '../../../../../../../features/health-tips/components/health-tips-header';
import { HealthTipsList } from '../../../../../../../features/health-tips/components/health-tips-list';
import { useHealthTipsQuery } from '../../../../../../../features/health-tips/hooks/use-health-tips-query';
import type { HealthTipListItem } from '../../../../../../../features/health-tips/types';

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
    console.log('[HealthTips] selected tip', tip.slug);
    // TODO: Navigate to the tip details screen once available.
  }, []);

  return (
    <View className={`flex-1 bg-background ${isFeedContext ? '' : 'pb-20'}`}>
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
