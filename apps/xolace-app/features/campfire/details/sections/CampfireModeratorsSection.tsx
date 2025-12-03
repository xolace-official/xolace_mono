import { Shield } from 'lucide-react-native';
import { View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Text,
} from '@xolacekit/ui';

import type { CampfireModerator } from '../types';

type CampfireModeratorsSectionProps = {
  moderators: CampfireModerator[];
};

export function CampfireModeratorsSection({
  moderators,
}: CampfireModeratorsSectionProps) {
  if (!moderators.length) return null;

  return (
    <View className="border-border/60 bg-card/90 rounded-3xl border p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Shield size={16} color="#94a3b8" />
          <Text className="text-foreground text-sm font-semibold">
            Firestarters & Firekeepers
          </Text>
        </View>
        <Button
          size={'sm'}
          variant="secondary"
          className="rounded-full px-3 py-1"
        >
          <Text className="text-foreground text-xs font-semibold">
            Message team
          </Text>
        </Button>
      </View>

      <View className="mt-3 gap-1">
        {moderators.map((moderator) => (
          <View
            key={moderator.id}
            className="bg-muted/10 flex-row items-center gap-3 rounded-2xl px-3 py-2"
          >
            <Avatar alt={moderator.name} className="bg-primary/10 h-10 w-10">
              <AvatarImage source={{ uri: moderator.avatarUrl }} />
              <AvatarFallback>
                <Text>🔥</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <Text className="text-foreground text-sm font-semibold">
                {moderator.name}
              </Text>
              <Text className="text-muted-foreground text-xs capitalize">
                {moderator.role}
              </Text>
            </View>
            <Badge
              variant="secondary"
              className="bg-primary/10 rounded-full px-2 py-1"
            >
              <Text className="text-primary text-xs font-semibold">
                {moderator.role === 'firestarter'
                  ? 'Firestarter'
                  : 'Firekeeper'}
              </Text>
            </Badge>
          </View>
        ))}
      </View>
    </View>
  );
}
