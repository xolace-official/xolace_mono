import { useCallback, useMemo, useRef, useState } from 'react';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { EnhancedPost } from '../../lib/dummy-data/post';
import {
  ProfileTabKey,
  dummyProfileData,
  dummyProfilePosts,
} from '../../lib/dummy-data/profile';
import { EnhancedPostCard } from '../cards/EnhancedPostCard';
import { ProfileHero } from './ProfileHero';
import { ProfileOverviewSection } from './ProfileOverviewSection';
import { ProfileSheetHeader } from './ProfileSheetHeader';

type SheetItem = EnhancedPost | { id: string; type: 'overview' };

export function ProfileScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [activeTab, setActiveTab] = useState<ProfileTabKey>('overview');
  const [sheetIndex, setSheetIndex] = useState(0);

  const snapPoints = useMemo(() => ['54%', '95%'], []);

  const overviewData = useMemo<SheetItem[]>(
    () => [{ id: 'overview', type: 'overview' }],
    [],
  );

  const sheetData = activeTab === 'posts' ? dummyProfilePosts : overviewData;

  const sheetBackgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? '#05060a' : '#f9fafb',
    }),
    [isDarkMode],
  );

  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      borderTopWidth: isDarkMode ? 1 : 0,
    }),
    [isDarkMode],
  );

  const listContentContainer = useMemo(
    () => ({
      paddingBottom: insets.bottom + 48,
      paddingHorizontal: 20,
      gap: 20,
    }),
    [insets.bottom],
  );

  const renderSheetItem = useCallback(
    ({ item }: { item: SheetItem }) => {
      if (activeTab === 'posts') {
        const post = item as EnhancedPost;
        return (
          <EnhancedPostCard
            post={post}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl dark:border-white/10 dark:bg-white/5"
          />
        );
      }

      return (
        <ProfileOverviewSection
          profile={dummyProfileData}
          isDarkMode={isDarkMode}
        />
      );
    },
    [activeTab, isDarkMode],
  );

  const keyExtractor = useCallback(
    (item: SheetItem) => ('id' in item ? item.id : (item as EnhancedPost).id),
    [],
  );

  const handleTabChange = useCallback((tab: ProfileTabKey) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      bottomSheetRef.current?.expand();
    });
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  return (
    <View
      className={isDarkMode ? 'flex-1 bg-[#020617]' : 'flex-1 bg-[#f1f5f9]'}
    >
      <ProfileHero
        coverImageUrl={dummyProfileData.coverImageUrl}
        topInset={insets.top}
        isDarkMode={isDarkMode}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        animateOnMount
        onChange={handleSheetChange}
        style={sheetStyle}
        backgroundStyle={sheetBackgroundStyle}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? '#f9fafb' : '#020617',
        }}
      >
        <BottomSheetFlatList
          data={sheetData}
          keyExtractor={keyExtractor}
          renderItem={renderSheetItem}
          contentContainerStyle={listContentContainer}
          ListHeaderComponent={
            <ProfileSheetHeader
              profile={dummyProfileData}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isDarkMode={isDarkMode}
              isExpanded={sheetIndex === 1}
            />
          }
          stickyHeaderIndices={[]}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 30,
  },
});
