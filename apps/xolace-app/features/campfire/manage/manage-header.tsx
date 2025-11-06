import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

interface ManageHeaderProps {
  joinedCount: number;
}

export function ManageHeader({ joinedCount }: ManageHeaderProps) {
  return (
    <View className="mb-10 mt-4 flex-row items-center justify-between">
      <Text className="text-3xl font-bold text-foreground">
        Manage Campfires
      </Text>
      <Text className="text-base text-muted-foreground">
        {joinedCount} joined
      </Text>
    </View>
  );
}
