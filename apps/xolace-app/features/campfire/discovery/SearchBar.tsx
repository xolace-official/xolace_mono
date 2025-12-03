// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/search-bar.tsx
import { View } from 'react-native';

import { Input, useColorScheme } from '@xolacekit/ui';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="bg-muted/50 relative flex-1 flex-row items-center gap-3 rounded-2xl border border-black/10 dark:border-white/10">
      {/* <View className='absolute z-10 bg-red-400'>
         <Search 
        size={20} 
        color={isDark ? '#9ca3af' : '#6b7280'} 
      />
     </View> */}
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by name or keyword"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="bg-muted/50 text-foreground w-full rounded-2xl text-base"
      />
    </View>
  );
}
