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

export function CampfireHeader({
  campfire,
  isMember,
  memberRole,
  onToggleJoin,
  onOpenMembership,
  onOpenModTools,
}: CampfireHeaderProps) {
  const router = useRouter();
  const purposeLabel = purposeLabels[campfire.purpose] ?? 'Campfire';

  const renderJoinButton = () => {
    const joined = isMember;
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
          'flex-row items-center justify-center rounded-full px-4 py-2',
          joined
            ? 'border border-primary/40 bg-primary/5'
            : 'bg-primary',
        )}
      >
        <Icon size={16} color={joined ? '#f97316' : '#0b0b0c'} />
        <Text
          className={cn(
            'ml-2 text-sm font-semibold',
            joined ? 'text-primary' : 'text-primary-foreground',
          )}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="mb-6">
      <View className="h-[220px] w-full overflow-hidden rounded-b-3xl">
        {campfire.bannerUrl ? (
          <ImageBackground
            source={{ uri: campfire.bannerUrl }}
            resizeMode="cover"
            className="h-full w-full"
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

        <View className="absolute left-0 right-0 top-0 px-4 pt-10">
          <CampfireHeaderTopBar onBack={router.back} />
        </View>
      </View>

      <View className="-mt-10 px-4">
        <View className="rounded-3xl border border-border/60 bg-card/90 p-4 shadow-lg shadow-black/30">
          <View className="flex-row items-center gap-3">
            <Avatar className="h-14 w-14 bg-primary/10">
              {campfire.iconURL ? (
                <AvatarImage source={{ uri: campfire.iconURL }} />
              ) : null}
              <AvatarFallback>🔥</AvatarFallback>
            </Avatar>

            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">
                {campfire.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {formatMembers(campfire.members)} campers · {purposeLabel}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              {memberRole !== 'camper' ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-primary/10 px-3 py-2"
                  onPress={onOpenModTools}
                >
                  <Text className="text-sm font-semibold text-primary">
                    Mod Tools
                  </Text>
                </Button>
              ) : null}
              {renderJoinButton()}
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-3">
            <View className="rounded-full bg-muted/60 px-3 py-1">
              <Text className="text-xs uppercase tracking-wide text-muted-foreground">
                {campfire.visibility} campfire
              </Text>
            </View>
            {campfire.isFavorite ? (
              <View className="rounded-full bg-primary/10 px-3 py-1">
                <Text className="text-xs font-medium text-primary">
                  Favorite
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

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
