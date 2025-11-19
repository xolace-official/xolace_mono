import { Pressable, View } from 'react-native';
import {
  BarChart3,
  Image as ImageIcon,
  Link2,
  Mic,
  Settings2,
  Smile,
} from 'lucide-react-native';

import { Text, useColorScheme } from '@xolacekit/ui';

type ToolbarProps = {
  onPickImage: () => void;
  onOpenTools: () => void;
};

export const PostComposerToolbar = ({
  onPickImage,
  onOpenTools,
}: ToolbarProps) => {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#e5e7eb' : '#111827';

  const actions = [
    { key: 'link', label: 'Link', icon: Link2, disabled: true },
    { key: 'image', label: 'Media', icon: ImageIcon, onPress: onPickImage },
    { key: 'emoji', label: 'Emoji', icon: Smile, disabled: true },
    { key: 'tools', label: 'Tools', icon: Settings2, onPress: onOpenTools },
    { key: 'mic', label: 'Voice', icon: Mic, disabled: true },
    { key: 'poll', label: 'Poll', icon: BarChart3, disabled: true },
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
        >
          <View className="h-11 w-11 items-center justify-center rounded-full bg-white/5">
            <Icon size={22} color={iconColor} />
          </View>
          <Text className="mt-1 text-[11px] text-muted-foreground">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
};
