import { useCallback, useMemo, useRef } from 'react';
import {  StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View as UiView} from 'react-native-ui-lib';
import { HeaderHandle } from './HeaderHandle';
import { dummyComments } from '../lib/dummy-data/comments';
import dummyPosts from '../lib/dummy-data/post';
import {CommentCard} from '../components/cards/CommentCard';
import CommentForm from '../components/forms/CommentForm';

import { PostMetrics } from './shared/PostMetrics';



// 
const keyExtractor = (item: any, index: number) => `${item.$id}.${index}`;



const PostBottomSheet = () => {
  const currentUserId = 'user_123'; // Replace with actual user ID from auth context
    // hooks
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const colorScheme = useColorScheme()

   // Post metric data
  const postMetricData = {
    id: dummyPosts[0].id,
    comments: [{ count: dummyPosts[0].comments_count }],
    created_by: dummyPosts[0].created_by,
    upvotes: dummyPosts[0].upvotes,
    downvotes: dummyPosts[0].downvotes,
  };

  
  // variables
  const snapPoints = useMemo(() => ['20%','50%', '80%'], []);

  // styles
  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: "black",
      borderTopWidth: colorScheme === "dark" ? 1 : 0,
    }),
    [colorScheme]
  );

  // styles
  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainer,
      paddingBottom: bottomSafeArea,
    }),
    [bottomSafeArea]
  );

  // render
const renderFlatListItem = useCallback(
    (item: any) => (
      <CommentCard key={item.item.id} comment={item.item} isExpanded={true} onToggleExpanded={()=>{}} onReply={(authorName: string, commentId: number) =>{}} postCreatedBy={''}/>
    ),
    []
  );


  // renders
  const renderHeaderHandle = useCallback(
   ( props : any ) =>( 
   <HeaderHandle {...props} >
          <>
            <UiView row center gap-50 marginT-10 className=''>
                   <PostMetrics  post={postMetricData} userId={currentUserId} />
                    {/* <UiView row centerV>
                        <Button
                        style={{marginRight: 3}}
                        text90
                        link
                        iconSource={()=> <FontAwesome5 name="comment" size={24} color={colorScheme === "dark" ? "white" : "black"} />}
                        />
                        <Text text90 $textDefault className="text-gray-600 dark:text-gray-400">123</Text>
                    </UiView> */}
            </UiView>

            <CommentForm />
          </>
   </HeaderHandle>
   ),
    [postMetricData]
  );

  return (
    

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animateOnMount={true}
        handleComponent={renderHeaderHandle}
        style={sheetStyle}
        backgroundStyle={{ backgroundColor: colorScheme === "dark" ? "#020617" : "white", borderTopColor: "white"}}
        handleIndicatorStyle={{ backgroundColor: colorScheme === "dark" ? "white" : "black"}}
      >
         
         <BottomSheetFlatList
        // {...rest}
        data={dummyComments}
        refreshing={false}
        // onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        bounces={true}
        windowSize={10}
        maxToRenderPerBatch={5}
        renderItem={renderFlatListItem}
        style={styles.container}
        keyboardDismissMode="interactive"
        indicatorStyle="black"
        contentContainerStyle={contentContainerStyle}
        // focusHook={useFocusEffect}
      />

      </BottomSheet>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    sheetContainer: {
      
      borderTopColor: "#333",
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.75,
      shadowRadius: 16.0,
  
      elevation: 24,
    },
    contentContainer: {
        paddingHorizontal: 0,
        overflow: 'visible',
      },
  });
  
  export default PostBottomSheet;