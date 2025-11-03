import { useMemo } from 'react';

import { Link } from 'expo-router';
import { ChevronRight, QrCode } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Text,
  cn,
} from '@xolacekit/ui';

export type UserClaims = {
  avatar_url?: string;
  email?: string;
  full_name?: string;
  id?: string;
  name?: string;
  picture?: string;
  preferred_username?: string;
  user_metadata?: Record<string, unknown> | null;
};

type SettingsProfileCardProps = {
  user: UserClaims | null | undefined;
};

export function SettingsProfileCard({ user }: SettingsProfileCardProps) {
  const { avatarUri, displayName, subtitle } = useMemo(() => {
    return extractUserSummary(user);
  }, [user]);

  const initials = useMemo(() => {
    const normalized = displayName.replace(/[^A-Za-z0-9 ]/g, ' ').trim();
    const parts = normalized.split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
      return displayName.slice(0, 2).toUpperCase();
    }

    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }, [displayName]);

  return (
    <Link asChild href={'/settings/profile'}>
      <Pressable
        className={
          'rounded-3xl border border-border bg-card p-4 active:opacity-80'
        }
      >
        <View className={'flex-row items-center gap-4'}>
          <Avatar alt="avatar" className={'h-16 w-16 border border-border/60'}>
            {avatarUri ? <AvatarImage source={{ uri: avatarUri }} /> : null}
            <AvatarFallback className={'bg-primary/10'}>
              <Text className={'text-lg font-semibold uppercase'}>
                {initials}
              </Text>
            </AvatarFallback>
          </Avatar>

          <View className={'flex-1 gap-1'}>
            <Text className={'text-lg font-semibold'}>{displayName}</Text>
            {subtitle ? (
              <Text className={'text-sm text-muted-foreground'}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          <View className={'items-end gap-3'}>
            <Badge
              variant={'outline'}
              className={'border-border/60 bg-muted/40 px-3 py-1'}
            >
              <Text className={'text-xs font-medium text-muted-foreground'}>
                Avatar
              </Text>
            </Badge>

            <QrCode color={'#a1a1aa'} size={20} />
          </View>

          <ChevronRight color={'#a1a1aa'} size={20} />
        </View>
      </Pressable>
    </Link>
  );
}

function extractUserSummary(user: UserClaims | null | undefined) {
  const readString = (value: unknown) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  };

  const metadata = (user?.user_metadata ?? undefined) as
    | Record<string, unknown>
    | undefined;

  const metadataString = (key: string) => readString(metadata?.[key]);

  const email = readString(user?.email);

  const displayName =
    metadataString('full_name') ??
    metadataString('name') ??
    metadataString('username') ??
    readString(user?.full_name) ??
    readString(user?.name) ??
    readString(user?.preferred_username) ??
    (email ? email.split('@')[0] : undefined) ??
    'Your profile';

  const subtitle =
    metadataString('status') ?? metadataString('headline') ?? email ?? null;

  const avatarUri =
    metadataString('avatar_url') ??
    metadataString('picture') ??
    readString(user?.avatar_url) ??
    readString(user?.picture) ??
    null;

  return { avatarUri, displayName, subtitle };
}
