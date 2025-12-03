import { useEffect, useState } from 'react';

import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// grok-paywall-upgrade-button-animation 🔽

// Using Animated.createAnimatedComponent so the pressable can accept Reanimated props
// (e.g. entering/exiting transitions). Keeps animation work on UI thread where possible.
// Docs: https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Minimal collapsed width while loading. Drives the visual morph from full-width CTA
// to a compact circular-ish loader container without layout shift for surrounding views.
const MIN_BUTTON_WIDTH = 65;
// Mock end-to-end flow duration. Acts as a single source of truth for the loading
// state timeline; helps coordinate text→spinner crossfade timing.
const MOCK_LOADING_DURATION = 3000;

const UpgradeButton = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When loading starts, we keep the button collapsed for MOCK_LOADING_DURATION.
    // In a real flow, tie this to the purchase API resolution to avoid desync.
    if (loading) {
      setTimeout(() => setLoading(false), MOCK_LOADING_DURATION);
    }
  }, [loading]);

  return (
    <View className="mx-5 mb-5 items-center justify-center">
      {/* Width transition is handled by native style transitions for snappy morphing:
          - width: 100% → MIN_BUTTON_WIDTH on press
          - duration: 400ms with ease-out for quick start and gentle settle
          - borderCurve: "continuous" for iOS 16+ premium rounded look */}
      <AnimatedPressable
        onPress={() => setLoading(true)}
        className="h-[54px] items-center justify-center rounded-full bg-white"
        style={{
          transitionProperty: 'width',
          transitionDuration: 400,
          transitionTimingFunction: 'ease-out',
          width: loading ? MIN_BUTTON_WIDTH : '100%',
          borderCurve: 'continuous',
        }}
        disabled={loading}
      />
      <View className="pointer-events-none absolute">
        {loading ? (
          // FadeIn smoothly reveals the spinner as the button collapses; this
          // overlaps with the width transition to create a cohesive morph.
          <Animated.View key="loader" entering={FadeIn}>
            <ActivityIndicator color="black" />
          </Animated.View>
        ) : (
          // FadeIn for label for symmetry with loader; avoids abrupt text pop-in/out.
          <Animated.Text
            key="text"
            entering={FadeIn}
            className="text-xl font-medium text-nowrap text-black"
          >
            Upgrade to SuperGrok
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

export default UpgradeButton;

// grok-paywall-upgrade-button-animation 🔼
