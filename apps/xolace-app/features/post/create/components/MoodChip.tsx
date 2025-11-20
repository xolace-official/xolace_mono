import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
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
      className="flex-row items-center flex-none gap-2 px-3 py-1.5 rounded-full self-start mt-2 mb-2 w-auto bg-gray-400"
      style={{ alignSelf: "flex-start", width: "auto", backgroundColor: mood.color }}
    >
      <View className="w-4 h-4">
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