import { BookOpen, ChevronDown } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@xolacekit/ui';

type CampfireGuideCardProps = {
  onPress: () => void;
};

export function CampfireGuideCard({ onPress }: CampfireGuideCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="border-border/60 bg-card/90 flex-row items-center justify-between rounded-3xl border px-4 py-4"
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-primary/10 h-10 w-10 items-center justify-center rounded-full">
          <BookOpen size={18} color="#f97316" />
        </View>
        <View>
          <Text className="text-foreground text-base font-semibold">
            Campfire Guide
          </Text>
          <Text className="text-muted-foreground text-xs">
            Quick tips and resources from the Firestarter
          </Text>
        </View>
      </View>
      <ChevronDown size={18} color="#cbd5e1" />
    </Pressable>
  );
}
