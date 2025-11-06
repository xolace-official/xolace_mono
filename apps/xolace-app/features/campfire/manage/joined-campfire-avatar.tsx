import { Avatar, AvatarFallback, AvatarImage, Text } from '@xolacekit/ui';

interface JoinedCampfireAvatarProps {
  imageUri?: string;
  name: string;
}

export function JoinedCampfireAvatar({
  imageUri,
  name,
}: JoinedCampfireAvatarProps) {
  const getInitials = (text: string) => {
    const words = text.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <Avatar alt={'campfire'} className="h-10 w-10">
        <AvatarImage source={{ uri: imageUri }} />
        <AvatarFallback className="bg-[#6a71ea]">
          <Text className={'text-base font-semibold text-white'}>
            {getInitials(name)}
          </Text>
        </AvatarFallback>
      </Avatar>
    </>
  );
}
