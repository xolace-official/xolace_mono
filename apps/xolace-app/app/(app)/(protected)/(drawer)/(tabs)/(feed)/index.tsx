import { Text, View, StyleSheet } from 'react-native';
import {
    useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useUserEmail } from '@xolacekit/state';
import FluxSignup from "../../../../../../components/icons/flux-signup";

import {Dialog, PanningProvider, View as ViewUI, Text as TextUI, Colors, Constants} from "react-native-ui-lib";
import {XolaceButton, Button} from "@xolacekit/ui";

// const SCROLL_TYPE = {
//     NONE: 'none',
//     VERTICAL: 'vertical',
//     HORIZONTAL: 'horizontal'
// };

export default function HomePage() {
  const email = useUserEmail();

    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: progress.value * -100 }],
    }));

    const isVisible = true
    const showHeader = true

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

        <Dialog
            visible={isVisible}
            onDismiss={() => console.log('dismissed')}
            panDirection={PanningProvider.Directions.DOWN}
            containerStyle={styles.roundedDialog}
        >
            <ViewUI spread >
                <View className={'h-16 bg-[#242627] flex justify-center items-center'}>
                    <Text className='text-white text-xl'>✨ Welcome to Xolace! ✨</Text>
                </View>
                <ViewUI marginT-20 marginH-20 marginB-20>
                    {/*<View className={'absolute -top-40'}><FluxSignup/></View>*/}
                    {/*<TextUI $textDefault marginT-20={!showHeader}>Get message</TextUI>*/}
                    <TextUI color={'#6D1865'} className={'text-center px-12 font-medium'}>You’ve just found your space. Your chosen campfires are
                        ready, and you’re never alone
                        here.
                    </TextUI>
                </ViewUI>

                <View className='flex flex-row justify-center items-center gap-2 mb-8'>
                    <XolaceButton size={'sm'} label={'Explore Campfires'} className='bg-[#242627]' labelClassName={'!text-xs !tracking-tight font-medium text-white'}/>
                    <XolaceButton size={'sm'} label={'Maybe Later'} className='bg-white'  labelClassName={'!text-xs !tracking-tight font-medium'}/>
                </View>
            </ViewUI>
        </Dialog>
    </View>
  );
}


const styles = StyleSheet.create({
    dialog: {
        backgroundColor: Colors.$backgroundDefault
    },
    roundedDialog: {
        backgroundColor: '#B8B8B8',
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12,
        position: 'relative',
    },
    button: {
        margin: 5,
        alignSelf: 'flex-start'
    },
    verticalScroll: {
        marginTop: 20
    },
    horizontalTextContainer: {
        alignSelf: 'center',
        position: 'absolute',
        top: 10
    }
});