// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-search-bar.tsx
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { TextInput, View } from 'react-native';
import { Input } from '@xolacekit/ui';

interface GlimpseSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function GlimpseSearchBar({
  value,
  onChangeText,
}: GlimpseSearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center flex-1 gap-1 pl-4 border rounded-full border-black/10 bg-muted/50 dark:border-white/10">
      <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for videos"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="flex-1 text-base bg-muted/20 text-foreground"
      />
    </View>
  );
}
