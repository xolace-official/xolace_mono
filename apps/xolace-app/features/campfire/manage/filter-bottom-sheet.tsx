// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/components/filter-bottom-sheet.tsx
import { forwardRef, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Pressable, View } from 'react-native';

import { NAV_THEME, Text, useColorScheme } from '@xolacekit/ui';

import type { CampfireFilter } from './types';

interface FilterBottomSheetProps {
  activeFilter: CampfireFilter;
  onFilterChange: (filter: CampfireFilter) => void;
}

export const FilterBottomSheet = forwardRef<
  BottomSheet,
  FilterBottomSheetProps
>(({ activeFilter, onFilterChange }, ref) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const snapPoints = useMemo(() => [280], []);

  const filters: Array<{ value: CampfireFilter; label: string }> = [
    { value: 'all', label: 'All Campfires' },
    { value: 'favorites', label: 'Favorites' },
  ];

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
        />
      )}
      backgroundStyle={{
        backgroundColor:
          colorScheme === 'dark'
            ? NAV_THEME.dark.colors.background
            : NAV_THEME.light.colors.background,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? '#52525b' : '#d4d4d8',
      }}
    >
      <BottomSheetView className="flex-1 px-6">
        <View className="mb-6">
          <View className="mb-4 h-1 w-16 self-center rounded-full bg-muted-foreground/20" />
          <Text className="text-center text-2xl font-bold text-foreground">
            Select Filter
          </Text>
        </View>

        <View className="gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                onPress={() => onFilterChange(filter.value)}
                className={`rounded-2xl border p-4 active:opacity-70 ${
                  isDark
                    ? isActive
                      ? 'border-white/10 bg-primary/10'
                      : 'border-white/10 bg-white/5'
                    : isActive
                      ? 'border-gray-200 bg-primary/10'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`text-base font-medium ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

FilterBottomSheet.displayName = 'FilterBottomSheet';
