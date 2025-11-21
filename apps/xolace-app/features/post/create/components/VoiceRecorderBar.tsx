import { memo } from 'react';

import { Mic, Square } from 'lucide-react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@xolacekit/ui';

type VoiceRecorderBarProps = {
  visible: boolean;
  isRecording: boolean;
  isPreparing: boolean;
  isTranscribing: boolean;
  durationLabel: string;
  bars: number[];
  onToggle: () => void;
};

const Waveform = ({ bars }: { bars: number[] }) => {
  return (
    <View className="ml-3 flex-1 flex-row items-end gap-[2px]">
      {bars.map((value, index) => {
        const height = 6 + value * 28;
        return (
          <View
            key={`${index}-${value}`}
            style={{ height }}
            className="w-[3px] rounded-full bg-emerald-400/60"
          />
        );
      })}
    </View>
  );
};

export const VoiceRecorderBar = memo(
  ({
    visible,
    isRecording,
    isPreparing,
    isTranscribing,
    durationLabel,
    bars,
    onToggle,
  }: VoiceRecorderBarProps) => {
    if (!visible) {
      return null;
    }

    const showSpinner = isPreparing || isTranscribing;

    return (
      <View className="mx-4 mb-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 dark:bg-white/5">
        <View className="flex-row items-center">
          <Pressable
            onPress={onToggle}
            disabled={isTranscribing}
            className={`h-12 w-12 items-center justify-center rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-emerald-500'
            } ${isTranscribing ? 'opacity-60' : 'active:opacity-90'}`}
          >
            {showSpinner ? (
              <ActivityIndicator color="#fff" />
            ) : isRecording ? (
              <Square size={26} color="#fff" />
            ) : (
              <Mic size={26} color="#fff" />
            )}
          </Pressable>

          <View className="ml-3">
            <Text className="text-sm font-semibold text-foreground">
              {isTranscribing
                ? 'Transcribing…'
                : isRecording
                  ? 'Recording'
                  : 'Voice to text'}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {durationLabel}
            </Text>
          </View>

          <Waveform bars={bars.slice(-24)} />
        </View>
      </View>
    );
  },
);

VoiceRecorderBar.displayName = 'VoiceRecorderBar';
