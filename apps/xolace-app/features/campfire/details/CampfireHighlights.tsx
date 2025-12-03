import { useState } from 'react';

import { ChevronDown, Sparkles } from 'lucide-react-native';
import { ImageBackground, Pressable, ScrollView, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';

import type { CampfireHighlight } from './types';

type CampfireHighlightsProps = {
  highlights: CampfireHighlight[];
  onPressHighlight?: (highlight: CampfireHighlight) => void;
};

export function CampfireHighlights({
  highlights,
  onPressHighlight,
}: CampfireHighlightsProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View className="px-4">
      <Pressable
        onPress={() => setCollapsed((prev) => !prev)}
        className="mb-3 flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-2">
          <Sparkles size={18} color="#f97316" />
          <Text className="text-foreground text-base font-semibold">
            Campfire highlights
          </Text>
        </View>
        <ChevronDown
          size={18}
          color="#cbd5e1"
          className={cn(collapsed ? 'rotate-180' : 'rotate-0')}
        />
      </Pressable>

      {collapsed ? null : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
        >
          {highlights.map((highlight) => (
            <Pressable
              key={highlight.id}
              onPress={() => onPressHighlight?.(highlight)}
              className="bg-muted/40 h-44 w-64 overflow-hidden rounded-3xl"
            >
              <ImageBackground
                source={
                  highlight.imageUrl ? { uri: highlight.imageUrl } : undefined
                }
                resizeMode="cover"
                className="flex-1"
              >
                <View className="absolute inset-0 bg-black/25" />
                <View className="absolute right-0 bottom-0 left-0 p-4">
                  <Text className="text-base font-bold text-white">
                    {highlight.title}
                  </Text>
                  <Text className="mt-1 text-xs text-white/80">
                    {highlight.subtitle}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
