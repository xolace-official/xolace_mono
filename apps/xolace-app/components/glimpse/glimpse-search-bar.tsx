// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-search-bar.tsx
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface GlimpseSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function GlimpseSearchBar({ value, onChangeText }: GlimpseSearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 flex-row items-center gap-3 px-4 py-3.5 bg-muted/30 rounded-full border border-border/50">
      <Search 
        size={20} 
        color={isDark ? '#9ca3af' : '#6b7280'} 
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for videos here"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="flex-1 text-base text-foreground"
      />
    </View>
  );
}