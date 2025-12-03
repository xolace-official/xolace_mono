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
    <View className="border-border/60 bg-card/90 rounded-3xl border p-4">
      <Text className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Your role in this campfire
      </Text>

      {campfire.isMember ? (
        <View className="mt-3 flex-row items-center gap-3">
          <Avatar alt="you" className="bg-primary/10 h-12 w-12">
            <AvatarImage source={{ uri: campfire.iconURL }} />
            <AvatarFallback>
              <Text>🔥</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="text-foreground text-base font-semibold">You</Text>
            <View className="mt-1 flex-row items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 rounded-full border-0 px-2 py-1"
              >
                <Text className="text-primary text-xs font-semibold">
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
          <View className="bg-primary/10 rounded-full px-3 py-1">
            <Text className="text-primary text-xs font-semibold">Online</Text>
          </View>
        </View>
      ) : (
        <Text className="text-muted-foreground mt-2 text-sm">
          You’re not a camper yet. Join to participate.
        </Text>
      )}
    </View>
  );
}
