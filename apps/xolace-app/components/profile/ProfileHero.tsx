import { memo } from 'react';

import { StyleSheet, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';
import { Image } from 'expo-image';

interface ProfileHeroProps {
  coverImageUrl: string;
  topInset: number;
  isDarkMode: boolean;
}

function ProfileHeroComponent({
  coverImageUrl,
  topInset,
  isDarkMode,
}: ProfileHeroProps) {
  const heroHeight = 420;

  return (
    <View style={[styles.container, { height: heroHeight }]}>
      <Image
        source={{ uri: coverImageUrl }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={300}
      />

      <View
        className="absolute inset-0"
        style={{
          backgroundColor: isDarkMode
            ? 'rgba(2,6,23,0.55)'
            : 'rgba(15,23,42,0.35)',
        }}
      />

      <View
        className="flex-1 justify-between px-6"
        style={{ paddingTop: topInset + 16, paddingBottom: 24 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-black tracking-tight text-white">
            xolace
          </Text>

          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Text className="text-lg font-semibold text-white">+</Text>
            </View>
            <View className="h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Text className="text-lg font-semibold text-white">•</Text>
            </View>
          </View>
        </View>

        <View
          className={cn(
            'rounded-full px-4 py-1.5',
            isDarkMode ? 'bg-white/10' : 'bg-white/80',
          )}
        >
          <Text
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.18em]',
              isDarkMode ? 'text-white/80' : 'text-slate-800',
            )}
          >
            Profile
          </Text>
        </View>
      </View>
    </View>
  );
}

export const ProfileHero = memo(ProfileHeroComponent);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
});
