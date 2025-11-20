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
};

export const PostComposerToolbar = ({
  onPickImage,
  onOpenTools,
  onMoodPress,
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
      disabled: true,
      onPress: () => {},
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
      {actions.map(({ key, label, icon: Icon, onPress, disabled }) => (
        <Pressable
          key={key}
          onPress={onPress}
          disabled={disabled}
          className={`items-center ${
            disabled ? 'opacity-40' : 'active:opacity-80'
          }`}
          style={{
            opacity: disabled ? 0.3 : 0.8,
          }}
        >
          <View className="h-11 w-11 items-center justify-center rounded-full bg-white/5">
            <Icon size={22} color={iconColor} />
          </View>
          <Text className="mt-1 text-[11px] text-muted-foreground">
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
