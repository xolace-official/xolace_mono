import { memo } from 'react';

import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export const HealthTipEngagementPreview = memo(function HealthTipEngagementPreview() {
  return (
    <View className="p-4 mt-10 border border-dashed rounded-3xl border-border/60 bg-card/50">
      <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        Coming soon
      </Text>
      <Text className="mt-2 text-base font-semibold text-foreground">
        Reactions & quick feedback
      </Text>
      <Text className="mt-1 text-sm text-muted-foreground">
        We are leaving this space ready for moments when you can react or tell
        us if an article was helpful. Expect playful interactions soon.
      </Text>

      <View className="flex-row gap-4 mt-4">
        <View className="flex-1 p-4 border rounded-2xl border-border/40 bg-background/80">
          <Text className="text-sm font-semibold text-foreground">
            Reactions
          </Text>
          <Text className="mt-2 text-xs text-muted-foreground">
            Express how this insight made you feel once the lightweight reactions ship.
          </Text>
        </View>
        <View className="flex-1 p-4 border rounded-2xl border-border/40 bg-background/80">
          <Text className="text-sm font-semibold text-foreground">
            Was this helpful?
          </Text>
          <Text className="mt-2 text-xs text-muted-foreground">
            Rate the clarity soon to help us keep content relevant.
          </Text>
        </View>
      </View>
    </View>
  );
});
