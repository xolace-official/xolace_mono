import { View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Text,
  getInitials,
} from '@xolacekit/ui';

import type { GlimpseVisibility } from '../../features/glimpse/types';

interface VideoCardAuthorProps {
  name: string;
  avatarUrl?: string;
  visibility: GlimpseVisibility;
}

export function VideoCardAuthor({
  name,
  avatarUrl,
  visibility,
}: VideoCardAuthorProps) {
  return (
    <View className="flex-row items-center gap-3">
      <Avatar alt={name} className="h-8 w-8">
        <AvatarImage source={{ uri: avatarUrl }} />
        <AvatarFallback className="bg-gradient-to-br from-[#0536ff] to-[#6a71ea]">
          <Text className="text-xs font-semibold text-white">
            {getInitials(name)}
          </Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{name}</Text>
        <Text className="text-sm capitalize text-muted-foreground">
          {visibility}
        </Text>
      </View>
    </View>
  );
}
