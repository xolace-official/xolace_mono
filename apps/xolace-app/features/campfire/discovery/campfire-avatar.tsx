// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/campfire-avatar.tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@xolacekit/ui';

interface CampfireAvatarProps {
  avatar: string;
  imageUri?: string;
}

export function CampfireAvatar({ avatar, imageUri }: CampfireAvatarProps) {
  // Check if avatar is an emoji or text
  const isEmoji = /\p{Emoji}/u.test(avatar);

  return (
    // <View className="items-center justify-center border-2 rounded-full w-14 h-14 bg-primary/10 border-primary/20">
    //   <Text className={isEmoji ? "text-2xl" : "text-base font-semibold text-primary"}>
    //     {avatar}
    //   </Text>
    // </View>
    <>
      <Avatar alt={'campfire'} className="h-10 w-10">
        <AvatarImage source={{ uri: imageUri }} />
        <AvatarFallback className="bg-[#6a71ea]">
          <Text
            className={
              isEmoji ? 'text-2xl' : 'text-base font-semibold text-white'
            }
          >
            {avatar}
          </Text>
        </AvatarFallback>
      </Avatar>
    </>
  );
}
