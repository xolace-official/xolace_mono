import {
  BarChart3,
  Image as ImageIcon,
  Link2,
  Mic,
  Settings2,
  Smile,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text, useColorScheme } from '@xolacekit/ui';

type ToolbarProps = {
  onPickImage: () => void;
  onOpenTools: () => void;
  onMoodPress: () => void;
  onToggleMic: () => void;
  micActive?: boolean;
  micDisabled?: boolean;
};

export const PostComposerToolbar = ({
  onPickImage,
  onOpenTools,
  onMoodPress,
  onToggleMic,
  micActive,
  micDisabled,
}: ToolbarProps) => {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#e5e7eb' : '#111827';

  const actions = [
    {
      key: 'link',
      label: 'Link',
      icon: Link2,
      disabled: true,
      onPress: () => {},
    },
    {
      key: 'image',
      label: 'Media',
      icon: ImageIcon,
      disabled: false,
      onPress: onPickImage,
    },
    {
      key: 'mood',
      label: 'Mood',
      icon: Smile,
      disabled: false,
      onPress: onMoodPress,
    },
    {
      key: 'tools',
      label: 'Tools',
      icon: Settings2,
      disabled: false,
      onPress: onOpenTools,
    },
    {
      key: 'mic',
      label: 'Voice',
      icon: Mic,
      disabled: micDisabled,
      onPress: onToggleMic,
    },
    {
      key: 'poll',
      label: 'Poll',
      icon: BarChart3,
      disabled: true,
      onPress: () => {},
    },
  ] as const;

  return (
    <View className="flex-row items-center justify-between px-4">
      {actions.map(({ key, label, icon: Icon, onPress, disabled }) => {
        const isMic = key === 'mic';
        const computedDisabled = disabled || (isMic && micDisabled);
        const tint = isMic && micActive ? '#ef4444' : iconColor;
        return (
          <Pressable
            key={key}
            onPress={onPress}
            disabled={computedDisabled}
            className={`items-center ${
              computedDisabled ? 'opacity-40' : 'active:opacity-80'
            }`}
            style={{
              opacity: computedDisabled ? 0.3 : 0.9,
            }}
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-white/5">
              <Icon size={22} color={tint} />
            </View>
            <Text className="mt-1 text-[11px] text-muted-foreground">
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
