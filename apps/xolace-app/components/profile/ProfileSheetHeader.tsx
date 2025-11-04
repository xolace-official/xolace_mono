import { memo } from 'react';

//import { ArrowDown01, LayoutGrid } from 'lucide-react-native';
import { BottomSheetHandle, useBottomSheet } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Text,
  cn,
} from '@xolacekit/ui';
import { useColorScheme } from '@xolacekit/ui';
import { NAV_THEME } from '@xolacekit/ui';

import type { ProfileData } from '../../lib/dummy-data/profile';

interface ProfileSheetHeaderProps {
  profile: ProfileData;
  isDarkMode: boolean;
  isExpanded: boolean;
}

function ProfileSheetHeaderComponent({
  profile,
  isDarkMode,
}: ProfileSheetHeaderProps) {
  const { colorScheme } = useColorScheme();
  const { animatedIndex, animatedPosition } = useBottomSheet();

  // const containerStyle = useAnimatedStyle(() => {
  //   const paddingTop = interpolate(
  //     isExpanded ? 1 : 0,
  //     [0, 1],
  //     [8, 16],
  //     Extrapolation.CLAMP,
  //   );

  //   return {
  //     paddingTop: withTiming(paddingTop, { duration: 300 }),
  //   };
  // });

  // const profileSectionStyle = useAnimatedStyle(() => {
  //   const marginTop = interpolate(
  //     isExpanded ? 1 : 0,
  //     [0, 1],
  //     [-40, 8],
  //     Extrapolation.CLAMP,
  //   );

  //   return {
  //     marginTop: withTiming(marginTop, { duration: 300 }),
  //   };
  // });

  // const avatarContainerStyle = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     isExpanded ? 1 : 0,
  //     [0, 1],
  //     [1, 0.7],
  //     Extrapolation.CLAMP,
  //   );

  //   return {
  //     transform: [{ scale: withTiming(scale, { duration: 300 }) }],
  //   };
  // });

  return (
    <Animated.View style={[styles.container]} className={cn('gap-6')}>
      <BottomSheetHandle
        style={styles.handleContainer}
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        indicatorStyle={{
          backgroundColor:
            colorScheme === 'dark'
              ? `${NAV_THEME.dark.colors.background}`
              : '#f1f5f9',
        }}
      />

      <View
        className={cn(
          'flex-row items-start gap-4 rounded-3xl border px-5 py-5',
          isDarkMode
            ? 'border-white/10 bg-white/5'
            : 'border-gray-200 bg-white',
        )}
      >
        <Avatar alt={profile.displayName} className="h-20 w-20">
          <AvatarImage source={{ uri: profile.avatarUrl }} />
          <AvatarFallback className="items-center justify-center bg-gray-200">
            <Text className="text-lg font-semibold uppercase text-gray-700">
              {profile.displayName.slice(0, 2)}
            </Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1">
          <View className="flex-row flex-wrap items-center gap-x-2">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.displayName}
            </Text>
            {profile.roleBadge ? (
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full px-2.5 py-0.5',
                  isDarkMode
                    ? 'border-white/20 bg-white/10'
                    : 'border-gray-200',
                )}
              >
                <Text className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-white/80">
                  {profile.roleBadge}
                </Text>
              </Badge>
            ) : null}
          </View>

          <Text className="mt-1 text-sm text-gray-500 dark:text-white/60">
            {profile.handle}
          </Text>

          <Text className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/50">
            {profile.statusText}
          </Text>

          {/* <Text className="mt-2 text-base leading-relaxed text-gray-700 dark:text-white/70">
            {profile.bio}
          </Text> */}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  handleContainer: {
    paddingVertical: 8,
    flex: 1,
  },
});

export const ProfileSheetHeader = memo(ProfileSheetHeaderComponent);
