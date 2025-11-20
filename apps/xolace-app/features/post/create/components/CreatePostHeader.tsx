import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

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
        className="h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
      >
        <X size={24} color={isDark ? '#f4f4f5' : '#0f172a'} />
      </Pressable>

      <Button
        disabled={!canSubmit}
        onPress={onSubmit}
        className="rounded-full px-6 active:opacity-90 disabled:bg-muted-foreground/30 dark:bg-blue-600"
      >
        <Text className="text-base font-semibold text-primary-foreground">
          Post
        </Text>
      </Button>
    </View>
  );
};
