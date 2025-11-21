import { Pressable, View } from 'react-native';
import { Bell, Plus } from 'lucide-react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Text,
  cn,
} from '@xolacekit/ui';

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
    <View className="absolute left-0 right-0 top-0 z-20 px-4 pt-8">
      <View className="flex-row items-center gap-3 rounded-full border border-border/70 bg-background/95 px-3 py-2 shadow-md">
        <Avatar className="h-9 w-9 bg-primary/10">
          {campfire.iconURL ? (
            <AvatarImage source={{ uri: campfire.iconURL }} />
          ) : null}
          <AvatarFallback>🔥</AvatarFallback>
        </Avatar>
        <Text
          className="flex-1 text-sm font-semibold text-foreground"
          numberOfLines={1}
        >
          {campfire.name}
        </Text>
        <Pressable
          onPress={isMember ? onMembershipPress : onJoinPress}
          className={cn(
            'flex-row items-center rounded-full px-3 py-1.5',
            isMember ? 'border border-primary/50' : 'bg-primary',
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
