import { useMemo } from 'react';

import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@xolacekit/ui';

import { MOOD_OPTIONS } from '../constants/mood-options';
import { usePostDraftStore } from '../store/usePostDraftStore';

export const MoodPicker = () => {
  const moodKey = usePostDraftStore((state) => state.moodKey);
  const setMood = usePostDraftStore((state) => state.setMood);

  const selectedMood = useMemo(
    () => MOOD_OPTIONS.find((mood) => mood.id === moodKey),
    [moodKey],
  );

  return (
    <View className="mt-3">
      <Popover>
        <PopoverTrigger asChild>
          <Pressable className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 active:opacity-80 dark:bg-white/5">
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-medium text-foreground">
                {selectedMood
                  ? `${selectedMood.emoji} ${selectedMood.label}`
                  : 'Add mood'}
              </Text>
              <ChevronDown size={16} color="#9ca3af" />
            </View>
          </Pressable>
        </PopoverTrigger>

        <PopoverContent className="w-80 bg-background">
          <Text className="mb-3 text-base font-semibold text-foreground">
            How are you feeling?
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {MOOD_OPTIONS.map((mood) => {
              const isActive = mood.id === moodKey;
              return (
                <Pressable
                  key={mood.id}
                  onPress={() => setMood(mood.id)}
                  className={`rounded-full px-3 py-1 ${
                    isActive ? 'bg-primary/10' : 'bg-muted/40'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {mood.emoji} {mood.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selectedMood && (
            <Pressable
              onPress={() => setMood(null)}
              className="mt-4 self-start rounded-full bg-white/10 px-3 py-1 active:opacity-70"
            >
              <Text className="text-sm text-muted-foreground">Clear mood</Text>
            </Pressable>
          )}
        </PopoverContent>
      </Popover>

      {selectedMood && (
        <View className="mt-2 self-start rounded-full border border-white/10 bg-white/10 px-3 py-1">
          <Text className="text-sm font-medium text-foreground">
            {selectedMood.emoji} {selectedMood.label}
          </Text>
        </View>
      )}
    </View>
  );
};
