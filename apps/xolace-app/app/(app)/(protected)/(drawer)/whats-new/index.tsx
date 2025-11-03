import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export default function WhatsNewScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center gap-3">
        <Text className="text-2xl font-semibold">What&apos;s New</Text>
        <Text className="text-center text-base text-gray-500">
          Fresh drops land here first. Check back soon for updates.
        </Text>
      </View>
    </View>
  );
}
