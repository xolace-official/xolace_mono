// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-controls.tsx
import { View } from 'react-native';

import { GlimpseSearchBar } from '../../components/glimpse/glimpse-search-bar';
import { GlimpseSortDropdown } from '../../components/glimpse/glimpse-sort-dropdown';
import type { GlimpseSortOptionTypes } from './types';

interface GlimpseControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: GlimpseSortOptionTypes;
  onSortChange: (option: GlimpseSortOptionTypes) => void;
}

export function GlimpseControls({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: GlimpseControlsProps) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-4">
      <GlimpseSearchBar value={searchQuery} onChangeText={onSearchChange} />

      <GlimpseSortDropdown
        selectedSort={sortOption}
        onSortChange={onSortChange}
      />
    </View>
  );
}
