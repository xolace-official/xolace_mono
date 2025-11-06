import { View } from 'react-native';
import { Text } from '@xolacekit/ui';

interface ManageHeaderProps {
  joinedCount: number;
}

export function ManageHeader({ joinedCount }: ManageHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mt-4 mb-10">
      <Text className="text-3xl font-bold text-foreground">
        Manage Campfires
      </Text>
      <Text className="text-base text-muted-foreground">
        {joinedCount} joined
      </Text>
    </View>
  );
}