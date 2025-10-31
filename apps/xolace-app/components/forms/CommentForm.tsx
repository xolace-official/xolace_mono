import { useRef, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const APressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  onShouldSend?: (message: string) => void;
};

const CommentForm = ({ onShouldSend }: Props) => {
  const [message, setMessage] = useState('');
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const expandButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP,
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    console.log('Sending message:', message);
    setMessage('');
  };

  //   const onSelectCard = (text: string) => {
  //     console.log('Selected card:', text);
  //   };

  return (
    <>
      <KeyboardAwareScrollView bottomOffset={62}>
        <View>
          <View
            style={{ paddingBottom: 0, paddingTop: 10 }}
          >
            <View style={styles.row}>
              <APressable onPress={expandItems} style={[styles.roundBtn, expandButtonStyle]}>
          <Ionicons name="add" size={24} color={"grey"} />
        </APressable>

              <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <Pressable onPress={() => {}}>
            <Ionicons name="camera-outline" size={24} color={'grey'} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Ionicons name="image-outline" size={24} color={'grey'} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Ionicons name="folder-outline" size={24} color={'grey'} />
          </Pressable>
        </Animated.View>

              <TextInput
              className='text-black dark:text-white'
          autoFocus
          ref={inputRef}
          placeholder="Message"
          style={styles.messageInput}
          onFocus={collapseItems}
          onChangeText={onChangeText}
          value={message}
          multiline
        />
              {message.length > 0 ? (
                <Pressable onPress={onSend}>
                  <Ionicons name="arrow-up-circle" size={24} color={'grey'} />
                </Pressable>
              ) : (
                <Pressable>
                  <FontAwesome5 name="headphones" size={24} color={'grey'} />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: '#B8B3BA',
    borderStyle: 'dashed'
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#EEE9F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
export default CommentForm;
