import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useState } from 'react';

import { SharedValue } from 'react-native-reanimated';
import { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/hook/commonTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

import {
  ScrollDirection,
  useScrollDirection,
} from '../hooks/use-scroll-direction';

// x-bottom-tabs-background-animation 🔽

const TAB_BAR_HEIGHT_WITHOUT_INSET = 30;

interface TabsContextValue {
  tabBarHeight: number;
  tabBarPaddingBottom: number;
  isBottomBlurVisible: boolean;
  scrollDirection: SharedValue<ScrollDirection>;
  setIsBottomBlurVisible: (isBottomBlurVisible: boolean) => void;
  isAddButtonVisible: boolean;
  setIsAddButtonVisible: (isAddButtonVisible: boolean) => void;
  handleXTabsOnScroll: (e: ReanimatedScrollEvent) => void;
}

export const TabsContext = createContext<TabsContextValue>(
  {} as TabsContextValue,
);

export const TabsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isBottomBlurVisible, setIsBottomBlurVisible] = useState(true);
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

  const insets = useSafeAreaInsets();

  const tabBarPaddingBottom = insets.bottom + 16;
  const tabBarHeight = tabBarPaddingBottom + TAB_BAR_HEIGHT_WITHOUT_INSET;

  const { scrollDirection, onScroll: handleScrollDirectionOnScroll } =
    useScrollDirection();

  const handleXTabsOnScroll = (e: ReanimatedScrollEvent) => {
    'worklet';

    handleScrollDirectionOnScroll(e);

    if (scrollDirection.value === 'to-bottom') {
      scheduleOnRN(setIsBottomBlurVisible, false);
    } else if (scrollDirection.value === 'to-top') {
      scheduleOnRN(setIsBottomBlurVisible, true);
    }
  };

  const value = {
    tabBarHeight,
    tabBarPaddingBottom,
    isBottomBlurVisible,
    scrollDirection,
    setIsBottomBlurVisible,
    isAddButtonVisible,
    setIsAddButtonVisible,
    handleXTabsOnScroll,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

// x-bottom-tabs-background-animation 🔼
