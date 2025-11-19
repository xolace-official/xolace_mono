import { memo } from 'react';

import { View } from 'react-native';
import Markdown from 'react-native-marked';

import { Text, useColorScheme, NAV_THEME } from '@xolacekit/ui';

type HealthTipMarkdownProps = {
  content?: string;
  isLoading?: boolean;
};

export const HealthTipMarkdown = memo(function HealthTipMarkdown({
  content,
  isLoading,
}: HealthTipMarkdownProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (isLoading && !content) {
    return <MarkdownSkeleton />;
  }

  if (!content) {
    return (
      <View className="p-4 mt-6 border border-dashed rounded-3xl border-border/60 bg-card/40">
        <Text className="text-sm text-muted-foreground">
          We could not load the rest of this wellness insight. Please refresh to
          try again.
        </Text>
      </View>
    );
  }

  return (
    <Markdown
      value={content}
      flatListProps={{
        initialNumToRender: 24,
        scrollEnabled: false,
        contentContainerStyle: {
          backgroundColor: isDark ? NAV_THEME.dark.colors.background : NAV_THEME.light.colors.background
        }
      }}
      theme={{
        colors: {
          text: isDark ? '#f8fafc' : '#0f172a',
          border: isDark ? '#1f2937' : '#e5e7eb',
          link: isDark ? '#1f3' : '#e5e7eb',
          code: isDark ? '#1f2937' : '#e5e7eb',
        },
        spacing: {
          xs: 2,
          s: 4,
          m: 8,
          l: 16,
        },
      }}
      styles={{
        paragraph: {},
        h1: {
          fontSize: 28,
          fontWeight: '700',
          marginBottom: 14,
          color: isDark ? '#fff' : '#0f172a',
        },
        h2: {
          fontSize: 22,
          fontWeight: '700',
          marginVertical: 12,
          color: isDark ? '#f8fafc' : '#111827',
        },
        h3: {
          fontSize: 18,
          fontWeight: '600',
          marginVertical: 10,
          color: isDark ? '#e5e7eb' : '#1f2937',
        },
        // list: {
        //   fontSize: 16,
        //   lineHeight: 24,
        //   color: isDark ? '#f8fafc' : '#0f172a',

        // },
        blockquote: {
          borderLeftWidth: 3,
          borderLeftColor: '#7C9CFF',
          paddingLeft: 14,
          marginVertical: 12,
        },
        hr: {
          borderBottomColor: isDark ? '#1f2937' : '#e4e4e7',
          borderBottomWidth: 1,
          marginVertical: 24,
        },
        codespan: {
          fontFamily: 'Menlo',
          fontSize: 14,
          color: isDark ? '#f8fafc' : '#111827',
          backgroundColor: isDark ? '#0f172a' : '#f4f4f5',
          padding: 16,
          borderRadius: 14,
        },
      }}
    />
  );
});

function MarkdownSkeleton() {
  return (
    <View className="p-4 mt-6 space-y-3 border rounded-3xl border-border/40 bg-card/40">
      {Array.from({ length: 6 }, (_, index) => (
        <View
          key={`markdown-line-${index}`}
          className={`h-4 rounded-full ${
            index % 3 === 0 ? 'w-10/12' : index % 3 === 1 ? 'w-9/12' : 'w-11/12'
          } bg-muted/40`}
        />
      ))}
      <View className="w-4/6 h-4 mt-2 rounded-full bg-muted/30" />
    </View>
  );
}
