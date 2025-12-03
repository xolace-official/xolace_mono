import React, { FC, useEffect } from 'react';

import {
  HeaderTitle as HeaderTitleComponent,
  HeaderTitleProps,
  useHeaderHeight,
} from '@react-navigation/elements';
import { useNavigation } from 'expo-router';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@xolacekit/ui';

// header-large-title-animation 🔽

type Props = {
  title: string;
  offsetY: SharedValue<number>;
  searchBarAnimationDistance?: number;
  className?: string;
};

export const LargeTitle: FC<Props> = ({
  title,
  offsetY,
  searchBarAnimationDistance = 0,
  className,
}) => {
  const navigation = useNavigation();

  // Why: We need the runtime header height to compute when the large title crosses under it
  // This aligns trigger math with React Navigation's measured header (safe area included)
  const headerHeight = useHeaderHeight();

  // Why: Tracks the bottom (baseline) of the large title to derive the exact fade/collapse trigger
  // Set via onLayout → y + height; shared so both opacity and scale styles reference the same source
  const headerBaselineY = useSharedValue(0);

  // Purpose: Controls the small headerTitle visibility as the large title scrolls away
  // Visual intent: Compact title fades in only after the large title has cleared the header + optional search bar distance
  const rTitleOpacityStyle = useAnimatedStyle(() => {
    if (headerBaselineY.value <= 0) return { opacity: 0 };

    // Trigger position: when large title baseline goes above the header's bottom by the search bar collapse distance
    const scrollDistance =
      headerBaselineY.value + searchBarAnimationDistance - headerHeight;

    return {
      // Timing: default withTiming (~300ms) gives a smooth but snappy reveal
      opacity: withTiming(offsetY.value > scrollDistance ? 1 : 0),
    };
  });

  // Purpose: Drives the on-screen large title (opacity + subtle pull-to-refresh scale)
  const rLargeTitleStyle = useAnimatedStyle(() => {
    // Shared trigger math with rTitleOpacityStyle ensures perfect cross-fade handoff
    const scrollDistance =
      headerBaselineY.value + searchBarAnimationDistance - headerHeight;

    return {
      // Cross-fade: large title is visible until the scroll passes the trigger
      opacity: offsetY.value < scrollDistance ? 1 : 0,
      // Interpolation: slight scale-up on negative offset (overscroll/pull-down)
      // Input: [0, -200] px scroll → Output: [1, 1.1] scale, clamped to avoid over-zoom
      transform: [
        {
          scale: interpolate(
            offsetY.value,
            [0, -200],
            [1, 1.1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props: HeaderTitleProps) => {
        return (
          // Animated wrapper: using Reanimated's createAnimatedComponent under the hood
          // to animate React Navigation's HeaderTitle. See docs: createAnimatedComponent
          // Why: headerTitle must be wrapped to receive animated styles (opacity here)
          <Animated.View style={rTitleOpacityStyle}>
            <HeaderTitleComponent {...props}>{title}</HeaderTitleComponent>
          </Animated.View>
        );
      },
    });
  }, [title, navigation, rTitleOpacityStyle]);

  return (
    <Animated.Text
      className={cn('text-3xl font-bold text-white', className)}
      // Transform origin on the left to mimic iOS large-title anchor behavior during scale
      style={[rLargeTitleStyle, { transformOrigin: 'left' }]}
      // Measurement: capture baseline (y + height) once laid out to derive scroll trigger
      onLayout={({ nativeEvent }) =>
        headerBaselineY.set(nativeEvent.layout.y + nativeEvent.layout.height)
      }
    >
      {title}
    </Animated.Text>
  );
};

// header-large-title-animation 🔼
