import { Star } from 'lucide-react-native';
import { View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Text,
} from '@xolacekit/ui';

import type { CampfireDetails } from '../types';

export function CampfireRoleCard({ campfire }: { campfire: CampfireDetails }) {
  const roleLabel =
    campfire.memberRole === 'firestarter'
      ? 'Firestarter'
      : campfire.memberRole === 'firekeeper'
        ? 'Firekeeper'
        : 'Camper';

  return (
    <View className="rounded-3xl border border-border/60 bg-card/90 p-4">
      <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your role in this campfire
      </Text>

      {campfire.isMember ? (
        <View className="mt-3 flex-row items-center gap-3">
          <Avatar alt="you" className="h-12 w-12 bg-primary/10">
            <AvatarImage source={{ uri: campfire.iconURL }} />
            <AvatarFallback>
              <Text>🔥</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground">You</Text>
            <View className="mt-1 flex-row items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full border-0 bg-primary/10 px-2 py-1"
              >
                <Text className="text-xs font-semibold text-primary">
                  {roleLabel}
                </Text>
              </Badge>
              {campfire.isFavorite ? (
                <View className="flex-row items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1">
                  <Star size={12} color="#fbbf24" />
                  <Text className="text-xs font-semibold text-amber-400">
                    Favorite
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View className="rounded-full bg-primary/10 px-3 py-1">
            <Text className="text-xs font-semibold text-primary">Online</Text>
          </View>
        </View>
      ) : (
        <Text className="mt-2 text-sm text-muted-foreground">
          You’re not a camper yet. Join to participate.
        </Text>
      )}
    </View>
  );
}
