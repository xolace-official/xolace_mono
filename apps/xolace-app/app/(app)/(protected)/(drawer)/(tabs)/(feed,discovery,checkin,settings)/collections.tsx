import { useCallback, useMemo, useState } from 'react';

import { Stack } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import { SegmentedControl } from '../../../../../../components/collections/segmented-control';
import { PostCollectionsList } from '../../../../../../features/collections/components/post-collections-list';
import { VideoCollectionsList } from '../../../../../../features/collections/components/video-collections-list';

type SegmentValue = 'posts' | 'videos';

const AnimatedContainer = Animated.View;

export default function CollectionsScreen() {
  const [activeSegment, setActiveSegment] = useState<SegmentValue>('posts');

  const segments = useMemo(
    () => [
      { label: 'Posts', value: 'posts' as const },
      { label: 'Videos', value: 'videos' as const },
    ],
    [],
  );

  const handleSegmentChange = useCallback((value: string) => {
    setActiveSegment(value as SegmentValue);
  }, []);

  return (
    <View className="flex-1 bg-background pt-48">
      <Stack.Screen
        options={{
          title: 'Collections📚',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerTitle: () => (
            <SegmentedControl
              segments={segments}
              selectedValue={activeSegment}
              onChange={handleSegmentChange}
            />
          ),
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <AnimatedContainer
        key={activeSegment}
        className="flex-1"
        entering={FadeInRight.springify().duration(220)}
        exiting={FadeOutLeft.duration(180)}
      >
        {activeSegment === 'posts' ? (
          <PostCollectionsList isActive />
        ) : (
          <VideoCollectionsList isActive />
        )}
      </AnimatedContainer>
    </View>
  );
}
