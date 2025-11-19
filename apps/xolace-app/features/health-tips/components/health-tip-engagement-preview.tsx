import { memo } from 'react';

import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export const HealthTipEngagementPreview = memo(
  function HealthTipEngagementPreview() {
    return (
      <View className="mt-10 rounded-3xl border border-dashed border-border/60 bg-card/50 p-4">
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

        <View className="mt-4 flex-row gap-4">
          <View className="flex-1 rounded-2xl border border-border/40 bg-background/80 p-4">
            <Text className="text-sm font-semibold text-foreground">
              Reactions
            </Text>
            <Text className="mt-2 text-xs text-muted-foreground">
              Express how this insight made you feel once the lightweight
              reactions ship.
            </Text>
          </View>
          <View className="flex-1 rounded-2xl border border-border/40 bg-background/80 p-4">
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
  },
);
