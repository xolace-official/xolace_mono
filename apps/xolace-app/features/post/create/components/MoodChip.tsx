import React from 'react';

import { X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { getMoodById } from '../constants/moods';

// Assuming Badge is not used inside the chip logic directly based on your snippet,
// but kept the import if you need it elsewhere.

interface MoodChipProps {
  moodId: string;
  onRemove: () => void;
}

export const MoodChip: React.FC<MoodChipProps> = ({ moodId, onRemove }) => {
  const mood = getMoodById(moodId);

  if (!mood) return null;

  const IconComponent = mood.icon;

  return (
    <View
      className="mb-2 mt-2 w-auto flex-none flex-row items-center gap-2 self-start rounded-full bg-gray-400 px-3 py-1.5"
      style={{
        alignSelf: 'flex-start',
        width: 'auto',
        backgroundColor: mood.color,
      }}
    >
      <View className="h-4 w-4">
        <IconComponent size={16} color="#fff" />
      </View>
      <Text className="text-sm font-medium text-white">{mood.label}</Text>
      <Pressable
        onPress={onRemove}
        className="ml-1 active:opacity-70"
        hitSlop={4}
      >
        <X size={14} color="#000" />
      </Pressable>
    </View>
  );
};
