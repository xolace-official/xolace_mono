import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export default function CampfireDiscoverScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center gap-3">
        <Text className="text-2xl font-semibold">Discover Campfires</Text>
        <Text className="text-center text-base text-gray-500">
          Explore curated circles soon—recommendations are brewing.
        </Text>
      </View>
    </View>
  );
}
