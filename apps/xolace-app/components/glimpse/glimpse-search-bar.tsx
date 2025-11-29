import { Search } from 'lucide-react-native';
import { View } from 'react-native';

import { Input, useColorScheme } from '@xolacekit/ui';

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
    <View className="bg-muted/50 flex-1 flex-row items-center gap-1 rounded-full border border-black/10 pl-4 dark:border-white/10">
      <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for videos"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className="bg-muted/20 text-foreground flex-1 text-base"
      />
    </View>
  );
}
