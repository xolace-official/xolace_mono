import { ChevronDown } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@xolacekit/ui';

import { usePostDraftStore } from '../store/usePostDraftStore';

type CommunitySelectorPillProps = {
  onPress: () => void;
};

export const CommunitySelectorPill = ({
  onPress,
}: CommunitySelectorPillProps) => {
  const community = usePostDraftStore((state) => state.community);
  const label = community ? community.name : 'Select a community';

  const badgeLabel = community ? community.slug : 'x/';

  return (
    <Pressable
      onPress={onPress}
      className="mt-1 self-start rounded-full border border-gray-300 bg-white/5 px-4 py-2 active:opacity-80 dark:border-white/10 dark:bg-white/5"
      style={{ alignSelf: 'flex-start', width: 'auto' }}
    >
      <View className="flex-row items-center gap-3">
        <View className="rounded-full bg-gray-300/20 px-3 py-1 dark:bg-white/10">
          <Text className="text-sm font-semibold text-foreground">
            {badgeLabel}
          </Text>
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
