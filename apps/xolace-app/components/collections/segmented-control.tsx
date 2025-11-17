import { memo, useMemo } from 'react';

import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Text, cn } from '@xolacekit/ui';

type Segment = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  segments: Segment[];
  selectedValue: string;
  onChange?: (value: string) => void;
  width?: number;
  className?: string;
};

const AnimatedIndicator = Animated.createAnimatedComponent(View);

function SegmentedControlComponent({
  segments,
  selectedValue,
  onChange,
  width = 210,
  className,
}: SegmentedControlProps) {
  const itemWidth = useMemo(() => {
    if (!segments.length) {
      return width;
    }

    return width / segments.length;
  }, [segments.length, width]);

  const selectedIndex = Math.max(
    segments.findIndex((segment) => segment.value === selectedValue),
    0,
  );

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(selectedIndex * itemWidth, {
            duration: 180,
          }),
        },
      ],
    };
  }, [selectedIndex, itemWidth]);

  return (
    <View
      className={cn(
        'h-10 flex-row items-center rounded-full border border-border bg-secondary/80 dark:bg-white/10',
        className,
      )}
      style={{ width }}
    >
      <AnimatedIndicator
        pointerEvents="none"
        className="absolute h-8 rounded-full bg-[#6a71ea]"
        style={[
          {
            width: itemWidth - 6,
            left: 3,
          },
          indicatorStyle,
        ]}
      />
      {segments.map((segment) => {
        const isActive = segment.value === selectedValue;
        return (
          <Pressable
            key={segment.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              if (!isActive) {
                onChange?.(segment.value);
              }
            }}
            className="flex-1 items-center justify-center px-2"
            style={{ width: itemWidth }}
          >
            <Text
              className={cn(
                'text-sm font-semibold text-muted-foreground',
                isActive && 'text-gray-200',
              )}
            >
              {segment.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const SegmentedControl = memo(SegmentedControlComponent);
