import React, {FC} from 'react';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    SharedValue,
    useAnimatedStyle, withSpring
} from "react-native-reanimated";
import {useWindowDimensions, View, StyleSheet} from "react-native";
import {colors} from "../../constants/onboarding-data";


type DotProps = {
    index: number;
    x: SharedValue<number>;
    activeColor?: string;
    inactiveColor?: string;
    activeSize?: number;
    inactiveSize?: number;
    activeWidth?: number;
    inactiveWidth?: number;
    dotStyle?: object;
    activeDotStyle?: object;
}

const Dot: FC<DotProps> = (
    {index,
        x,
        activeDotStyle={},
        activeColor= '#4527A0',
        activeSize = 25,
        dotStyle = {},
        inactiveColor = '#1995e3',
        inactiveSize = 10,
        activeWidth = 30,
        inactiveWidth = 10,
    }) => {


    const {width: SCREEN_WIDTH} = useWindowDimensions()

    const animationRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1 ) * SCREEN_WIDTH,
    ];

    const animatedStyle= useAnimatedStyle(()=> {

        const size = interpolate(
            x.value,
            animationRange,
            [inactiveSize,activeSize,inactiveSize],
            Extrapolation.CLAMP,
        );

        const opacity = interpolate(
            x.value,
            animationRange,
            [0.5 , 1 , 0.5],
            Extrapolation.CLAMP,
        );

        const scale = interpolate(
            x.value,
            animationRange,
            [0.8 , 1.2 , 0.8],
            Extrapolation.CLAMP,
        );

        const width = interpolate(
            x.value,
            animationRange,
            [inactiveWidth, activeWidth, inactiveWidth],
            Extrapolation.CLAMP,
        )


        return {
            width: withSpring(width),
            height: size,
            opacity: opacity,
            transform: [{scale: withSpring(scale, {damping: 15})}]
        };
    })



    const inputRange = colors.map((_, i) => i * SCREEN_WIDTH);

    const animatedColor= useAnimatedStyle(()=> {

        const backgroundColor = interpolateColor(x.value, inputRange, colors);

        return {backgroundColor: backgroundColor};
    })

    return (
        <View>
            <Animated.View
                style={[
                    styles.dots,
                    animatedColor,
                    animatedStyle,
                    dotStyle,
                    activeDotStyle,
                ]}

            />
        </View>
    );
};

export default Dot;

const styles = StyleSheet.create({
    dots: {
        marginHorizontal: 6,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
})