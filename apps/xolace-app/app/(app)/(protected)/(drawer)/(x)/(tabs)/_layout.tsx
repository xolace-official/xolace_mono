import { Tabs } from 'expo-router';
import React, { FC, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { Platform, Animated as RNAnimated, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { FlameKindling, SettingsIcon, Telescope } from 'lucide-react-native';

import { UserCheck } from '@xolacekit/ui';

import PostCreateButton from '../../../../../../components/shared/PostCreateButton';
import { TabsContext } from '../../../../../../lib/providers/tabs-provider';

const _duration = 200;

export type RouteParams = {
  isBottomBlurVisible?: "true" | "false";
};

type AnimatedIconWrapperProps = {
  scale: SharedValue<number>;
};

const AnimatedIconWrapper: FC<PropsWithChildren<AnimatedIconWrapperProps>> = ({
  children,
  scale,
}) => {
  return (
    <Animated.View
      onTouchStart={() => {
        scale.value = withTiming(0.8);
      }}
      onTouchEnd={() => {
        scale.value = withTiming(1);
      }}
      style={{ transform: [{ scale }] }}
    >
      {children}
    </Animated.View>
  );
};

export default function TabsLayout() {

  const {
    tabBarHeight,
    tabBarPaddingBottom,
    isBottomBlurVisible,
    setIsBottomBlurVisible,
    setIsAddButtonVisible,
  } = useContext(TabsContext);

  const homeIconScale = useSharedValue(1);
  const discoveryIconScale = useSharedValue(1);
  const checkinIconScale = useSharedValue(1);
  const settingsIconScale = useSharedValue(1);

  const tabBarOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    RNAnimated.timing(tabBarOpacity, {
      toValue: isBottomBlurVisible ? 1 : 0.25,
      duration: _duration,
      useNativeDriver: true,
    }).start();
  }, [isBottomBlurVisible]);

  const rBlurContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0, { duration: _duration }),
    };
  });

  const rFabStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0.25, { duration: _duration }),
    };
  });

  return (
    <Tabs
      initialRouteName="(feed)"
      screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#D9D9D9",
          tabBarInactiveTintColor: "#D9D9D9",
          tabBarStyle: {
            position: "absolute",
            left: 0,
            bottom: 0,
            elevation: 0,
            overflow: "hidden",
            height: tabBarHeight,
            paddingTop: 8,
            paddingBottom: tabBarPaddingBottom,
            borderTopWidth: 0.5,
            borderColor: "rgba(255, 255, 255, 0.1)",
            opacity: tabBarOpacity,
          },
          tabBarBackground: () => (
            <Animated.View style={[StyleSheet.absoluteFillObject, rBlurContainerStyle]}>
              {Platform.OS === "ios" ? (
                <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFillObject} />
              ) : (
                <View className="absolute inset-0 bg-neutral-950/95" />
              )}
            </Animated.View>
          ),
        }}
        screenListeners={{
          tabPress: () => {
            setTimeout(() => {
              setIsBottomBlurVisible(true);
            }, 50);
          },
        }}
    >
      <Tabs.Screen
        name="(feed)"
        options={{
          title: 'Fireside',
          href: '/',
          tabBarIcon: ({ focused, color }) => {
            return (
              <AnimatedIconWrapper scale={homeIconScale}>
                <FlameKindling color={color} className="h-5" fill={focused ? color : undefined} />
              </AnimatedIconWrapper>
          )
          },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(discovery)"
        options={{
          title: 'Campfires',
          href: '/discovery',
          tabBarIcon: ({ focused, color }) => {
            return (
              <AnimatedIconWrapper scale={discoveryIconScale}>
                <Telescope color={color} className="h-5" fill={focused ? color : undefined} />
              </AnimatedIconWrapper>
            )
          },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="post-creation-screen"
        options={{
          title: 'Post Creation',
          tabBarButton: PostCreateButton,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(checkin)"
        options={{
          title: 'Checkin',
          href: '/checkin',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <AnimatedIconWrapper scale={checkinIconScale}>
                <UserCheck color={color} size={22} fill={focused ? color : undefined}/>
              </AnimatedIconWrapper>
            )
          },
        }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          href: '/settings',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <AnimatedIconWrapper scale={settingsIconScale}>
                <SettingsIcon color={color} size={22} fill={focused ? color : undefined}/>
              </AnimatedIconWrapper>
            )
          },
        }}
      />
    </Tabs>
  );
}
