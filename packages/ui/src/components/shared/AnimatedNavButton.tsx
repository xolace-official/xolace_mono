import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    interpolateColor,
    SharedValue,
} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { scheduleOnRN } from 'react-native-worklets';

type NavButtonProps = {
    direction: 'left' | 'right';
    x: SharedValue<number>;
    colors: string[];
    inputRange: number[];
    scaleValue: SharedValue<number>;
    onPress: () => void;
    disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

export const AnimatedNavButton: FC<NavButtonProps> = ({
                                           direction,
                                           x,
                                           colors,
                                           inputRange,
                                           scaleValue,
                                           onPress,
                                           disabled = false,
                                       }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: interpolateColor(x.value, inputRange, colors),
        transform: [{ scale: scaleValue.value }],
        opacity: disabled ? 0 : 1,
    }));

    const handlePress = () => {
        // Animate the scale (shrink → grow) and trigger the action
        scaleValue.value = withSpring(0.95, {}, () => {
            scaleValue.value = withSpring(1);
            scheduleOnRN(onPress);
        });
    };

    return (
        <AnimatedPressable onPress={handlePress} disabled={disabled}>
            <Animated.View style={[styles.button, animatedStyle]}>
                <AnimatedIcon
                    name={direction === 'left' ? 'arrow-left' : 'arrow-right'}
                    size={20}
                    color="white"
                />
            </Animated.View>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    button: {
        overflow: 'hidden',
    },
});
