import React, {FC} from 'react';
import Animated, {
    AnimatedRef,
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {FlatList, View, StyleSheet, Pressable, useWindowDimensions} from "react-native";
import {OnboardingData} from "../../constants/onboarding-data";
import { scheduleOnRN} from "react-native-worklets";
import {colors} from "../../constants/onboarding-data";


type ButtonProps = {
    dataLength: number;
    scrollIndex: SharedValue<number>;
    scrollRef: AnimatedRef<FlatList<OnboardingData>>
    x: SharedValue<number>;
    onFinish?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


const OnboardingButton: FC<ButtonProps> = (
    {
        dataLength,
        scrollIndex,
        scrollRef,
        x,
        onFinish,
    }) => {


    const {width: SCREEN_WIDTH} = useWindowDimensions()
    const buttonScale = useSharedValue(1)

    const inputRange = colors.map((_, i) => i * SCREEN_WIDTH);

    const animatedStyle= useAnimatedStyle(()=> {
        const isLastIndex = scrollIndex .value === dataLength - 1

        // const backgroundColor = interpolateColor(
        //     x.value,
        //     [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        //     [inactiveColor, activeColor, inactiveColor]
        // );

        return {
            width: isLastIndex ? withSpring(140) : withSpring(60),
            height: 30,
            transform: [{scale: buttonScale.value}],
            backgroundColor: interpolateColor(x.value, inputRange, colors)
        };
    })


    const getStartedTextStyle= useAnimatedStyle(()=> {
        const isLastIndex = scrollIndex .value === dataLength - 1

        return {
            opacity: isLastIndex ? withTiming(1) : withTiming(0),
            transform: [{translateX: isLastIndex ? withTiming(0) : withTiming(-100)}],
        };
    })

    const skipTextStyle= useAnimatedStyle(()=> {
        const isLastIndex = scrollIndex .value === dataLength - 1

        return {
            opacity: isLastIndex ? withTiming(0) : withTiming(1),
            transform: [{translateX: isLastIndex ? withTiming(100) : withTiming(0)}],
        };
    })


    const handlePress = () => {
        console.log("onPress", dataLength)
        console.log("scroll ", scrollIndex)
        const isLastIndex = scrollIndex.value === dataLength - 1;

        if(!isLastIndex){
            scrollRef.current?.scrollToIndex({
                index: scrollIndex.value + 1,
                animated: true,
            });
        }else{
            if(onFinish){
                scheduleOnRN(onFinish)
            }else{console.log("finish")}
        }
    }


    const onPress = () =>{
        buttonScale.value = withSpring(0.95, {} , ()=> {
            (buttonScale.value = withSpring(1)),
                scheduleOnRN(handlePress)
        })
    }


    return (
        <View style={styles.container}>
            <AnimatedPressable onPress={onPress}>
                <Animated.View style={[styles.button, animatedStyle]}>
                    <Animated.Text style={[styles.text, getStartedTextStyle]}>Get Started</Animated.Text>
                    <Animated.Text style={[styles.text, skipTextStyle]}>Skip</Animated.Text>
                </Animated.View>


            </AnimatedPressable>
        </View>
    );
};

export default OnboardingButton;


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    button:{
        padding: 5,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    text:{
        color: "white",
        fontSize: 16,
        position: "absolute",
        fontWeight: "bold",
    },
    icon: {
        position: "absolute",
    }
})