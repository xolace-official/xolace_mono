import { memo, useMemo } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  NAV_THEME,
  Text,
  useColorScheme,
} from '@xolacekit/ui';

type HealthTipAuthorCardProps = {
  authorName: string;
  avatarUrl?: string | null;
  createdAt?: string | null;
  excerpt?: string | null;
};

export const HealthTipAuthorCard = memo(function HealthTipAuthorCard({
  authorName,
  avatarUrl,
  createdAt,
  excerpt,
}: HealthTipAuthorCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const initials = useMemo(() => {
    if (!authorName) {
      return 'XL';
    }
    return authorName
      .split(' ')
      .slice(0, 2)
      .map((segment) => segment[0])
      .join('')
      .toUpperCase();
  }, [authorName]);

  const publishedLabel = useMemo(() => {
    if (!createdAt) {
      return 'Recently published';
    }

    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch {
      return 'Recently published';
    }
  }, [createdAt]);

  return (
    <View
      className="mt-3 flex-row gap-4 rounded-3xl border p-4"
      style={{
        backgroundColor: isDark
          ? NAV_THEME.dark.colors.glass_background
          : NAV_THEME.light.colors.glass_background,
        borderColor: isDark
          ? NAV_THEME.dark.colors.glass_border
          : NAV_THEME.light.colors.glass_border,
      }}
    >
      <Avatar alt={authorName} className="h-14 w-14">
        {avatarUrl ? (
          <AvatarImage source={{ uri: avatarUrl }} />
        ) : (
          <AvatarFallback>
            <Text className="text-lg font-semibold text-foreground">
              {initials}
            </Text>
          </AvatarFallback>
        )}
      </Avatar>

      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">
          {authorName}
        </Text>
        <Text className="mt-0.5 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {publishedLabel}
        </Text>

        {excerpt ? (
          <Text className="mt-3 text-sm leading-5 text-muted-foreground">
            {excerpt}
          </Text>
        ) : null}

        <View
          className="mt-4 h-[1px] w-full"
          style={{
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : '#EAEDF5',
          }}
        />

        <Text className="mt-3 text-xs text-muted-foreground">
          Curated by the Xolace well-being team to give you small actions that
          protect your energy.
        </Text>
      </View>
    </View>
  );
});
