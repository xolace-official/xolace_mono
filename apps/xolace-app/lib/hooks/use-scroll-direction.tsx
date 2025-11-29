import { SharedValue, useSharedValue } from "react-native-reanimated";
import { ReanimatedScrollEvent } from "react-native-reanimated/lib/typescript/hook/commonTypes";

export type ScrollDirection = "to-top" | "to-bottom" | "idle";
export type ScrollDirectionValue = SharedValue<ScrollDirection>;

// Tracks scroll direction changes for header animation logic
export const useScrollDirection = (param?: "include-negative") => {
  const scrollDirection = useSharedValue<ScrollDirection>("idle");
  const prevOffsetY = useSharedValue(0); // Previous scroll position for direction comparison
  const offsetYAnchorOnBeginDrag = useSharedValue(0); // Touch start position for drag calculations
  const offsetYAnchorOnChangeDirection = useSharedValue(0); // Position where direction changed

  // Place it inside the list animated scroll handler onBeginDrag
  // Captures initial touch position for progressive animation calculations
  const onBeginDrag = (e: ReanimatedScrollEvent | number) => {
    "worklet"; // Runs on UI thread for optimal performance
    const offsetY = typeof e === "number" ? e : e.contentOffset.y;
    offsetYAnchorOnBeginDrag.set(offsetY);
  };

  // Place it inside the list animated scroll handler onScroll
  // Direction detection algorithm runs on every scroll frame
  const onScroll = (e: ReanimatedScrollEvent | number) => {
    "worklet"; // UI thread execution for 60fps performance

    const offsetY = typeof e === "number" ? e : e.contentOffset.y;

    // Handle negative scroll values (bounce effect) based on parameter
    const positiveOffsetY = param === "include-negative" ? offsetY : Math.max(offsetY, 0);
    const positivePrevOffsetY =
      param === "include-negative" ? prevOffsetY.get() : Math.max(prevOffsetY.get(), 0);

    // Detect downward scroll: current > previous position
    if (
      positivePrevOffsetY - positiveOffsetY < 0 &&
      (scrollDirection.get() === "idle" || scrollDirection.get() === "to-top")
    ) {
      scrollDirection.set("to-bottom");
      offsetYAnchorOnChangeDirection.set(offsetY); // Mark direction change point
    }
    // Detect upward scroll: current < previous position
    if (
      positivePrevOffsetY - positiveOffsetY > 0 &&
      (scrollDirection.get() === "idle" || scrollDirection.get() === "to-bottom")
    ) {
      scrollDirection.set("to-top");
      offsetYAnchorOnChangeDirection.set(offsetY); // Mark direction change point
    }

    prevOffsetY.set(offsetY); // Store current position for next comparison
  };

  return {
    scrollDirection,
    offsetYAnchorOnBeginDrag,
    offsetYAnchorOnChangeDirection,
    onBeginDrag,
    onScroll,
  };
};
