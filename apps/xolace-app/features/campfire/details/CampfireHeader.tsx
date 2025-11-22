import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, View } from 'react-native';
import { Check, Plus } from 'lucide-react-native';

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
          joined
            ? 'border border-primary/40 bg-primary/5'
            : 'bg-primary',
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
    <View style={{ height: CAMPFIRE_HEADER_HEIGHT }}
      className="absolute inset-x-0 top-0 z-20">
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
            className="w-full h-full"
          >
            <Glow />
          </LinearGradient>
        )}

        <View className="absolute inset-x-0 top-0 px-4 pt-12">
          <CampfireHeaderTopBar onBack={router.back} />
        </View>
      </View>

      {
        showProfileCard && (
          <View className="px-4 -mt-6 ">
        <View className="px-4 py-2 shadow-lg rounded-3xl bg-background/95 shadow-black/10 dark:bg-zinc-900/95">
          <View className="flex-row items-center gap-3">
            <Avatar alt='avatar' className="h-14 w-14 bg-primary/10">
                <AvatarImage source={{ uri: campfire.iconURL }} />
              <AvatarFallback>
                <Text>🔥</Text>
              </AvatarFallback>
            </Avatar>

            <View className="flex-1">
              <Text className="text-sm font-bold text-foreground">
                {campfire.name}
              </Text>
              <Text className="text-[10px] text-muted-foreground">
                {formatMembers(campfire.members)} campers · {purposeLabel}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              {memberRole !== 'camper' ? (
                <Button
                  size="xs"
                  variant="secondary"
                  className="px-2 rounded-full shadow-sm bg-primary"
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

          <View className="flex-row items-center gap-3 mt-1">
            <View className="px-3 py-1 rounded-full bg-muted/60">
              <Text className="text-[10px] tracking-wide uppercase text-muted-foreground">
                {campfire.visibility} campfire
              </Text>
            </View>
            {campfire.isFavorite ? (
              <View className="px-3 py-1 rounded-full bg-primary/10">
                <Text className="text-[10px] font-medium text-primary">
                  Favorite
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
        )
      }

    </View>
  );
}
function GradientOverlay() {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.7)']}
      className="w-full h-full"
    />
  );
}

function Glow() {
  return (
    <View className="absolute inset-0">
      <View className="absolute h-20 rounded-full inset-x-16 top-10 bg-orange-400/30 blur-3xl" />
      <View className="absolute rounded-full inset-x-10 bottom-4 h-28 bg-amber-500/20 blur-3xl" />
    </View>
  );
}
