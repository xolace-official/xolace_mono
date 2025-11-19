import { memo, useMemo } from 'react';

import { ArrowRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  useColorScheme,
} from '@xolacekit/ui';

import { getHealthTipTopicMeta } from '../constants/topic-meta';
import type { HealthTipListItem } from '../types';

type HealthTipCardProps = {
  tip: HealthTipListItem;
  onPress?: (tip: HealthTipListItem) => void;
};

export const HealthTipCard = memo(function HealthTipCard({
  tip,
  onPress,
}: HealthTipCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const topicMeta = getHealthTipTopicMeta(tip.topic);

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
    <Card className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm">
      <View className="flex-row gap-3">
        <Avatar alt={tip.author_name} className="h-12 w-12">
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
          <View className="flex-row items-start justify-between gap-2">
            <Text
              numberOfLines={1}
              className="flex-1 text-lg font-semibold leading-6 text-foreground"
            >
              {tip.title}
            </Text>
            <Text className="text-xs font-medium text-muted-foreground">
              {readTimeLabel}
            </Text>
          </View>

          <View
            className={`w-20 min-w-20 rounded-full px-2 py-1 dark:bg-emerald-900/30`}
            style={{
              backgroundColor: isDark ? 'rgb(6 78 59 / 0.3)' : '#d1fae5',
            }}
          >
            <Text className="text-center text-xs font-medium capitalize tracking-wide text-emerald-700 dark:text-emerald-300">
              {topicMeta.label}
            </Text>
          </View>

          <Text
            className="mt-2 text-sm leading-5 text-black/80 dark:text-white/80"
            numberOfLines={2}
          >
            {tip.excerpt ?? 'Tap to learn more about this wellness insight.'}
          </Text>

          <Text className="mt-2 text-xs capitalize tracking-[0.1rem] text-muted-foreground">
            By {tip.author_name}
          </Text>

          <Pressable
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={`Read more about ${tip.title}`}
            disabled={!readMoreActive}
            className="mt-2 flex-row items-center gap-1"
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
