// components/post-creation/MoodPicker.tsx
import React, { forwardRef, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { moods } from '../constants/moods';
import { usePostDraftStore } from '../store/usePostDraftStore';

type MoodPickerProps = {};
type MoodPickerRef = BottomSheet;

export const MoodPicker = forwardRef<MoodPickerRef, MoodPickerProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ['50%', '75%'], []);
    const { moodKey: selectedMood, setMood } = usePostDraftStore();

    const handleMoodSelect = (moodId: string) => {
      setMood(moodId);
      (ref as any)?.current?.close();
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#1f2937' }}
        handleIndicatorStyle={{ backgroundColor: '#6b7280' }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetView className="flex-1 px-4">
          <Text className="mb-4 text-xl font-bold text-white">
            How are you feeling?
          </Text>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="flex-row flex-wrap gap-3">
              {moods.map((mood) => {
                const IconComponent = mood.icon;
                console.log('selected ', selectedMood)
                console.log('mood ', mood.id)
                const isSelected = selectedMood === mood.id;

                return (
                  <Pressable
                    key={mood.id}
                    onPress={() => handleMoodSelect(mood.id)}
                    className={`flex-row items-center gap-2 px-4 py-3 rounded-full ${
                      isSelected ? 'bg-blue-600' : 'bg-gray-800'
                    } active:opacity-80`}
                  >
                    <IconComponent size={16} color="#fff" />
                    <Text className="font-medium text-white">
                      {mood.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

MoodPicker.displayName = 'MoodPicker';