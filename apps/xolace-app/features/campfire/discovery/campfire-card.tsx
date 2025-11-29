import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Button, Text } from '@xolacekit/ui';

import type { Campfire } from '../../../app/(app)/(protected)/(drawer)/(tabs)/(discovery)/discovery';
import { CampfireAvatar } from './campfire-avatar';
import { PurposeBadge } from './purpose-bagde';

interface CampfireCardProps {
  campfire: Campfire;
}

export function CampfireCard({ campfire }: CampfireCardProps) {
  const handleJoin = () => {
    // Implement join logic
    console.log('Join campfire:', campfire.id);
  };

  const handleCardPress = () => {
    // Navigate to campfire detail
    console.log('Navigate to campfire:', campfire.id);
    router.push(`../x/${campfire.slug}`);
  };

  return (
    <Pressable onPress={handleCardPress} className="active:opacity-80">
      <View className="flex-row items-start">
        <CampfireAvatar avatar={campfire.avatar} imageUri={campfire.imageUri} />

        <View className="ml-4 flex-1">
          <Text className="text-foreground mb-1 text-lg font-semibold">
            {campfire.name}
          </Text>

          <Text
            className="text-muted-foreground mb-2 text-sm"
            numberOfLines={2}
          >
            {campfire.description}
          </Text>
          <View className="flex-row items-center gap-3">
            <PurposeBadge purpose={campfire.purpose} />

            <Text className="text-muted-foreground text-sm">
              {campfire.memberCount}{' '}
              {campfire.memberCount === 1 ? 'member' : 'members'}
            </Text>
          </View>
        </View>

        {!campfire.joined && (
          <Button
            onPress={handleJoin}
            className="bg-primary ml-2 rounded-full px-6"
            size="sm"
          >
            <Text className="text-primary-foreground font-medium">Join</Text>
          </Button>
        )}
      </View>
    </Pressable>
  );
}
