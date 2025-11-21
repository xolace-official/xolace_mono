import { Pressable, View } from 'react-native';
import { BookOpen, ChevronDown } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

type CampfireGuideCardProps = {
  onPress: () => void;
};

export function CampfireGuideCard({ onPress }: CampfireGuideCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-3xl border border-border/60 bg-card/90 px-4 py-4"
    >
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <BookOpen size={18} color="#f97316" />
        </View>
        <View>
          <Text className="text-base font-semibold text-foreground">
            Campfire Guide
          </Text>
          <Text className="text-xs text-muted-foreground">
            Quick tips and resources from the Firestarter
          </Text>
        </View>
      </View>
      <ChevronDown size={18} color="#cbd5e1" />
    </Pressable>
  );
}
