// components/post/post-card.tsx
import * as React from 'react';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Clock, ScanEye, Smile, Zap, Brain, Coffee, Heart, Frown, Angry, Meh, Laugh, Star, Sun, Moon, CloudRain, Palette, Camera, Music } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardHeader, CardContent, CardFooter, Badge, Avatar, AvatarImage, AvatarFallback } from '@xolacekit/ui';
import { cn, Text } from '@xolacekit/ui';

import { PostMetrics } from '../shared/PostMetrics';
import { SinglePost } from '../shared/SinglePost';
// import { SimpleCarouselPost } from './simple-carousel-post'; // TODO: Implement carousel
// import { SaveToCollectionsButton } from '../shared/save-to-collections-button'; // TODO: Implement
// import { PostDropdown } from '../shared/post-dropdown'; // TODO: Implement
// import { PostCardMask } from '../shared/masks/post-card-mask'; // TODO: Implement

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
interface EnhancedPost {
    id: string;
    created_at: string;
    expires_at?: string | null;
    author_name: string;
    author_avatar_url?: string | null;
    author_roles: string[];
    campfire_name?: string | null;
    campfire_icon_url?: string | null;
    campfire_slug?: string | null;
    mood: string;
    type: 'single' | 'carousel';
    content: string;
    post_slides?: Array<{ content: string; slide_index: number }>;
    prompt_text?: string | null;
    posttags: Array<{ name: string }>;
    comments_count: number;
    upvotes: number;
    downvotes: number;
    views_count: number;
    created_by: string;
    collections?: any[];
    expires_in_24hr?: boolean;
    is_sensitive?: boolean;
    is_campfire_post?: boolean;
}

interface CampfireOverride {
    name: string;
    iconUrl?: string | null;
    slug?: string;
}

interface PostCardProps {
    className?: string;
    post: EnhancedPost;
    section?: 'profile';
    onClick?: () => void;
    signedUrls?: Record<string, string>;
    campfireOverride?: CampfireOverride;
}

// Helper function to format timestamp (simplified version)
const formatTimestamp = (date: string): string => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} wks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} mos ago`;
    return `${Math.floor(diffInSeconds / 31536000)} yrs ago`;
};

export function EnhancedPostCard({
                             className,
                             post,
                             onClick,
                             signedUrls,
                             campfireOverride,
                         }: PostCardProps) {
    // DUMMY DATA - Replace with actual user data
    const currentUserId = 'dummy-user-id';
    const showSensitiveContent = false;

    // States
    const [timestamp, setTimestamp] = useState('');
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [showDailyPrompt, setShowDailyPrompt] = useState(false);

    // Format timestamp
    React.useEffect(() => {
        setTimestamp(formatTimestamp(post.created_at));
    }, [post.created_at]);

    const timeLeft = post.expires_at
        ? formatDistanceToNow(new Date(post.expires_at), { addSuffix: true })
        : null;

    // Determine badge eligibility
    const isProfessional = post.author_roles.includes('help_professional');
    const isMentor = post.author_roles.includes('mentor');
    const isVerified = post.author_roles.includes('verified');

    // Display values
    const displayName = post.campfire_name || post.author_name;
    const avatarSrc =
        post.campfire_icon_url ||
        (post.author_avatar_url && signedUrls?.[post.author_avatar_url]) ||
        post.author_avatar_url ||
        undefined;
    const fallbackInitials = displayName.slice(0, 2).toUpperCase();
    const showOriginalAuthor = !!campfireOverride;

    // Mood icon component
    const MoodIcon = moodIcons[post.mood] || Smile;

    // Post metric data
    const postMetricData = {
        id: post.id,
        comments: [{ count: post.comments_count }],
        created_by: post.created_by,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
    };

    return (
        <Card className={cn('relative rounded-none border-x-0 pt-3', className)}>
            {/* Header */}
            <CardHeader className="flex-row items-start justify-between px-4 py-2">
                <View className="flex flex-row items-center gap-3">
                    <Avatar alt={'avatar'} >
                        <AvatarImage source={{ uri: avatarSrc }} />
                        <AvatarFallback className="bg-gradient-to-br from-[#0536ff] to-[#6a71ea]">
                            <Text className="text-white font-semibold">{fallbackInitials}</Text>
                        </AvatarFallback>
                    </Avatar>

                    <View className="flex flex-col items-start justify-center">
                        <View className="flex flex-row items-center gap-2">
                            {/* TODO: Implement navigation to campfire on press */}
                            <Pressable onPress={() => console.log('Navigate to campfire/profile')}>
                                <Text className="text-foreground font-semibold">{displayName}</Text>
                            </Pressable>

                            <View className={cn('h-5 w-5 flex items-center justify-center rounded-full', moodColors[post.mood])}>
                                <MoodIcon size={12} color="white" />
                            </View>

                            {/*{isProfessional && !campfireOverride && (*/}
                            {/*    <Image*/}
                            {/*        source={require('../../assets/images/badges/professional-badge.png')}*/}
                            {/*        style={{ width: 20, height: 20 }}*/}
                            {/*        resizeMode="contain"*/}
                            {/*    />*/}
                            {/*)}*/}
                        </View>

                        <View className="flex flex-row items-center gap-2">
                            {showOriginalAuthor && (
                                <Text className="text-[11px] text-zinc-400 dark:text-gray-500">
                                    by {post.author_name} •
                                </Text>
                            )}
                            <Text className="text-[13px] text-zinc-500 dark:text-gray-400">{timestamp}</Text>

                            {isProfessional && !campfireOverride && (
                                <Badge className=" py-[1px]">
                                    <Text className="text-green-400 text-[10px]">PROFESSIONAL</Text>
                                </Badge>
                            )}

                            {isMentor && !campfireOverride && (
                                <Badge variant="secondary" className=" py-[1px]">
                                    <Text className="text-orange-400 text-[10px]">MENTOR</Text>
                                </Badge>
                            )}

                            {isVerified && !campfireOverride && (
                                <Badge variant="secondary" className=" py-[1px]">
                                    <Text className="text-blue-400 text-[10px]">VERIFIED</Text>
                                </Badge>
                            )}

                            {post.is_campfire_post && (
                                <Badge variant="secondary" className=" py-[1px]">
                                    <Text className="text-purple-400 text-[10px]">CAMPFIRE</Text>
                                </Badge>
                            )}

                            {timeLeft && (
                                <Badge variant="secondary" className="text-[10px] py-[1px]">
                                    <View className="flex flex-row items-center gap-1">
                                        <Clock size={12} color="currentColor" />
                                        <Text className="text-[10px]">{timeLeft}</Text>
                                    </View>
                                </Badge>
                            )}
                        </View>
                    </View>
                </View>

                {/* TODO: Implement PostDropdown */}
                <Pressable onPress={() => console.log('Open post dropdown')}>
                    <Text className="text-muted-foreground">⋮</Text>
                </Pressable>
            </CardHeader>

            {/* Content */}
            <CardContent>
                <Pressable onPress={onClick}>
                    {post.type === 'single' ? (
                        <SinglePost
                            content={post.content}
                            dailyPrompt={post.prompt_text}
                            showDailyPrompt={showDailyPrompt}
                        />
                    ) : (
                        // TODO: Implement SimpleCarouselPost
                        <View>
                            <Text className="text-muted-foreground">Carousel post (not implemented)</Text>
                        </View>
                    )}
                </Pressable>

                {/* Tags */}
                {post.posttags && post.posttags.length > 0 && (
                    <View className="mt-2 flex flex-row flex-wrap gap-2">
                        {post.posttags.map((tag, index) => (
                            <Badge key={`${tag.name}_${index}`} variant="secondary">
                                <Text className="text-xs text-black dark:text-gray-300">#{tag.name}</Text>
                            </Badge>
                        ))}
                    </View>
                )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-row w-full items-center justify-between">
                <PostMetrics post={postMetricData} userId={currentUserId} />

                <View className="flex flex-row items-center gap-2">
                    <ScanEye size={16} color="rgb(254 202 202)" />
                    <Text className="text-sm text-black dark:text-white">{post.views_count}</Text>
                </View>

                <View className="flex flex-row items-center justify-center gap-2">
                    {post.expires_in_24hr && (
                        <View className="flex h-6 w-8 items-center justify-center rounded-full bg-zinc-400 dark:bg-zinc-700">
                            <Text className="text-sm">⏳</Text>
                        </View>
                    )}

                    {/* TODO: Implement SaveToCollectionsButton */}
                    <Pressable onPress={() => console.log('Save to collections')}>
                        <Text className="text-muted-foreground">🔖</Text>
                    </Pressable>
                </View>
            </CardFooter>

            {/* Sensitive content mask */}
            {post.is_sensitive && !showSensitiveContent && post.created_by !== currentUserId && (
                <View className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                    <Text className="text-white font-semibold">Sensitive Content</Text>
                    <Pressable onPress={() => console.log('Show sensitive content')}>
                        <Text className="text-white underline mt-2">Tap to view</Text>
                    </Pressable>
                </View>
            )}
        </Card>
    );
}