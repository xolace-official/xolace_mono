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
    <View className="mt-4 mb-6 flex-row items-center gap-3">
      <View className="bg-muted/50 flex-1 flex-row items-center gap-3 rounded-2xl border border-black/10 px-4 dark:border-white/10">
        <Folder size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search joined campfires..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          className="bg-muted/30 text-foreground flex-1 text-base"
        />
      </View>

      <Pressable
        onPress={onFilterPress}
        className="bg-muted/50 rounded-2xl border border-black/10 p-3 active:opacity-70 dark:border-white/10"
      >
        <SquareDashedMousePointer
          size={20}
          color={isDark ? '#a78bfa' : '#8b5cf6'}
        />
      </Pressable>
    </View>
  );
}
