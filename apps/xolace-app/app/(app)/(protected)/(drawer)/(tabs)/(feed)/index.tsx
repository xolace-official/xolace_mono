import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    withTiming,
    Easing, withSpring
} from "react-native-reanimated";
// import { useDrawerProgress } from "@react-navigation/drawer";
import { FlashList } from "@shopify/flash-list";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from 'expo-router';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { scheduleOnRN } from 'react-native-worklets';
import {Stack} from "expo-router";

import { DailyPrompt } from "../../../../../../components/cards/DailyPrompt";
import { EnhancedPostCard } from "../../../../../../components/cards/EnhancedPostCard";
import dummyPosts, {EnhancedPost} from "../../../../../../lib/dummy-data/post";
import FeedHeader from "../../../../../../components/shared/FeedHeader";

import { Constants, Dialog, PanningProvider, Text, View as ViewUI } from "react-native-ui-lib";
import { XolaceButton } from "@xolacekit/ui";
import {SCROLL_THRESHOLD , ANIMATION_START_OFFSET, SCROLL_DISTANCE_FOR_FULL_HIDE} from "../../../../../../constants/config/tabBar-config";

// ✅ Create Animated version of FlashList for UI thread animations
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<EnhancedPost>);

export default function HomePage() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    // Shared values for scroll tracking
    const scrollOffset = useSharedValue(0);
    const lastScrollOffset = useSharedValue(0);
    const tabBarTranslateY = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const layoutHeight = useSharedValue(0);
    const isScrollingDown = useSharedValue(false);
    const tabBarHeight = useBottomTabBarHeight();

    const isVisible = true;

    // Tab bar animation logic with boundaries
    // Tab bar animation logic with smooth transitions
    const updateTabbar = useCallback(() => {
        const currentScroll = scrollOffset.value;
        const lastScroll = lastScrollOffset.value;
        const scrollDiff = currentScroll - lastScroll;

        // 🔹 Ignore tiny movements
        if (Math.abs(scrollDiff) < SCROLL_THRESHOLD) {
            return;
        }

        // 🔹 Check boundaries to prevent flickering
        const maxScrollOffset = contentHeight.value - layoutHeight.value;
        const isAtTop = currentScroll <= ANIMATION_START_OFFSET;
        const isAtBottom = currentScroll >= maxScrollOffset - 10;

        // 🔹 Determine scroll direction
        const scrollingDown = scrollDiff > 0;
        const scrollingUp = scrollDiff < 0;

        // Track direction change for smoother transitions
        isScrollingDown.value = scrollingDown;

        let targetTranslateY = tabBarTranslateY.value;

        if (isAtTop) {
            // At top - always show tab bar smoothly
            targetTranslateY = 0;
        } else if (isAtBottom) {
            // At bottom - maintain current state
            lastScrollOffset.value = currentScroll;
            return;
        } else {
            // Middle zone - calculate based on direction
            if (scrollingDown) {
                // Scrolling down - hide tab bar
                const scrolledPastStart = currentScroll - ANIMATION_START_OFFSET;
                const hideProgress = Math.min(scrolledPastStart / SCROLL_DISTANCE_FOR_FULL_HIDE, 1);
                targetTranslateY = hideProgress * tabBarHeight;
            } else if (scrollingUp) {
                // Scrolling up - show tab bar immediately
                targetTranslateY = 0;
            }
        }

        // 🔹 Smooth animation with timing
        // tabBarTranslateY.value = withTiming(targetTranslateY, {
        //     duration: 150, // Quick but smooth
        //     easing: Easing.out(Easing.cubic),
        // });
        tabBarTranslateY.value = withSpring(targetTranslateY, {
            damping: 15,
            stiffness: 150,
            mass: 0.5,
        });

        // Apply the translation
        const newMarginBottom = -Math.round(tabBarTranslateY.value);

        navigation.getParent()?.setOptions({
            tabBarStyle: {
                marginBottom: newMarginBottom
            }
        });

        lastScrollOffset.value = currentScroll;
    }, [tabBarHeight, navigation]);


    // Animated scroll handler with content size tracking
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (isFocused) {
                scrollOffset.value = event.contentOffset.y;
                contentHeight.value = event.contentSize.height;
                layoutHeight.value = event.layoutMeasurement.height;
                scheduleOnRN(updateTabbar);
            }
        },
    });

    // Reset tab bar on unmount/blur
    useFocusEffect(
        useCallback(() => {
            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { marginBottom: 0 }
                });
                // Reset shared values
                tabBarTranslateY.value = 0;
                scrollOffset.value = 0;
                lastScrollOffset.value = 0;
            };
        }, [navigation])
    );

    // renderItem memoized for performance
    const renderItem = useCallback(({ item } : {item : EnhancedPost}) => {
        return <EnhancedPostCard post={item} />;
    }, []);

    // getItemType prevents layout thrashing for mixed types
    const getItemType = useCallback(() => "post", []);

    return (
        <View className="flex-1 dark:bg-[#141A2E]">
            <Stack.Screen
                options={{
                    header: () => <FeedHeader />,
                }}
            />
            <AnimatedFlashList
                data={dummyPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemType={getItemType}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                ListHeaderComponent={<DailyPrompt />}
                ListFooterComponent={<View style={{ height: 80 }} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Optional intro dialog */}
            <Dialog
                visible={isVisible}
                onDismiss={() => console.log("dismissed")}
                panDirection={PanningProvider.Directions.DOWN}
                containerStyle={styles.roundedDialog}
            >
                <ViewUI spread>
                    <View className="flex h-16 items-center justify-center bg-[#242627]">
                        <Text className="text-xl text-white">✨ Welcome to Xolace! ✨</Text>
                    </View>
                    <ViewUI marginT-20 marginH-20 marginB-20>
                        <Text color="#6D1865" className="px-12 text-center font-medium">
                            You've just found your space. Your chosen campfires are ready, and
                            you're never alone here.
                        </Text>
                    </ViewUI>
                    <View className="mb-8 flex flex-row items-center justify-center gap-2">
                        <XolaceButton
                            size="sm"
                            label="Explore Campfires"
                            className="bg-[#242627]"
                            labelClassName="!text-xs !tracking-tight font-medium text-white"
                        />
                        <XolaceButton
                            size="sm"
                            label="Maybe Later"
                            className="bg-white"
                            labelClassName="!text-xs !tracking-tight font-medium"
                        />
                    </View>
                </ViewUI>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    roundedDialog: {
        backgroundColor: "#fff",
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12,
        position: "relative",
    },
});