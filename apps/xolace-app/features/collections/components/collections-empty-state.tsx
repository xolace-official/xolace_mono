import { Bookmark } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

type CollectionsEmptyStateProps = {
  title: string;
  description: string;
};

export function CollectionsEmptyState({
  title,
  description,
}: CollectionsEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="mb-4 rounded-full bg-muted/50 p-4">
        <Bookmark size={28} color="#a1a1aa" />
      </View>
      <Text className="mb-2 text-center text-lg font-semibold text-foreground">
        {title}
      </Text>
      <Text className="text-center text-base text-muted-foreground">
        {description}
      </Text>
    </View>
  );
}
