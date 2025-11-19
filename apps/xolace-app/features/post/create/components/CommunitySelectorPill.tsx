import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

import { usePostDraftStore } from '../store/usePostDraftStore';

type CommunitySelectorPillProps = {
  onPress: () => void;
};

export const CommunitySelectorPill = ({
  onPress,
}: CommunitySelectorPillProps) => {
  const community = usePostDraftStore((state) => state.community);
  const label = community
    ? community.name
    : 'Select a community';

  const badgeLabel = community ? community.slug : 'r/';

  return (
    <Pressable
      onPress={onPress}
      className="mt-1 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 active:opacity-80 dark:bg-white/5"
    >
      <View className="flex-row items-center gap-3">
        <View className="rounded-full bg-white/10 px-3 py-1">
          <Text className="text-sm font-semibold text-foreground">{badgeLabel}</Text>
        </View>
        <Text
          className={`text-base ${
            community ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {label}
        </Text>
        <ChevronDown size={18} color="#9ca3af" />
      </View>
    </Pressable>
  );
};
