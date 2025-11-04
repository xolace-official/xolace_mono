// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/campfire-card.tsx
import { View, Pressable } from 'react-native';
import { Text, Button } from '@xolacekit/ui';
import { CampfireAvatar } from './campfire-avatar';
import { PurposeBadge } from './purppose-bagde';
import type { Campfire } from '../../../app/(app)/(protected)/(drawer)/(tabs)/discovery';

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
  };

  return (
    <Pressable 
      onPress={handleCardPress}
      className="active:opacity-80"
    >
      <View className="flex-row items-start">
        <CampfireAvatar avatar={campfire.avatar} imageUri={campfire.imageUri} />
        
        <View className="flex-1 ml-4">
          <Text className="mb-1 text-lg font-semibold text-foreground">
            {campfire.name}
          </Text>
          
          <Text 
            className="mb-2 text-sm text-muted-foreground"
            numberOfLines={2}
          >
            {campfire.description}
          </Text>
          <View className="flex-row items-center gap-3">         
          <PurposeBadge purpose={campfire.purpose} />
          
          <Text className="text-sm text-muted-foreground">
            {campfire.memberCount} {campfire.memberCount === 1 ? 'member' : 'members'}
          </Text>
          </View>
        </View>

        {!campfire.joined && (
          <Button
            onPress={handleJoin}
            className="px-6 ml-2 rounded-full bg-primary"
            size="sm"
          >
            <Text className="font-medium text-primary-foreground">Join</Text>
          </Button>
        )}
      </View>
    </Pressable>
  );
}