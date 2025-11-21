import { Clock } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

type ExpirationBadgeProps = {
  visible: boolean;
};

export const ExpirationBadge = ({ visible }: ExpirationBadgeProps) => {
  if (!visible) {
    return null;
  }

  return (
    <View className="mt-3 self-start rounded-full bg-amber-500/10 px-3 py-1.5">
      <View className="flex-row items-center gap-2">
        <Clock size={14} color="#fbbf24" />
        <Text className="text-xs font-semibold text-amber-200">
          Auto deletes in 24h
        </Text>
      </View>
    </View>
  );
};
