// components/post/single-post.tsx
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';

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
  showDailyPrompt,
  dailyPrompt,
}: SinglePostProps) {
  // Truncate content for feed view (you can adjust this based on your needs)
  const displayContent = truncateText(content, 200);

  return (
    <View className="rounded-2xl py-2">
      {showDailyPrompt && dailyPrompt && (
        <DailyPromptQuestion dailyPrompt={dailyPrompt} />
      )}

      <Pressable
        onPress={() => {
          console.log('Navigate to post details for tap me');
          router.push('/post/123'); // Replace '123' with actual post ID
        }}
      >
        <Text className="">{displayContent}</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log('Navigate to post details');
        }}
      >
        <Text
          className={cn(
            'text-base leading-relaxed dark:text-white',
            'active:text-purple-400',
          )}
        >
          displayContent
        </Text>
      </Pressable>
    </View>
  );
}
