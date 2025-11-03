import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export default function ChannelScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center gap-3">
        <Text className="text-2xl font-semibold">Channels</Text>
        <Text className="text-center text-base text-gray-500">
          Stay tuned—curated channels are on the way.
        </Text>
      </View>
    </View>
  );
}
