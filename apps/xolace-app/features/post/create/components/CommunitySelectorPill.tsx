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

  const badgeLabel = community ? community.slug : 'x/';

  return (
    <Pressable
      onPress={onPress}
      className="self-start px-4 py-2 mt-1 border rounded-full border-white/10 bg-white/5 active:opacity-80 dark:bg-white/5"
      style={{ alignSelf: "flex-start", width: "auto" }}
    >
      <View className="flex-row items-center gap-3">
        <View className="px-3 py-1 rounded-full bg-white/10">
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
