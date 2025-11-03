import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export default function ConfideScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center gap-3">
        <Text className="text-2xl font-semibold">Confide</Text>
        <Text className="text-center text-base text-gray-500">
          Private spaces for trusted conversations will arrive soon.
        </Text>
      </View>
    </View>
  );
}
