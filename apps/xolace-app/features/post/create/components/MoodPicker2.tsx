import React, { forwardRef, memo, useEffect, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

import { moods } from '../constants/moods';
import { usePostDraftStore } from '../store/usePostDraftStore';

type MoodPickerProps = {};
type MoodPickerRef = BottomSheet;

export const MoodPicker = memo(
  forwardRef<MoodPickerRef, MoodPickerProps>((_props, ref) => {
    const { isDarkColorScheme } = useColorScheme();
    const snapPoints = useMemo(() => ['50%'], []);
    const selectedMood = usePostDraftStore((state) => state.moodKey);
    const setMood = usePostDraftStore((state) => state.setMood);

    const handleMoodSelect = (moodId: string) => {
      setMood(moodId);
      (ref as any)?.current?.close();
    };

    useEffect(() => {
      console.log('selected ', selectedMood);
    }, [selectedMood]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.colors.background
            : NAV_THEME.light.colors.background,
        }}
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
                const isSelected = selectedMood === mood.id;

                return (
                  <Pressable
                    key={mood.id}
                    onPress={() => handleMoodSelect(mood.id)}
                    className="flex-row items-center gap-2 px-4 py-3 rounded-full active:opacity-80"
                    style={{
                      backgroundColor: isSelected ? '#2563eb' : '#1f2937',
                    }}
                  >
                    <IconComponent size={16} color="#fff" />
                    <Text className="font-medium text-white">{mood.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  }),
);

MoodPicker.displayName = 'MoodPicker';
