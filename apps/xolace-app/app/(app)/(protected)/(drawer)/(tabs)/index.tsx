import { Text, View } from 'react-native';
import {
    useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useUserEmail } from '@xolacekit/state';

export default function HomePage() {
  const email = useUserEmail();

    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: progress.value * -100 }],
    }));

  return (
    <View className="flex flex-1 items-center justify-center">
      {/* Your code goes here */}
        <Animated.View
            style={[
                {
                    height: 100,
                    aspectRatio: 1,
                    backgroundColor: 'tomato',
                },
                animatedStyle,
            ]}
        />

      <Text>Email {email}</Text>
    </View>
  );
}
