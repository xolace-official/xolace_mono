import { useMemo } from 'react';

import { Pressable, View } from 'react-native';

import { useUser } from '@xolacekit/supabase';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Text,
  cn,
} from '@xolacekit/ui';

interface DrawerHeaderProps {
  isDarkMode?: boolean;
  onPressProfile: () => void;
}

export function DrawerHeader({
  isDarkMode = false,
  onPressProfile,
}: DrawerHeaderProps) {
  const { data: user, isLoading } = useUser();

  const displayName = useMemo(() => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name as string;
    }

    if (user?.email) {
      return user.email.split('@')[0] ?? 'Member';
    }

    return 'Guest';
  }, [user]);

  const avatarUrl = (user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture) as string | undefined;

  const initials = useMemo(() => {
    const source =
      user?.user_metadata?.full_name ??
      user?.user_metadata?.nickname ??
      user?.email ??
      'GU';

    return source
      .split(' ')
      .map((segment: string) => segment.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }, [user]);

  return (
    <View
      className={cn(
        'mx-2 mb-5 rounded-3xl border px-4 py-6',
        isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5',
      )}
    >
      <View className="flex-row items-center gap-4">
        <Avatar alt={displayName} className="h-14 w-14 border border-white/20">
          {avatarUrl ? <AvatarImage source={{ uri: avatarUrl }} /> : null}
          <AvatarFallback className="bg-black/10 text-lg font-semibold uppercase">
            <Text>{initials}</Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1">
          <Text
            className={cn(
              'text-lg font-semibold',
              isDarkMode ? 'text-white' : 'text-gray-800',
            )}
            numberOfLines={1}
          >
            {isLoading ? 'Loading…' : displayName}
          </Text>
          {user?.email ? (
            <Text
              className={cn(
                'text-sm',
                isDarkMode ? 'text-white/70' : 'text-gray-500',
              )}
              numberOfLines={1}
            >
              {user.email}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <Badge
          className={cn(
            'rounded-full px-3 py-1',
            isDarkMode ? 'bg-white/20' : 'bg-gray-900/5',
          )}
          variant="outline"
        >
          <Text
            className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              isDarkMode ? 'text-white/80' : 'text-gray-600',
            )}
          >
            {user ? 'Active member' : 'Guest access'}
          </Text>
        </Badge>

        <Pressable
          accessibilityRole="button"
          onPress={onPressProfile}
          className="rounded-full bg-[#6366f1] px-3 py-1"
        >
          <Text className="text-xs font-semibold uppercase tracking-wide text-white">
            View profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
