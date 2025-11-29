import { ScrollDirectionValue } from "./use-scroll-direction";
import {
  Extrapolation,
  interpolate,
  ScrollEvent,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const _onEndDragAnimDuration = 100;

type Params = {
  headerHeight: number;
  scrollDirection: ScrollDirectionValue;
  handleXTabsOnScroll: (e: ScrollEvent) => void;
};

export const useHeaderAnimation = ({
  headerHeight,
  scrollDirection,
  handleXTabsOnScroll,
}: Params) => {
  const listOffsetY = useSharedValue(0);
  const listOffsetYRefPoint = useSharedValue(0);
  const isListDragging = useSharedValue(false);

  const headerOpacity = useSharedValue(1);
  const headerOpacityRefPoint = useSharedValue(1);
  const headerTranslateY = useSharedValue(0);
  const headerTranslateYRefPoint = useSharedValue(0);

  const headerState = useDerivedValue(() => {
    if (headerTranslateY.value === 0) {
      return "visible";
    }

    if (headerTranslateY.value === -headerHeight) {
      return "hidden";
    }
  });
  const headerTransition = useSharedValue(false);

  useAnimatedReaction(
    () => {
      return scrollDirection.value;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        listOffsetYRefPoint.value = listOffsetY.value;
        headerOpacityRefPoint.value = headerOpacity.value;
        headerTranslateYRefPoint.value = headerTranslateY.value;
      }
    }
  );

  const scrollHandler = useAnimatedScrollHandler({
    onMomentumBegin: () => {
      isListDragging.value = true;
    },
    onBeginDrag: (e) => {
      isListDragging.value = true;
      listOffsetYRefPoint.value = e.contentOffset.y;
      headerOpacityRefPoint.value = headerOpacity.value;
      headerTranslateYRefPoint.value = headerTranslateY.value;
    },
    onScroll: (e) => {
      listOffsetY.value = e.contentOffset.y;
      handleXTabsOnScroll(e);
    },
    onEndDrag: () => {
      isListDragging.value = false;

      if (listOffsetY.value < headerHeight) {
        headerOpacity.value = withTiming(1, { duration: _onEndDragAnimDuration * 2 });
        headerTranslateY.value = withTiming(0, { duration: _onEndDragAnimDuration * 2 });
        headerTransition.value = false;
        return;
      }

      if (
        listOffsetY.value > headerHeight &&
        headerTransition.value === true &&
        scrollDirection.value === "to-bottom"
      ) {
        headerOpacity.value = withTiming(0, { duration: _onEndDragAnimDuration });
        headerTranslateY.value = withTiming(-headerHeight, { duration: _onEndDragAnimDuration });
        headerTransition.value = false;
        return;
      }

      if (
        listOffsetY.value > headerHeight &&
        headerTransition.value === true &&
        scrollDirection.value === "to-top"
      ) {
        headerOpacity.value = withTiming(1, { duration: _onEndDragAnimDuration });
        headerTranslateY.value = withTiming(0, { duration: _onEndDragAnimDuration });
        headerTransition.value = false;
        return;
      }
    },
  });

  const rHeaderStyle = useAnimatedStyle(() => {
    if (
      listOffsetY.value > 0 &&
      scrollDirection.value === "to-bottom" &&
      isListDragging.value === true
    ) {
      if (headerState.value === "hidden") {
        return {
          opacity: 0,
          transform: [{ translateY: -headerHeight }],
        };
      }
      headerTransition.value = true;
      headerOpacity.value = interpolate(
        listOffsetY.value,
        [listOffsetYRefPoint.value, listOffsetYRefPoint.value + headerHeight / 2],
        [headerOpacityRefPoint.value, 0],
        Extrapolation.CLAMP
      );
      headerTranslateY.value = interpolate(
        listOffsetY.value,
        [listOffsetYRefPoint.value, listOffsetYRefPoint.value + headerHeight],
        [headerTranslateYRefPoint.value, -headerHeight],
        Extrapolation.CLAMP
      );
    }

    if (
      listOffsetY.value > 0 &&
      scrollDirection.value === "to-top" &&
      isListDragging.value === true
    ) {
      if (headerState.value === "visible") {
        return {
          opacity: 1,
          transform: [{ translateY: 0 }],
        };
      }
      headerTransition.value = true;
      headerOpacity.value = interpolate(
        listOffsetY.value,
        [listOffsetYRefPoint.value, listOffsetYRefPoint.value - 2 * headerHeight],
        [headerOpacityRefPoint.value, 1],
        Extrapolation.CLAMP
      );
      headerTranslateY.value = interpolate(
        listOffsetY.value,
        [listOffsetYRefPoint.value, listOffsetYRefPoint.value - 2 * headerHeight],
        [headerTranslateYRefPoint.value, 0],
        Extrapolation.CLAMP
      );
    }
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: headerTranslateY.value,
        },
      ],
    };
  });

  const rBlurViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(listOffsetY.value > headerHeight ? 1 : 0),
    };
  });

  return {
    rHeaderStyle,
    rBlurViewStyle,
    scrollHandler,
  };
};
