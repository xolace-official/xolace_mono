// components/post-creation/MoodChip.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import { getMoodById } from '../constants/moods';
import { Badge } from '@xolacekit/ui';

interface MoodChipProps {
  moodId: string;
  onRemove: () => void;
}

export const MoodChip: React.FC<MoodChipProps> = ({ moodId, onRemove }) => {
  const mood = getMoodById(moodId);

  if (!mood) return null;

  const IconComponent = mood.icon;

  return (
    <Badge className="flex-row items-center gap-2 px-3 py-1.5 bg-red-400 rounded-full self-start mx-4 mb-2 w-fit">
      <View className="w-4 h-4">
        <IconComponent size={16} color="#fff" />
      </View>
      <Text className="text-sm font-medium text-white">{mood.label}</Text>
      <Pressable
        onPress={onRemove}
        className="ml-1 active:opacity-70"
        hitSlop={4}
      >
        <X size={14} color="#9ca3af" />
      </Pressable>
    </Badge>
  );
};