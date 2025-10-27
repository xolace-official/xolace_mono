// components/post/single-post.tsx
import * as React from 'react';

import { Pressable, Text, View } from 'react-native';

import { cn } from '@xolacekit/ui';

interface SinglePostProps {
  content: string;
  onClick?: () => void;
  showDailyPrompt?: boolean;
  dailyPrompt?: string | null;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// DailyPromptQuestion component (simplified)
const DailyPromptQuestion = ({ dailyPrompt }: { dailyPrompt: string }) => {
  return (
    <View className="mb-3 rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-900/20">
      <Text className="mb-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
        Daily Prompt
      </Text>
      <Text className="text-sm italic text-purple-700 dark:text-purple-300">
        {dailyPrompt}
      </Text>
    </View>
  );
};

export function SinglePost({
  content,
  onClick,
  showDailyPrompt,
  dailyPrompt,
}: SinglePostProps) {
  // Truncate content for feed view (you can adjust this based on your needs)
  const displayContent = truncateText(content, 200);

  return (
    <Pressable onPress={onClick} className="relative">
      <View className="rounded-2xl py-2">
        {showDailyPrompt && dailyPrompt && (
          <DailyPromptQuestion dailyPrompt={dailyPrompt} />
        )}

        <Text
          className={cn(
            'text-base leading-relaxed dark:text-white',
            'active:text-purple-400',
          )}
        >
          {displayContent}
        </Text>
      </View>

      {/* Decorative elements (commented out, uncomment if needed) */}
      {/* <View className="absolute -top-2 -left-2 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60" />
      <View className="absolute -bottom-2 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-60" /> */}
    </Pressable>
  );
}
