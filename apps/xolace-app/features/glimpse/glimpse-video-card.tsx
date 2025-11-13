// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-video-card.tsx
import { Image } from 'expo-image';
import { Heart, Link2 } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@xolacekit/ui';

import { VideoCardAuthor } from '../../components/glimpse/video-card-author';
import { VideoCardDuration } from '../../components/glimpse/video-card-duration';
import { useVideoCardActions } from '../../hooks/glimpse/use-video-card-actions';
import type { GlimpseVideo } from './types';

interface GlimpseVideoCardProps {
  video: GlimpseVideo;
}

export function GlimpseVideoCard({ video }: GlimpseVideoCardProps) {
  const { handleCardPress, handleCopyLink, copied } = useVideoCardActions(
    video.id,
  );

  return (
    <Pressable
      onPress={handleCardPress}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white active:opacity-90 dark:border-white/10 dark:bg-white/5"
      style={styles.card}
    >
      {/* Thumbnail */}
      <View className="relative">
        <Image
          source={{ uri: video.thumbnailUrl }}
          style={{ width: '100%', height: 250 }}
          contentFit="cover"
        />

        <VideoCardDuration duration={video.duration} />

        {/* Copy Link Button */}
        <Pressable
          onPress={handleCopyLink}
          className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 active:opacity-70"
        >
          <Link2 size={18} color={copied ? '#22c55e' : '#ffffff'} />
        </Pressable>
      </View>

      {/* Content */}
      <View className="gap-1 px-4 py-3">
        <VideoCardAuthor
          name={video.authorName}
          avatarUrl={video.authorAvatarUrl}
          visibility={video.visibility}
        />

        <Text
          className="text-lg font-semibold text-foreground"
          numberOfLines={2}
        >
          {video.title} - {formatDate(video.createdAt)}
        </Text>

        {/* Stats */}
        <View className="flex-row items-center">
          <View className="flex-row items-center gap-1.5">
            <Heart
              size={16}
              className="text-rose-500"
              fill="#f43f5e"
              color={'#f43f5e'}
            />
            <Text className="text-sm font-medium text-foreground">
              {video.likesCount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}
