import { View } from 'react-native';
import { Calendar, Globe2 } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

import type { CampfireDetails } from '../types';

export function CampfireAboutCard({ campfire }: { campfire: CampfireDetails }) {
  const createdDate = new Date(campfire.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View className="rounded-3xl border border-border/60 bg-card/90 p-4">
      <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        About {campfire.name}
      </Text>
      <Text className="mt-2 text-base text-foreground">{campfire.description}</Text>

      <View className="mt-4 flex-row items-center gap-3">
        <Calendar size={16} color="#94a3b8" />
        <Text className="text-sm text-muted-foreground">
          Created {createdDate}
        </Text>
      </View>
      <View className="mt-2 flex-row items-center gap-3">
        <Globe2 size={16} color="#94a3b8" />
        <Text className="text-sm text-muted-foreground capitalize">
          {campfire.visibility} campfire
        </Text>
      </View>
    </View>
  );
}
