// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/index.tsx
import { useMemo, useRef, useState } from 'react';
import { useLayoutEffect } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useSegments } from 'expo-router';
import { View } from 'react-native';

import { FilterBottomSheet } from '../../../../../../features/campfire/manage/filter-bottom-sheet';
import { useMockJoinedCampfires } from '../../../../../../features/campfire/manage/hooks/use-mock-joined-campfires';
import { JoinedCampfiresList } from '../../../../../../features/campfire/manage/joined-campfire-list';
import { ManageHeader } from '../../../../../../features/campfire/manage/manage-header';
import { ManageSearchBar } from '../../../../../../features/campfire/manage/manage-search-bar';

export type CampfireFilter = 'all' | 'favorites';

export default function ManageCampfiresScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CampfireFilter>('all');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const navigation = useNavigation();
   const segments = useSegments();

   console.log("segment ", segments[4])
   const isFeed = segments[4] === '(feed)';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Manage Campfires',
      headerBackButtonDisplayMode: 'minimal',
    });
  }, [navigation]);

  // Mock data hook - replace with actual data fetching
  const { campfires, isLoading } = useMockJoinedCampfires(
    searchQuery,
    activeFilter,
  );

  const joinedCount = useMemo(() => {
    return campfires.filter((c) => c.isJoined).length;
  }, [campfires]);

  const handleOpenFilter = () => {
    bottomSheetRef.current?.expand();
  };

  const handleFilterChange = (filter: CampfireFilter) => {
    setActiveFilter(filter);
    bottomSheetRef.current?.close();
  };

  return (
    <View className={`flex-1 bg-background ${isFeed ? 'pt-32' : ''}`}>
      <View className="flex-1 px-4">
        <ManageHeader joinedCount={joinedCount} />

        <ManageSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={handleOpenFilter}
        />

        <JoinedCampfiresList
          campfires={campfires}
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
      </View>

      <FilterBottomSheet
        ref={bottomSheetRef}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
    </View>
  );
}
