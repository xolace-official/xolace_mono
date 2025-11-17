import { memo, useMemo } from 'react';

import { Pressable, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  Text,
} from '@xolacekit/ui';

import type { HealthTipListItem } from '../types';

const TOPIC_STYLES: Record<
  string,
  { label: string; badgeClassName: string }
> = {
  awareness: {
    label: 'Awareness',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300 border-none',
  },
  stress: {
    label: 'Stress',
    badgeClassName: 'bg-green-500/15 text-green-300 border-none',
  },
  mindfulness: {
    label: 'Mindfulness',
    badgeClassName: 'bg-blue-500/10 text-blue-300 border-none',
  },
  general: {
    label: 'General',
    badgeClassName: 'bg-purple-500/10 text-purple-200 border-none',
  },
};

type HealthTipCardProps = {
  tip: HealthTipListItem;
  onPress?: (tip: HealthTipListItem) => void;
};

export const HealthTipCard = memo(function HealthTipCard({
  tip,
  onPress,
}: HealthTipCardProps) {
  const topicMeta =
    TOPIC_STYLES[tip.topic] ??
    ({
      label: tip.topic,
      badgeClassName: 'bg-foreground/10 text-foreground border-none',
    } as const);

  const initials = useMemo(() => {
    if (!tip.author_name) {
      return 'XL';
    }
    return tip.author_name
      .split(' ')
      .slice(0, 2)
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  }, [tip.author_name]);

  const handlePress = () => {
    onPress?.(tip);
  };

  const readTimeLabel =
    tip.read_time === 1 ? '1 min read' : `${tip.read_time} mins read`;

  const readMoreActive = Boolean(onPress);

  return (
    <Card className="p-4 border shadow-sm rounded-3xl border-border/60 bg-card/90">
      <View className="flex-row gap-3">
        <Avatar alt={tip.author_name} className="w-12 h-12">
          {tip.author_avatar_url ? (
            <AvatarImage source={{ uri: tip.author_avatar_url }} />
          ) : (
            <AvatarFallback>
              <Text className="text-sm font-semibold text-foreground">
                {initials}
              </Text>
            </AvatarFallback>
          )}
        </Avatar>

        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-3">
            <Text className="flex-1 text-lg font-semibold leading-6 text-foreground">
              {tip.title}
            </Text>
            <Text className="text-xs font-medium text-muted-foreground">
              {readTimeLabel}
            </Text>
          </View>

          <Badge
          variant={'secondary'}
            className={`mt-3 self-start px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${topicMeta.badgeClassName}`}
          >
            <Text>{topicMeta.label}</Text>
          </Badge>

          <Text
            className="mt-3 text-sm leading-5 text-muted-foreground"
            numberOfLines={2}
          >
            {tip.excerpt ?? 'Tap to learn more about this wellness insight.'}
          </Text>

          <Text className="mt-4 text-xs uppercase tracking-[0.1rem] text-muted-foreground">
            By {tip.author_name}
          </Text>

          <Pressable
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={`Read more about ${tip.title}`}
            disabled={!readMoreActive}
            className="flex-row items-center gap-1 mt-3"
          >
            <Text
              className={`text-sm font-semibold ${
                readMoreActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Read more
            </Text>
            <ArrowRight
              size={16}
              color={readMoreActive ? '#7C9CFF' : '#777777'}
              strokeWidth={2.5}
            />
          </Pressable>
        </View>
      </View>
    </Card>
  );
});
