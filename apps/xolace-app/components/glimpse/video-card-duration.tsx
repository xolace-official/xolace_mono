// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/video-card-duration.tsx
import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

interface VideoCardDurationProps {
  duration: number;
}

export function VideoCardDuration({ duration }: VideoCardDurationProps) {
  const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <View className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1">
      <Text className="text-sm font-semibold text-white">
        {formatDuration(duration)}
      </Text>
    </View>
  );
}
