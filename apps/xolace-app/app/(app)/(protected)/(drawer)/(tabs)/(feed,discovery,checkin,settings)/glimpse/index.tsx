// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/index.tsx
import { useState } from 'react';

import { useSegments } from 'expo-router';
import { View } from 'react-native';

// import { GlimpseHeader } from '../../../../../../../components/glimpse/glimpse-header';
import { GlimpseControls } from '../../../../../../../features/glimpse/glimpse-controls';
import { GlimpseVideoList } from '../../../../../../../features/glimpse/glimpse-video-list';
import type { GlimpseSortOptionTypes } from '../../../../../../../features/glimpse/types';
import { useMockGlimpseVideos } from '../../../../../../../hooks/glimpse/use-mock-glimpse-videos';

export default function GlimpseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] =
    useState<GlimpseSortOptionTypes>('most_recent');

  const { videos, isLoading, hasMore, loadMore } = useMockGlimpseVideos(
    searchQuery,
    sortOption,
  );

  const segments = useSegments();

  console.log('segment ', segments[4]);
  const isFeed = segments[4] === '(feed)';

  // const handleUpload = () => {
  //   // Navigate to upload screen
  //   console.log('Navigate to upload');
  // };

  return (
    <View className={`flex-1 bg-background ${isFeed ? '' : 'pb-20'} `}>
      <View className="flex-1">
        {/* <GlimpseHeader onUpload={handleUpload} /> */}

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
    </View>
  );
}
