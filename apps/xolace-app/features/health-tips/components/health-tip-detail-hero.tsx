import { memo, useMemo } from 'react';

import { Share2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text, useColorScheme, NAV_THEME } from '@xolacekit/ui';

import { getHealthTipTopicMeta } from '../constants/topic-meta';

type HealthTipDetailHeroProps = {
  title: string;
  topic?: string | null;
  readTime?: number | null;
  onShare?: () => void;
  isShareDisabled?: boolean;
};

export const HealthTipDetailHero = memo(function HealthTipDetailHero({
  title,
  topic,
  readTime,
  onShare,
  isShareDisabled,
}: HealthTipDetailHeroProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark'
  const meta = getHealthTipTopicMeta(topic ?? 'general');
  const readTimeLabel = useMemo(() => {
    if (!readTime) {
      return 'Quick read';
    }
    return readTime === 1 ? '1 min read' : `${readTime} mins read`;
  }, [readTime]);

  const handleShare = () => {
    if (isShareDisabled) {
      return;
    }
    onShare?.();
  };

  return (
    <View
      className={`rounded-3xl border p-5 shadow-md`}
      style={{
        shadowColor: colorScheme === 'dark' ? '#000' : '#93a6ff',
        shadowOpacity: colorScheme === 'dark' ? 0.45 : 0.2,
        shadowRadius: 15,
        backgroundColor: isDark ? NAV_THEME.dark.colors.glass_background : NAV_THEME.light.colors.glass_background,
        borderColor: isDark ?  NAV_THEME.dark.colors.glass_border : NAV_THEME.light.colors.glass_border
      }}
    >
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <View
            className="self-start px-3 py-1 rounded-full"
            style={{ backgroundColor: meta.backgroundTint }}
          >
            <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {meta.label}
            </Text>
          </View>

          <Text className="mt-4 text-3xl font-semibold leading-tight text-foreground">
            {title}
          </Text>

          <Text className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {readTimeLabel}
          </Text>
        </View>

        <Pressable
          hitSlop={6}
          onPress={handleShare}
          disabled={isShareDisabled}
          accessibilityRole="button"
          accessibilityLabel="Share health tip"
          className={`h-11 w-11 items-center justify-center rounded-full border ${
            isShareDisabled
              ? 'border-border/40 bg-muted/20'
              : 'border-white/10 bg-primary/10'
          }`}
        >
          <Share2
            size={20}
            color={isShareDisabled ? '#7b8196' : meta.accentColor}
            strokeWidth={2.4}
          />
        </Pressable>
      </View>
    </View>
  );
});
