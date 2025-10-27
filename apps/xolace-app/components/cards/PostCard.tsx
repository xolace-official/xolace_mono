// import { View, Text } from 'react-native'
import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Avatar, Button, Card, Text, View } from 'react-native-ui-lib';

const example = {
  title: 'Image with fade in animation',
  size: 40,
  animate: true,
  imageProps: { animationDuration: 500 },
  source: {
    uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg',
  },
};

const PostCard = ({ post }: { post: any }) => {
  const colorScheme = useColorScheme();

  return (
    <>
      <Card
        elevation={10}
        style={{ marginBottom: 30, borderRadius: 0 }}
        className="mt-10 border border-slate-200 bg-white shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-[#020617] dark:shadow-slate-800"
        onPress={() => router.push('/')}
      >
        {/* <Card.Section
                            imageSource={post.coverImage}
                            imageStyle={{height: 160}}
                        /> */}

        <View padding-20>
          <View row spread className="items-start">
            <View row marginB-10 className="items-center">
              <Avatar {...example} onPress={() => console.log('avatar')} />
              <Text text15 $textNeutral marginL-5 marginR-10>
                {post.title}
              </Text>
              <Text text90 $textDefault>
                {' '}
                | {post.timestamp}
              </Text>
            </View>

            <View>
              <Ionicons name="options-sharp" size={24} color="gray" />
            </View>
          </View>

          <Text marginB-20 text70 className="text-black dark:text-white">
            {post.description}
          </Text>

          <View row spread centerV>
            <View row>
              <View row marginR-20 centerV>
                <Button
                  style={{ marginRight: 3 }}
                  text90
                  link
                  iconSource={() => (
                    <FontAwesome5
                      name="heart"
                      size={24}
                      color={colorScheme === 'dark' ? 'white' : 'black'}
                    />
                  )}
                />
                <Text text90 className="text-gray-600 dark:text-gray-400">
                  {' '}
                  {post.likes}
                </Text>
              </View>
              <View row centerV>
                <Button
                  style={{ marginRight: 3 }}
                  text90
                  link
                  iconSource={() => (
                    <FontAwesome5
                      name="comment"
                      size={24}
                      color={colorScheme === 'dark' ? 'white' : 'black'}
                    />
                  )}
                />
                <Text
                  text90
                  $textDefault
                  className="text-gray-600 dark:text-gray-400"
                >
                  123
                </Text>
              </View>
            </View>

            <View row right>
              <Button text90 link label="Share" />
            </View>
          </View>
        </View>
      </Card>
    </>
  );
};

export default PostCard;
