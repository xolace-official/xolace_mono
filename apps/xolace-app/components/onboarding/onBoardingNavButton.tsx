import React, { FC } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { OnboardingData } from '../../constants/onboarding-data';
import { colors } from '../../constants/onboarding-data';

type ButtonProps = {
  dataLength: number;
  scrollIndex: SharedValue<number>;
  scrollRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  onFinish?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const OnboardingNavButton: FC<ButtonProps> = ({
  dataLength,
  scrollIndex,
  scrollRef,
  x,
  onFinish,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const buttonLeftScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const inputRange = colors.map((_, i) => i * SCREEN_WIDTH);

  const rightButtonStyle = useAnimatedStyle(() => ({
    width: 40,
    height: 40,
    transform: [{ scale: buttonScale.value }],
    backgroundColor: interpolateColor(x.value, inputRange, colors),
  }));

  const leftButtonStyle = useAnimatedStyle(() => ({
    width: 40,
    height: 40,
    transform: [{ scale: buttonLeftScale.value }],
    backgroundColor: interpolateColor(x.value, inputRange, colors),
  }));

  const rightAnimatedStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;

    return {
      opacity: isLastIndex ? withTiming(0) : withTiming(1),
    };
  });

  const leftAnimatedStyle = useAnimatedStyle(() => {
    const isFirstIndex = scrollIndex.value === 0;

    return {
      opacity: isFirstIndex ? withTiming(0) : withTiming(1),
    };
  });

  // const textStyle= useAnimatedStyle(()=> {
  //     const isLastIndex = scrollIndex.value === dataLength - 1
  //
  //     return {
  //         opacity: isLastIndex ? withTiming(1) : withTiming(0),
  //         transform: [{translateX: isLastIndex ? withTiming(0) : withTiming(-100)}],
  //     };
  // })
  //
  // const iconStyle= useAnimatedStyle(()=> {
  //     const isLastIndex = scrollIndex.value === dataLength - 1
  //
  //     return {
  //         width: 30,
  //         height: 30,
  //         opacity: isLastIndex ? withTiming(0) : withTiming(1),
  //         transform: [{translateX: isLastIndex ? withTiming(100) : withTiming(0)}],
  //     };
  // })

  const handlePress = () => {
    console.log('onPress', dataLength);
    console.log('scroll ', scrollIndex);
    const isLastIndex = scrollIndex.value === dataLength - 1;

    if (!isLastIndex) {
      scrollRef.current?.scrollToIndex({
        index: scrollIndex.value + 1,
        animated: true,
      });
    } else {
      if (onFinish) {
        scheduleOnRN(onFinish);
      } else {
        console.log('finish');
      }
    }
  };

  const handleLeftPress = () => {
    console.log('onPress', dataLength);
    console.log('scroll ', scrollIndex);
    const isFirstIndex = scrollIndex.value === 0;

    if (!isFirstIndex) {
      scrollRef.current?.scrollToIndex({
        index: scrollIndex.value - 1,
        animated: true,
      });
    }
  };

  const onRightPress = () => {
    buttonScale.value = withSpring(0.95, {}, () => {
      buttonScale.value = withSpring(1);
      scheduleOnRN(handlePress);
    });
  };

  const onLeftPress = () => {
    buttonLeftScale.value = withSpring(0.95, {}, () => {
      buttonLeftScale.value = withSpring(1);
      scheduleOnRN(handleLeftPress);
    });
  };

  return (
    <View className={'flex-row items-center justify-center gap-2'}>
      <AnimatedPressable onPress={onLeftPress}>
        <Animated.View
          style={[styles.button, leftButtonStyle, leftAnimatedStyle]}
        >
          <AnimatedIcon
            name="arrow-left"
            size={20}
            color="white"
            style={[styles.icon]}
            onPress={onFinish}
          />
        </Animated.View>
      </AnimatedPressable>

      <AnimatedPressable onPress={onRightPress}>
        <Animated.View
          style={[styles.button, rightButtonStyle, rightAnimatedStyle]}
        >
          <AnimatedIcon
            name="arrow-right"
            size={20}
            color="white"
            style={[styles.icon]}
            onPress={onFinish}
          />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default OnboardingNavButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 10,
  },
});
