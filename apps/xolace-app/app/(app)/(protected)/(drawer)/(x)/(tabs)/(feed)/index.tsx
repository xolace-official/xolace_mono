import React, { useCallback, useContext } from 'react';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import { useDrawerProgress } from "@react-navigation/drawer";
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Constants,
  Dialog,
  PanningProvider,
  Text,
  View as ViewUI,
} from 'react-native-ui-lib';
import { scheduleOnRN } from 'react-native-worklets';

import { TabsContext } from '../../../../../../../lib/providers/tabs-provider';
import { XolaceButton } from '@xolacekit/ui';

import { DailyPrompt } from '../../../../../../../components/cards/DailyPrompt';
import { EnhancedPostCard } from '../../../../../../../components/cards/EnhancedPostCard';
import {
  ANIMATION_START_OFFSET,
  SCROLL_DISTANCE_FOR_FULL_HIDE,
  SCROLL_THRESHOLD,
} from '../../../../../../../constants/config/tabBar-config';
import { useFeedPosts } from '../../../../../../../hooks/feed/use-feed-posts';
import dummyPosts, {
  EnhancedPost,
} from '../../../../../../../lib/dummy-data/post';

import { useHeaderAnimation } from '../../../../../../../lib/hooks/use-header-scroll';

// ✅ Create Animated version of FlashList for UI thread animations
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<EnhancedPost>,
);

export default function HomePage() {
const isVisible = true;
    // x-bottom-tabs-background-animation 🔽
  const { tabBarHeight, handleXTabsOnScroll } = useContext(TabsContext);

  // x-bottom-tabs-background-animation 🔼

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      handleXTabsOnScroll(e);
    },
  });

   // Get filtered posts based on global feed filter state
  const { filteredPosts } = useFeedPosts(dummyPosts);


  // renderItem memoized for performance
  const _renderItem = useCallback(({ item }: { item: EnhancedPost }) => {
    return <EnhancedPostCard post={item} />;
  }, []);

  // getItemType prevents layout thrashing for mixed types
  const getItemType = useCallback(() => 'post', []);

  return (
    <View className="bg-background flex-1">
      {/*<Stack.Screen*/}
      {/*    options={{*/}
      {/*        header: () => <FeedHeader />,*/}
      {/*    }}*/}
      {/*/>*/}
      <AnimatedFlashList
        data={filteredPosts}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        getItemType={getItemType}
        onScroll={scrollHandler}
        scrollEventThrottle={1000 / 60}
        ListHeaderComponent={<DailyPrompt />}
        ListFooterComponent={<View style={{ height: 80 }} />}
        contentContainerStyle={{  paddingBottom: tabBarHeight + 16, }}
        showsVerticalScrollIndicator={false}
      />

      {/* Optional intro dialog */}
      <Dialog
        visible={isVisible}
        onDismiss={() => console.log('dismissed')}
        panDirection={PanningProvider.Directions.DOWN}
        containerStyle={styles.roundedDialog}
      >
        <ViewUI spread>
          <View className="flex h-16 items-center justify-center bg-[#242627]">
            <Text className="text-xl !text-white dark:text-white">
              ✨ Welcome to Xolace! ✨
            </Text>
          </View>
          <ViewUI marginT-20 marginH-20 marginB-20>
            <Text color="#6D1865" className="px-12 text-center font-medium">
              You've just found your space. Your chosen campfires are ready, and
              you're never alone here.
            </Text>
          </ViewUI>
          <View className="mb-8 flex flex-row items-center justify-center gap-2">
            <XolaceButton
              size="sm"
              label="Explore Campfires"
              className="bg-[#242627]"
              labelClassName="!text-xs !tracking-tight font-medium text-white"
            />
            <XolaceButton
              size="sm"
              label="Maybe Later"
              className="bg-white"
              labelClassName="!text-xs !tracking-tight font-medium"
            />
          </View>
        </ViewUI>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  roundedDialog: {
    backgroundColor: '#fff',
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,
    position: 'relative',
    experimental_backgroundImage:
      'linear-gradient(to right,  rgba(255, 255, 255, 0.1) 20%, rgba(0, 0, 0, 0.3) 100%)',
  },
});
