// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/search-bar.tsx
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center flex-1 gap-3 px-4 py-3 border bg-muted/50 rounded-2xl border-border">
      <Search 
        size={20} 
        color={isDark ? '#9ca3af' : '#6b7280'} 
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by name or keyword"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="flex-1 text-base text-foreground"
      />
    </View>
  );
}