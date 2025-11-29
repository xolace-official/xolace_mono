import { Bell, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage, Text, cn } from '@xolacekit/ui';

import type { CampfireDetails } from './types';

type CampfireCondensedBarProps = {
  visible: boolean;
  campfire: CampfireDetails;
  isMember: boolean;
  onJoinPress: () => void;
  onMembershipPress: () => void;
};

export function CampfireCondensedBar({
  visible,
  campfire,
  isMember,
  onJoinPress,
  onMembershipPress,
}: CampfireCondensedBarProps) {
  if (!visible) return null;

  return (
    <View className="absolute top-0 right-0 left-0 z-20 px-4 pt-8">
      <View className="border-border/70 bg-background/95 flex-row items-center gap-3 rounded-full border px-3 py-2 shadow-md">
        <Avatar alt="avatar" className="bg-primary/10 h-9 w-9">
          <AvatarImage source={{ uri: campfire.iconURL }} />
          <AvatarFallback>
            <Text>🔥</Text>
          </AvatarFallback>
        </Avatar>
        <Text
          className="text-foreground flex-1 text-sm font-semibold"
          numberOfLines={1}
        >
          {campfire.name}
        </Text>
        <Pressable
          onPress={isMember ? onMembershipPress : onJoinPress}
          className={cn(
            'flex-row items-center rounded-full px-3 py-1.5',
            isMember ? 'border-primary/50 border' : 'bg-primary',
          )}
        >
          {isMember ? (
            <Bell size={14} color="#f97316" />
          ) : (
            <Plus size={14} color="#0b0b0c" />
          )}
          <Text
            className={cn(
              'ml-1.5 text-xs font-semibold',
              isMember ? 'text-primary' : 'text-primary-foreground',
            )}
          >
            {isMember ? 'Joined' : 'Join'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
