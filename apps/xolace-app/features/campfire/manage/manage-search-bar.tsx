import { Folder, SquareDashedMousePointer } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Input, useColorScheme } from '@xolacekit/ui';

interface ManageSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export function ManageSearchBar({
  value,
  onChangeText,
  onFilterPress,
}: ManageSearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="mb-6 mt-4 flex-row items-center gap-3">
      <View className="flex-1 flex-row items-center gap-3 rounded-2xl border border-black/10 bg-muted/50 px-4 dark:border-white/10">
        <Folder size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search joined campfires..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          className="flex-1 bg-muted/30 text-base text-foreground"
        />
      </View>

      <Pressable
        onPress={onFilterPress}
        className="rounded-2xl border border-black/10 bg-muted/50 p-3 active:opacity-70 dark:border-white/10"
      >
        <SquareDashedMousePointer
          size={20}
          color={isDark ? '#a78bfa' : '#8b5cf6'}
        />
      </Pressable>
    </View>
  );
}
