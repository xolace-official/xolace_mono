// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/index.tsx
import { useState, useRef, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import { ManageHeader } from '../../../../../../features/campfire/manage/manage-header';
import { ManageSearchBar } from '../../../../../../features/campfire/manage/manage-search-bar';
import { JoinedCampfiresList } from '../../../../../../features/campfire/manage/joined-campfire-list';
import { FilterBottomSheet } from '../../../../../../features/campfire/manage/filter-bottom-sheet';
import { useMockJoinedCampfires } from '../../../../../../features/campfire/manage/hooks/use-mock-joined-campfires';

export type CampfireFilter = 'all' | 'favorites';

export default function ManageCampfiresScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CampfireFilter>('all');
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Mock data hook - replace with actual data fetching
  const { campfires, isLoading } = useMockJoinedCampfires(searchQuery, activeFilter);

  const joinedCount = useMemo(() => {
    return campfires.filter(c => c.isJoined).length;
  }, [campfires]);

  const handleOpenFilter = () => {
    bottomSheetRef.current?.expand();
  };

  const handleFilterChange = (filter: CampfireFilter) => {
    setActiveFilter(filter);
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView className="flex-1 pt-12 bg-background" edges={['top']}>
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
    </SafeAreaView>
  );
}