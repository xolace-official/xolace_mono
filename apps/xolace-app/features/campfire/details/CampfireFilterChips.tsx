import { ScrollView, Pressable, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';

type CampfireFilterChipsProps = {
  filters: readonly string[];
  activeFilter: string;
  onChange: (filter: string) => void;
};

export function CampfireFilterChips({
  filters,
  activeFilter,
  onChange,
}: CampfireFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      className="py-2"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            className={cn(
              'flex-row items-center rounded-full border px-4 py-2',
              isActive
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/70',
            )}
          >
            <View className="flex-row items-center">
              <Text
                className={cn(
                  'text-sm font-semibold',
                  isActive ? 'text-primary' : 'text-foreground',
                )}
              >
                {filter}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
