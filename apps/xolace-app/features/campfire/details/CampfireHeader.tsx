import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Check, Plus } from 'lucide-react-native';
import { ImageBackground, Pressable, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Text,
  cn,
} from '@xolacekit/ui';

import { CampfireHeaderTopBar } from './CampfireHeaderTopBar';
import type { CampfireDetails, CampfireRole } from './types';

type CampfireHeaderProps = {
  campfire: CampfireDetails;
  isMember: boolean;
  memberRole: CampfireRole;
  showProfileCard?: boolean;
  onToggleJoin: () => void;
  onOpenMembership: () => void;
  onOpenModTools?: () => void;
};

const purposeLabels: Record<string, string> = {
  general_discussion: 'General discussion',
  support: 'Support',
  education: 'Education',
  other: 'Campfire vibes',
};

const formatMembers = (members: number) => {
  if (members >= 1_000_000) return `${(members / 1_000_000).toFixed(1)}M`;
  if (members >= 1_000) return `${(members / 1_000).toFixed(1)}K`;
  return `${members}`;
};

const BANNER_HEIGHT = 100;
export const CAMPFIRE_HEADER_HEIGHT = BANNER_HEIGHT;

export function CampfireHeader({
  campfire,
  isMember,
  memberRole,
  showProfileCard = true,
  onToggleJoin,
  onOpenMembership,
  onOpenModTools,
}: CampfireHeaderProps) {
  const router = useRouter();
  const purposeLabel = purposeLabels[campfire.purpose] ?? 'Campfire';

  const renderJoinButton = () => {
    const joined = !isMember;
    const label = joined ? 'Joined' : 'Join';
    const Icon = joined ? Check : Plus;

    const handlePress = () => {
      if (joined) {
        onOpenMembership();
        return;
      }
      onToggleJoin();
    };

    return (
      <Pressable
        onPress={handlePress}
        className={cn(
          'flex-row items-center justify-center rounded-full px-2 py-2',
          joined ? 'border-primary/40 bg-primary/5 border' : 'bg-primary',
        )}
      >
        <Icon size={13} color={joined ? '#f97316' : '#fff'} />
        <Text
          className={cn(
            'ml-1 text-xs font-semibold',
            joined ? 'text-primary' : 'text-primary-foreground',
          )}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{ height: CAMPFIRE_HEADER_HEIGHT }}
      className="absolute inset-x-0 top-0 z-20"
    >
      <View style={{ height: BANNER_HEIGHT }} className="overflow-hidden">
        {campfire.bannerUrl ? (
          <ImageBackground
            source={{ uri: campfire.bannerUrl }}
            resizeMode="cover"
            style={{ width: '100%', height: BANNER_HEIGHT }}
          >
            <GradientOverlay />
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={['#0c0d1a', '#1f2736', '#2c1f32']}
            className="h-full w-full"
          >
            <Glow />
          </LinearGradient>
        )}

        <View className="absolute inset-x-0 top-0 px-4 pt-12">
          <CampfireHeaderTopBar onBack={router.back} />
        </View>
      </View>

      {showProfileCard && (
        <View className="-mt-5 px-4">
          <View className="bg-background/95 rounded-3xl px-4 py-2 shadow-lg shadow-black/10 dark:bg-zinc-900/95">
            <View className="flex-row items-center gap-3">
              <Avatar alt="avatar" className="bg-primary/10 h-14 w-14">
                <AvatarImage source={{ uri: campfire.iconURL }} />
                <AvatarFallback>
                  <Text>🔥</Text>
                </AvatarFallback>
              </Avatar>

              <View className="flex-1">
                <Text className="text-foreground text-sm font-bold">
                  {campfire.name}
                </Text>
                <Text className="text-muted-foreground text-[10px]">
                  {formatMembers(campfire.members)} campers · {purposeLabel}
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                {memberRole !== 'camper' ? (
                  <Button
                    size="xs"
                    variant="secondary"
                    className="bg-primary rounded-full px-2 shadow-sm"
                    onPress={onOpenModTools}
                  >
                    <Text className="text-xs font-semibold text-white">
                      Mod Tools
                    </Text>
                  </Button>
                ) : null}
                {memberRole === 'firestarter' && renderJoinButton()}
              </View>
            </View>

            <View className="mt-1 flex-row items-center gap-3">
              <View className="bg-muted/60 rounded-full px-3 py-1">
                <Text className="text-muted-foreground text-[10px] tracking-wide uppercase">
                  {campfire.visibility} campfire
                </Text>
              </View>
              {campfire.isFavorite ? (
                <View className="bg-primary/10 rounded-full px-3 py-1">
                  <Text className="text-primary text-[10px] font-medium">
                    Favorite
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
function GradientOverlay() {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.7)']}
      className="h-full w-full"
    />
  );
}

function Glow() {
  return (
    <View className="absolute inset-0">
      <View className="absolute inset-x-16 top-10 h-20 rounded-full bg-orange-400/30 blur-3xl" />
      <View className="absolute inset-x-10 bottom-4 h-28 rounded-full bg-amber-500/20 blur-3xl" />
    </View>
  );
}
