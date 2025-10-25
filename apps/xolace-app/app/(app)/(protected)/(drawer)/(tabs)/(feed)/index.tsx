import { useDrawerProgress } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  Colors,
  Constants,
  Dialog,
  PanningProvider,
  Text as TextUI,
  View as ViewUI,
} from 'react-native-ui-lib';
import {SafeAreaView} from "react-native-safe-area-context";

import { useUserEmail } from '@xolacekit/state';
import { XolaceButton } from '@xolacekit/ui';

import {EnhancedPostCard} from "../../../../../../components/cards/EnhancedPostCard";
import PostCard from "../../../../../../components/cards/PostCard";
import dummyPosts from "../../../../../../lib/dummy-data/post";

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

  const isVisible = true;
  const post = {
        //   coverImage: localImageSource,
        $id: "1",
        title: "Amazing Desert",
        status: "Published",
        timestamp: "31 August 2016",
        description:
            "Reference this table when designing your app’s interface, and make sure",
        likes: 345,
      }

  return (
        <View className="flex flex-1 dark:bg-[#141A2E] ">
          {/* Your code goes here */}

          {/*<PostCard post={post}/>*/}

          <EnhancedPostCard post={dummyPosts[0]}/>
          <EnhancedPostCard post={dummyPosts[2]}/>


          {/*<Animated.View*/}
          {/*  style={[*/}
          {/*    {*/}
          {/*      height: 100,*/}
          {/*      aspectRatio: 1,*/}
          {/*      backgroundColor: 'tomato',*/}
          {/*    },*/}
          {/*    animatedStyle,*/}
          {/*  ]}*/}
          {/*/>*/}

          {/*<Text>Email {email}</Text>*/}

          <Dialog
            visible={isVisible}
            onDismiss={() => console.log('dismissed')}
            panDirection={PanningProvider.Directions.DOWN}
            containerStyle={styles.roundedDialog}
          >
            <ViewUI spread>
              <View
                className={'flex h-16 items-center justify-center bg-[#242627]'}
              >
                <Text className="text-xl text-white">✨ Welcome to Xolace! ✨</Text>
              </View>
              <ViewUI marginT-20 marginH-20 marginB-20>
                {/*<View className={'absolute -top-40'}><FluxSignup/></View>*/}
                {/*<TextUI $textDefault marginT-20={!showHeader}>Get message</TextUI>*/}
                <TextUI
                  color={'#6D1865'}
                  className={'px-12 text-center font-medium'}
                >
                  You’ve just found your space. Your chosen campfires are ready, and
                  you’re never alone here.
                </TextUI>
              </ViewUI>

              <View className="mb-8 flex flex-row items-center justify-center gap-2">
                <XolaceButton
                  size={'sm'}
                  label={'Explore Campfires'}
                  className="bg-[#242627]"
                  labelClassName={'!text-xs !tracking-tight font-medium text-white'}
                />
                <XolaceButton
                  size={'sm'}
                  label={'Maybe Later'}
                  className="bg-white"
                  labelClassName={'!text-xs !tracking-tight font-medium'}
                />
              </View>
            </ViewUI>
          </Dialog>
        </View>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.$backgroundDefault,
  },
  roundedDialog: {
    backgroundColor: '#fff',
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,
    position: 'relative',
    experimental_backgroundImage:
      'linear-gradient(to right, rgba(184, 184, 184, 0) 0%, rgba(184, 184, 184, 0.9) 100%)',
  },
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
  verticalScroll: {
    marginTop: 20,
  },
  horizontalTextContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
});
