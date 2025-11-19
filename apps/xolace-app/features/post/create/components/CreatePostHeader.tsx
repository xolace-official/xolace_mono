import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';

import { Button, Text, useColorScheme } from '@xolacekit/ui';

type CreatePostHeaderProps = {
  canSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const CreatePostHeader = ({
  canSubmit,
  onClose,
  onSubmit,
}: CreatePostHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close composer"
        onPress={onClose}
        hitSlop={12}
        className="items-center justify-center w-10 h-10 rounded-full active:bg-white/10"
      >
        <X size={24} color={isDark ? '#f4f4f5' : '#0f172a'} />
      </Pressable>

      <Button
        disabled={!canSubmit}
        onPress={onSubmit}
        className="px-6 rounded-full dark:bg-blue-600 active:opacity-90 disabled:bg-muted-foreground/30"
      >
        <Text className="text-base font-semibold text-primary-foreground">
          Post
        </Text>
      </Button>
    </View>
  );
};
