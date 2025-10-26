// components/daily-prompt/daily-prompt.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { ArrowRight, Sparkles, CalendarDays, Tag } from 'lucide-react-native';
import { format, isToday } from 'date-fns';
import { useRouter } from 'expo-router';

import { Card, Button, Text} from '@xolacekit/ui';
import { cn } from '@xolacekit/ui';

// TODO: Import actual hooks and utilities
// import { usePrompt } from '@/hooks/prompts/usePromptData';
// import { useUserState } from '@/lib/store/user';
// import { usePreferencesStore } from '@/lib/store/preferences-store';

// Types
interface DailyPromptData {
    id: string;
    prompt_text: string;
    created_at: string;
    active_on: string;
    category?: string;
}

interface StreakData {
    current_streak: number;
    last_response_date?: string | null;
}

// Helper functions for category theming
const getThemeColors = (category?: string) => {
    const themes: Record<string, any> = {
        reflection: {
            gradient: 'from-purple-600 to-indigo-700',
            accent: 'text-purple-200',
            button: 'bg-white text-purple-700',
            glow: 'bg-purple-400/30',
        },
        gratitude: {
            gradient: 'from-pink-600 to-rose-700',
            accent: 'text-pink-200',
            button: 'bg-white text-pink-700',
            glow: 'bg-pink-400/30',
        },
        growth: {
            gradient: 'from-emerald-600 to-teal-700',
            accent: 'text-emerald-200',
            button: 'bg-white text-emerald-700',
            glow: 'bg-emerald-400/30',
        },
        mindfulness: {
            gradient: 'from-blue-600 to-cyan-700',
            accent: 'text-blue-200',
            button: 'bg-white text-blue-700',
            glow: 'bg-blue-400/30',
        },
        creativity: {
            gradient: 'from-orange-600 to-amber-700',
            accent: 'text-orange-200',
            button: 'bg-white text-orange-700',
            glow: 'bg-orange-400/30',
        },
        default: {
            gradient: 'from-purple-600 to-lavender-700',
            accent: 'text-purple-200',
            button: 'bg-white text-purple-700',
            glow: 'bg-indigo-400/30',
        },
    };

    return themes[category || 'default'] || themes.default;
};

const getCategoryIcon = (category?: string): string => {
    const icons: Record<string, string> = {
        reflection: '🤔',
        gratitude: '🙏',
        growth: '🌱',
        mindfulness: '🧘',
        creativity: '🎨',
        connection: '🤝',
        wellness: '💚',
        default: '✨',
    };

    return icons[category || 'default'] || icons.default;
};

export function DailyPrompt() {
    const router = useRouter();

    // DUMMY DATA - Replace with actual hooks
    const currentUserId = 'dummy-user-id';
    const dailyPromptEnabled = true;

    // States
    const [isFlameRotating, setIsFlameRotating] = useState(false);
    const [isLoadingStreak, setIsLoadingStreak] = useState(true);
    const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
    const [streakData, setStreakData] = useState<StreakData | null>(null);
    const [promptData, setPromptData] = useState<DailyPromptData | null>(null);
    const [showUrgencyIndicator, setShowUrgencyIndicator] = useState(false);

    // TODO: Replace with actual data fetching hooks
    // const { data: promptData, isLoading: isLoadingPrompt } = usePrompt();
    // const user = useUserState(state => state.user);
    // const { preferences } = usePreferencesStore();

    // Simulate data loading
    useEffect(() => {
        const loadData = async () => {
            setIsLoadingPrompt(true);
            setIsLoadingStreak(true);

            // DUMMY: Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // DUMMY: Set prompt data
            setPromptData({
                id: 'prompt-001',
                prompt_text: 'What moment made you pause and reflect today?',
                created_at: new Date().toISOString(),
                active_on: new Date().toISOString(),
                category: 'reflection',
            });

            // DUMMY: Set streak data
            const dummyStreakData: StreakData = {
                current_streak: 7,
                last_response_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            };
            setStreakData(dummyStreakData);

            // Calculate urgency indicator
            if (dummyStreakData.last_response_date) {
                const lastResponseDate = new Date(dummyStreakData.last_response_date);
                const now = new Date();
                const hoursLeft = 23 - now.getHours();

                setShowUrgencyIndicator(
                    !isToday(lastResponseDate) && hoursLeft <= 4 && hoursLeft > 0
                );
            }

            setIsLoadingPrompt(false);
            setIsLoadingStreak(false);
        };

        if (currentUserId) {
            loadData();
        }
    }, [currentUserId]);

    const handleRespond = () => {
        if (!promptData) return;

        // TODO: Implement navigation with params
        // router.push({
        //   pathname: '/create-post',
        //   params: {
        //     prompt: promptData.prompt_text,
        //     prompt_id: promptData.id,
        //   },
        // });

        console.log('Navigate to create post with prompt:', promptData.prompt_text);
    };

    const handleStreakPress = () => {
        setIsFlameRotating(true);
        setTimeout(() => setIsFlameRotating(false), 1000);
    };

    // If daily prompt is disabled
    if (!isLoadingPrompt && !dailyPromptEnabled) {
        return null;
    }

    // Loading state
    if (isLoadingPrompt) {
        return (
            <Card className="relative overflow-hidden border-none bg-[#D91656] p-4 mx-4 my-3">
                <View className="flex flex-col gap-4">
                    <View className="h-6 w-1/3 rounded bg-white/20" />
                    <View className="h-20 rounded bg-white/20" />
                    <View className="h-10 rounded bg-white/20" />
                </View>
            </Card>
        );
    }

    // No prompt available
    if (!promptData) {
        return (
            <Card className="relative overflow-hidden border-none bg-purple-500 p-4 mx-4 my-3">
                <Text className="text-white text-center">No prompt available for today.</Text>
            </Card>
        );
    }

    const { gradient, accent, button, glow } = getThemeColors(promptData.category);
    const categoryIcon = getCategoryIcon(promptData.category);

    return (
        <View className="w-full px-4 my-3">
            <Card className={cn(
                'relative overflow-hidden border-none  shadow-xl',
                'bg-purple-500',
                gradient
            )}>
                {/* Decorative Glows */}
                <View className={cn(
                    'absolute top-0 right-0 -mt-20 -mr-20 h-40 w-40 rounded-full blur-3xl opacity-30',
                    glow
                )} />
                <View className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-purple-400/30 blur-3xl opacity-30" />

                <View className="relative z-10 px-4 py-3">
                    {/* Header */}
                    <View className="mb-1 flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                            <Sparkles size={20} color="#fcd34d" />
                            <Text className="text-base font-semibold text-white sm:text-lg">
                                Prompt of the Day
                            </Text>
                        </View>

                        <View className="flex flex-row items-center gap-1">
                            {/* TODO: Add Lottie animation */}
                            <Text className="text-xl">🔥</Text>

                            <Pressable
                                onPress={handleStreakPress}
                                className={cn(
                                    'flex flex-row items-center gap-1 rounded-full bg-white/10 px-2 py-1',
                                    isFlameRotating && 'animate-spin'
                                )}
                            >
                                {showUrgencyIndicator && (
                                    <Text className="text-sm">⏳</Text>
                                )}
                                {isLoadingStreak ? (
                                    <ActivityIndicator size="small" color="#ffffff" />
                                ) : (
                                    <Text className="text-sm font-medium text-white">
                                        {streakData?.current_streak}{' '}
                                        {(streakData?.current_streak || 0) <= 1 ? 'day' : 'days'}
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {/* Category Badge */}
                    {promptData.category && (
                        <View className="mb-2 flex flex-row items-center gap-2">
                            <View className="flex flex-row items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                                <Text className="text-sm">{categoryIcon}</Text>
                                <Tag size={12} color="#ffffff" />
                                <Text className="text-xs font-medium text-white capitalize">
                                    {promptData.category.replace('_', ' ')}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Date */}
                    <View className="mb-3 flex flex-row items-center">
                        <CalendarDays size={16} color="#e9d5ff" />
                        <Text className="ml-1.5 text-xs text-purple-200">
                            {format(new Date(promptData.active_on), 'MMMM d, yyyy')}
                        </Text>
                    </View>

                    {/* Prompt Text */}
                    <View className="relative my-3 min-h-[50px] items-center justify-center rounded-xl bg-white/5 p-3">
                        <Text className={cn(
                            'absolute top-1 -left-2 text-6xl font-serif select-none',
                            accent
                        )}>
                            "
                        </Text>
                        <Text className="px-4 text-center text-base font-medium text-white leading-snug sm:text-xl">
                            {promptData.prompt_text}
                        </Text>
                        <Text className={cn(
                            'absolute -right-2 bottom-0 text-6xl font-serif select-none',
                            accent
                        )}>
                            "
                        </Text>
                    </View>

                    {/* Respond Button */}
                    <Button
                        onPress={handleRespond}
                        className={cn(
                            'mt-2 w-full rounded-lg py-3.5 shadow-md',
                            button
                        )}
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-base font-bold text-black ">Share Your Thoughts</Text>
                            <ArrowRight size={20} className="ml-2.5" />
                        </View>
                    </Button>
                </View>
            </Card>
        </View>
    );
}