// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/search-bar.tsx
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Input } from '@xolacekit/ui';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="relative flex-row items-center flex-1 gap-3 border bg-muted/50 rounded-2xl border-black/10 dark:border-white/10">
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
        className="w-full text-base text-foreground bg-muted/50 rounded-2xl"
      />
    </View>
  );
}