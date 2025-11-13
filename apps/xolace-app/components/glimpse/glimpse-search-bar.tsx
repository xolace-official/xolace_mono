import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

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
    <View className="flex-1 flex-row items-center gap-1 rounded-full border border-black/10 bg-muted/50 pl-4 dark:border-white/10">
      <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for videos"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="flex-1 bg-muted/20 text-base text-foreground"
      />
    </View>
  );
}
