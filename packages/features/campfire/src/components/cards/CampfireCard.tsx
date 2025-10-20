import { View } from 'react-native';

import { Text, X, XolaceButton, XolaceIconBadge } from '@xolacekit/ui';

export const CampfireCardV1 = () => {
  return (
    <View className="mb-4 flex h-[83px] flex-row items-center justify-between rounded-lg bg-[#E8DFCA] px-4">
      <View className="max-w-[80%]">
        <Text className="text-lg font-medium">x/campfire name</Text>
        <Text className="mb-1 truncate text-wrap text-xs">
          No one negative issues and related stories dfh
        </Text>
        <View className="flex flex-row items-center gap-2">
          <View>
            <XolaceIconBadge
              leftIcon={X}
              iconSize={18}
              label={'Mental Growth'}
            />
          </View>
          <Text className="text-xs font-normal">13k campers</Text>
        </View>
      </View>
      <View className="">
        <XolaceButton label="Join" className={'bg-blue-400'} />
      </View>
    </View>
  );
};
