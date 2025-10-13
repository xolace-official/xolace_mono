import React from 'react';

// import LottieView from "lottie-react-native";
import { Image } from 'expo-image';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { OnboardingData } from '../../constants/onboarding-data';

type RenderItemProps = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const RenderItem = ({ index, item, x }: RenderItemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const circleSize = SCREEN_WIDTH;
  const lottieSize = SCREEN_WIDTH * 1.2;
  const circleRadius = circleSize / 2;

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const lottieAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          x.value,
          animationRange,
          [200, 0, -200],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const circleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          x.value,
          animationRange,
          [1, 4, 4],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const titleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          x.value,
          animationRange,
          [100, 0, -100],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      x.value,
      animationRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const descriptionAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          x.value,
          animationRange,
          [-100, 0, 100],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      x.value,
      animationRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            circleAnimation,
            {
              backgroundColor: item.backgroundColor,
              width: circleSize,
              height: circleSize,
              borderRadius: circleRadius,
            },
          ]}
        />
      </View>

      <Animated.View style={lottieAnimation}>
        <Image
          source={item.image}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          style={[styles.lottie, { width: lottieSize, height: lottieSize }]}
        />
      </Animated.View>

      <View className={'w-full'} style={styles.textContainer}>
        <Animated.Text
          className={''}
          style={[styles.title, { color: item.textColor }, titleAnimation]}
        >
          {item.text}
        </Animated.Text>
        {item.description && (
          <Animated.Text
            style={[
              styles.description,
              { color: item.textColor },
              descriptionAnimation,
            ]}
          >
            {item.description}
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,

    alignItems: 'center',
    marginBottom: 120,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  circle: {
    position: 'absolute',
  },
  lottie: {
    alignSelf: 'center',
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'justify',
    fontSize: 35,
    fontWeight: 700,
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.8,
    letterSpacing: 0.2,
  },
});
