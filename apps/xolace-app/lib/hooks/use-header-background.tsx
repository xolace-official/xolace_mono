import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { useTargetMeasurement } from "./use-target-measurement";

type Props = {
  offsetY: SharedValue<number>;
};

export const useHeaderBackground = ({ offsetY }: Props) => {
  const navigation = useNavigation();

  // Why: Align blur/background trigger with actual header bottom (incl. safe areas)
  const headerHeight = useHeaderHeight();

  const { measurement, targetRef, onTargetLayout } = useTargetMeasurement();

  const rBgStyle = useAnimatedStyle(() => {
    // Fallback: no measurement yet → solid background (no translucency)
    if (measurement.value === null) return { backgroundColor: "#0a0a0a" };

    const scrollDistance = measurement.value.pageY - headerHeight;

    return {
      // Background tint: opaque near top, gains 50% alpha after target passes under header
      backgroundColor: offsetY.value > scrollDistance ? "#0a0a0a80" : "#0a0a0a",
    };
  });

  const rBlurStyle = useAnimatedStyle(() => {
    // Keep blur hidden until we know where to trigger it
    if (measurement.value === null) return { opacity: 0 };

    const scrollDistance = measurement.value.pageY - headerHeight;

    return {
      // Timing: 150ms feels responsive without popping; matches subtle iOS chrome transitions
      opacity: withTiming(offsetY.value > scrollDistance ? 1 : 0, { duration: 150 }),
    };
  });

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => {
        return (
          // Animated wrapper required so headerBackground can respond to shared values
          <Animated.View className="absolute inset-0" style={rBgStyle}>
            <Animated.View className="absolute inset-0" style={rBlurStyle}>
              <BlurView
                // Platform-aware blur. On Android, intensity fallback is subtle; on iOS aligns with system chrome
                intensity={50}
                tint="systemChromeMaterialDark"
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
          </Animated.View>
        );
      },
    });
  }, [navigation, rBgStyle, rBlurStyle]);

  return { targetRef, onTargetLayout };
};
