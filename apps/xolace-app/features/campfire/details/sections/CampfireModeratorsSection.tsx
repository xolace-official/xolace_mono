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
    <View className="p-4 border rounded-3xl border-border/60 bg-card/90">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Shield size={16} color="#94a3b8" />
          <Text className="text-sm font-semibold text-foreground">
            Firestarters & Firekeepers
          </Text>
        </View>
        <Button size={'sm'} variant="secondary" className="px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-foreground">
            Message team
          </Text>
        </Button>
      </View>

      <View className="gap-1 mt-3">
        {moderators.map((moderator) => (
          <View
            key={moderator.id}
            className="flex-row items-center gap-3 px-3 py-2 rounded-2xl bg-muted/10"
          >
            <Avatar alt={moderator.name} className="w-10 h-10 bg-primary/10">
              <AvatarImage source={{ uri: moderator.avatarUrl }} />
              <AvatarFallback>
                <Text>🔥</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground">
                {moderator.name}
              </Text>
              <Text className="text-xs capitalize text-muted-foreground">
                {moderator.role}
              </Text>
            </View>
            <Badge
              variant="secondary"
              className="px-2 py-1 rounded-full bg-primary/10"
            >
              <Text className="text-xs font-semibold text-primary">
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
