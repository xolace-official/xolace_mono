import { View, TextInput, Pressable } from 'react-native';
import { Folder, SquareDashedMousePointer } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Input } from '@xolacekit/ui';

interface ManageSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export function ManageSearchBar({ value, onChangeText, onFilterPress }: ManageSearchBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center gap-3 mt-4 mb-6">
      <View className="flex-row items-center flex-1 gap-3 px-4 border rounded-2xl border-black/10 bg-muted/50 dark:border-white/10">
        <Folder 
          size={20} 
          color={isDark ? '#9ca3af' : '#6b7280'} 
        />
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search joined campfires..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          className="flex-1 text-base text-foreground bg-muted/30"
        />
      </View>
      
      <Pressable 
        onPress={onFilterPress}
        className="p-3 border rounded-2xl border-black/10 bg-muted/50 active:opacity-70 dark:border-white/10"
      >
        <SquareDashedMousePointer
          size={20} 
          color={isDark ? '#a78bfa' : '#8b5cf6'} 
        />
      </Pressable>
    </View>
  );
}