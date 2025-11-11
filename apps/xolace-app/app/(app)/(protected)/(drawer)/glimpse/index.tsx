// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/index.tsx
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlimpseHeader } from '../../../../../components/glimpse/glimpse-header';
import { GlimpseControls } from '../../../../../features/glimpse/glimpse-controls';
import { GlimpseVideoList } from '../../../../../features/glimpse/glimpse-video-list';
import { useMockGlimpseVideos } from '../../../../../hooks/glimpse/use-mock-glimpse-videos';
import type { GlimpseSortOptionTypes } from '../../../../../features/glimpse/types';

export default function GlimpseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<GlimpseSortOptionTypes>('most_recent');

  const { videos, isLoading, hasMore, loadMore } = useMockGlimpseVideos(
    searchQuery,
    sortOption
  );

  const handleUpload = () => {
    // Navigate to upload screen
    console.log('Navigate to upload');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1">
        <GlimpseHeader onUpload={handleUpload} />
        
        <GlimpseControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        <GlimpseVideoList
          videos={videos}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}