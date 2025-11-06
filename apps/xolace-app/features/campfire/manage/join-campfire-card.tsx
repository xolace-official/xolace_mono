// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/components/joined-campfire-card.tsx
import { Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text, useColorScheme } from '@xolacekit/ui';

import { JoinedCampfireAvatar } from './joined-campfire-avatar';
import type { UserCampfireFavoriteJoin } from './types';

interface JoinedCampfireCardProps {
  campfire: UserCampfireFavoriteJoin;
}

export function JoinedCampfireCard({ campfire }: JoinedCampfireCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleCardPress = () => {
    // Navigate to campfire detail
    console.log('Navigate to campfire:', campfire.campfireId);
  };

  const handleFavoriteToggle = () => {
    // Toggle favorite status
    console.log('Toggle favorite:', campfire.campfireId);
  };

  return (
    <Pressable onPress={handleCardPress} className="active:opacity-80">
      <View className="flex-row items-start">
        <JoinedCampfireAvatar
          imageUri={campfire.iconURL}
          name={campfire.name}
        />

        <View className="ml-4 flex-1">
          <Text className="mb-1 text-lg font-semibold text-foreground">
            {campfire.name}
          </Text>

          <Text
            className="mb-2 text-sm text-muted-foreground"
            numberOfLines={2}
          >
            {campfire.description}
          </Text>
        </View>

        <View className="ml-2 flex-row items-center gap-3">
          <Pressable
            onPress={handleFavoriteToggle}
            className="active:opacity-70"
          >
            <Star
              size={24}
              color={
                campfire.isFavorite ? '#facc15' : isDark ? '#71717a' : '#a1a1aa'
              }
              fill={campfire.isFavorite ? '#facc15' : 'transparent'}
            />
          </Pressable>

          <View className="rounded-full border border-border bg-muted/80 px-4 py-1.5">
            <Text className="text-xs font-medium text-muted-foreground">
              Joined
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
