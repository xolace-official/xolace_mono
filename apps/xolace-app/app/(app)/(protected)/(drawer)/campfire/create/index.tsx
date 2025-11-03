import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export default function CampfireCreateScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center gap-3">
        <Text className="text-2xl font-semibold">Create a Campfire</Text>
        <Text className="text-center text-base text-gray-500">
          Craft intimate spaces tailored to your community. Launch tools are
          arriving shortly.
        </Text>
      </View>
    </View>
  );
}
