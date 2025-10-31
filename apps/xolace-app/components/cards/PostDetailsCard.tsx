import { useEffect, useState } from 'react';

import {
  Angry,
  Brain,
  Camera,
  CloudRain,
  Coffee,
  Frown,
  Heart,
  Laugh,
  Meh,
  Moon,
  Music,
  Palette,
  Smile,
  Star,
  Sun,
  Zap,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Stack } from 'expo-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Badge,
  cn,
  Text
} from '@xolacekit/ui';

import dummyPosts from '../../lib/dummy-data/post';

// TODO: Import these when ready
// import { SaveToCollectionsButton } from '../shared/save-to-collections-button';
// import { PostDropdown } from '../shared/post-dropdown';
// import { CarouselPost } from '../shared/carousel-post';

// Mood icons mapping
const moodIcons: Record<string, any> = {
  happy: Smile,
  excited: Zap,
  thoughtful: Brain,
  chill: Coffee,
  grateful: Heart,
  sad: Frown,
  angry: Angry,
  neutral: Meh,
  laughing: Laugh,
  inspired: Star,
  energetic: Sun,
  peaceful: Moon,
  melancholy: CloudRain,
  creative: Palette,
  nostalgic: Camera,
  motivated: Music,
};

// Mood colors mapping
const moodColors: Record<string, string> = {
  happy: 'bg-yellow-400',
  excited: 'bg-orange-400',
  thoughtful: 'bg-purple-400',
  chill: 'bg-blue-400',
  grateful: 'bg-pink-400',
  sad: 'bg-slate-400',
  angry: 'bg-red-400',
  neutral: 'bg-gray-400',
  laughing: 'bg-emerald-400',
  inspired: 'bg-amber-400',
  energetic: 'bg-lime-400',
  peaceful: 'bg-indigo-400',
  melancholy: 'bg-cyan-400',
  creative: 'bg-violet-400',
  nostalgic: 'bg-rose-400',
  motivated: 'bg-teal-400',
};

// Types
// interface DetailPost {
//   id: string;
//   created_at: string;
//   content: string;
//   author_name: string;
//   author_avatar_url?: string | null;
//   created_by: string;
//   posttags: Array<{ tags: { name: string } }>;
//   mood: string;
//   type: 'single' | 'carousel';
//   post_slides?: Array<{ content: string; slide_index: number }>;
//   author_roles: string[];
//   campfires?: {
//     name: string;
//     icon_url?: string | null;
//     slug: string;
//   } | null;
//   views: Array<{ count: number }>;
//   collections?: any[];
//   expires_in_24hr?: boolean;
// }

// interface DetailCardProps {
//   postId: string;
//   post: DetailPost;
// }

// Helper function to format timestamp
const formatTimestamp = (date: string): string => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hr ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)} wks ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} mos ago`;
  return `${Math.floor(diffInSeconds / 31536000)} yrs ago`;
};

export function DetailCard() {
  // DUMMY DATA - Replace with actual user data
//   const currentUserId = 'dummy-user-id';
  const {created_at} = dummyPosts[0];

  // States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  // Format timestamp
  useEffect(() => {
    setTimestamp(formatTimestamp(created_at));
  }, [created_at]);

  const {
    content,
    author_name,
    author_avatar_url,
    posttags,
    mood,
    type,
    post_slides,
    author_roles,
    expires_in_24hr,
    views_count
  } = dummyPosts[0];

  const campfires = {
    name: 'Mental Health Support',
    icon_url: 'https://i.pravatar.cc/150?img=50',
    slug: 'mental-health-support',
  }

  // Determine badge eligibility
  const isProfessional = author_roles.includes('help_professional');
  const isMentor = author_roles.includes('mentor');
  const isVerified = author_roles.includes('verified');

  // Display values
  let displayName = author_name;
  let displayAvatarUrl = author_avatar_url;

  if (campfires) {
    displayName = campfires.name || author_name;
    displayAvatarUrl = campfires.icon_url || author_avatar_url;
  }

  const fallbackInitials = displayName.slice(0, 2).toUpperCase();
  const MoodIcon = moodIcons[mood] || Smile;

  return (
    <>
    <Stack.Screen
    options={{ title: `${displayName}`}}
    />
      <Card className="w-full border-0 rounded-none dark:bg-background">
        {/* Header */}
        <CardHeader className="flex-row items-start justify-between px-3 py-2">
          <View className="flex flex-row items-center gap-2">
            {/* Back button removed as per instruction - handled by header */}

            <Avatar alt={displayName}>
              <AvatarImage
                source={{ uri: displayAvatarUrl || undefined }}
              />
              <AvatarFallback className="bg-gradient-to-br from-[#0536ff] to-[#6a71ea]">
                <Text className="font-semibold text-white">
                  {fallbackInitials}
                </Text>
              </AvatarFallback>
            </Avatar>

            <View className="flex flex-col items-start justify-center">
              <View className="flex flex-row items-center gap-1">
                <Text className="text-sm tracking-tight text-default-400 dark:text-white">
                  {displayName}
                </Text>
                <View
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full',
                    moodColors[mood],
                  )}
                >
                  <MoodIcon size={12} color="white" />
                </View>
              </View>

              <View className="flex flex-row items-center gap-2">
                <Text className="text-sm text-zinc-500 dark:text-gray-400">
                  {timestamp}
                </Text>

                {isProfessional && (
                  <Badge className="py-[1px]">
                    <Text className="text-[10px] text-green-400">PROFESSIONAL</Text>
                  </Badge>
                )}

                {isMentor && (
                  <Badge className="py-[1px]">
                    <Text className="text-orange-400 text-[10px]">MENTOR</Text>
                  </Badge>
                )}

                {isVerified && (
                  <Badge className="py-[1px]">
                    <Text className="text-blue-400 text-[10px]">VERIFIED</Text>
                  </Badge>
                )}

                {campfires && (
                  <Badge className="py-[1px] ">
                    <Text className="text-purple-400 text-[10px]">CAMPFIRE</Text>
                  </Badge>
                )}
              </View>
            </View>
          </View>

          {/* TODO: Implement PostDropdown */}
          <Pressable onPress={() => setIsSheetOpen(true)}>
            <Text className="text-muted-foreground">⋮</Text>
          </Pressable>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-3">
          {type === 'carousel' ? (
            // TODO: Implement CarouselPost
            <View className="min-h-[200px] items-center justify-center">
              <Text className="text-muted-foreground">
                Carousel post (not implemented)
              </Text>
              <Text className="mt-2 text-sm text-gray-500">
                {post_slides?.length || 0} slides
              </Text>
            </View>
          ) : (
            <Text className="leading-relaxed whitespace-pre-wrap text-foreground">
              {content}
            </Text>
          )}

          {/* Tags */}
          {posttags && posttags.length > 0 && (
            <View className="flex flex-row flex-wrap gap-2 mt-4">
              {posttags.map((tag, index) => (
                <Badge key={`${tag.name}_${index}`} variant="secondary">
                  <Text className="text-xs">#{tag.name}</Text>
                </Badge>
              ))}
            </View>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            {expires_in_24hr && (
              <View className="flex items-center justify-center w-10 rounded-full h-7 bg-zinc-400 dark:bg-zinc-700">
                <Text className="text-sm">⏳</Text>
              </View>
            )}

            {/* TODO: Implement View component (views count) */}
            <View className="flex flex-row items-center gap-1">
              <Text className="text-sm">👁️</Text>
              <Text className="text-sm">{views_count || 0}</Text>
            </View>
          </View>

          {/* TODO: Implement SaveToCollectionsButton */}
          <Pressable onPress={() => console.log('Save to collections')}>
            <Text className="text-xl">🔖</Text>
          </Pressable>
        </CardFooter>
      </Card>

      {/* TODO: Implement Report Sheet/Modal */}
      {/* <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Report Post"
      >
        <ReportForm postId={postId} />
      </BottomSheet> */}
    </>
  );
}
