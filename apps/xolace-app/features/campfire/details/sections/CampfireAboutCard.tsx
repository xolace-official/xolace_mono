import { Calendar, Globe2 } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

import type { CampfireDetails } from '../types';

export function CampfireAboutCard({ campfire }: { campfire: CampfireDetails }) {
  const createdDate = new Date(campfire.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View className="border-border/60 bg-card/90 rounded-3xl border p-4">
      <Text className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        About {campfire.name}
      </Text>
      <Text className="text-foreground mt-2 text-base">
        {campfire.description}
      </Text>

      <View className="mt-4 flex-row items-center gap-3">
        <Calendar size={16} color="#94a3b8" />
        <Text className="text-muted-foreground text-sm">
          Created {createdDate}
        </Text>
      </View>
      <View className="mt-2 flex-row items-center gap-3">
        <Globe2 size={16} color="#94a3b8" />
        <Text className="text-muted-foreground text-sm capitalize">
          {campfire.visibility} campfire
        </Text>
      </View>
    </View>
  );
}
