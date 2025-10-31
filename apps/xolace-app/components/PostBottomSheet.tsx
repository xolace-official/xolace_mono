import { useCallback, useMemo, useRef } from 'react';
import {  StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View as UiView, Button, Text,} from 'react-native-ui-lib';
import { FontAwesome5 } from '@expo/vector-icons';
import { HeaderHandle } from './HeaderHandle';
import { dummyComments, NestedComment } from '../lib/dummy-data/comments';
import {CommentCard} from '../components/cards/CommentCard';
import CommentForm from '../components/forms/CommentForm';



// 
const keyExtractor = (item: any, index: number) => `${item.$id}.${index}`;



const PostBottomSheet = () => {
    // hooks
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const colorScheme = useColorScheme()

  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

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
            <UiView row center gap-50 marginT-10>
                    <UiView row  centerV>

                            <Button
                            style={{marginRight: 3}}
                            text90
                            link
                            iconSource={()=> <FontAwesome5 name="heart" size={24} color={colorScheme === "dark" ? "white" : "black"} />}
                            />
                        <Text text90 className="text-gray-600 dark:text-gray-400"> 11k</Text>
                    </UiView>
                    <UiView row centerV>
                        <Button
                        style={{marginRight: 3}}
                        text90
                        link
                        iconSource={()=> <FontAwesome5 name="comment" size={24} color={colorScheme === "dark" ? "white" : "black"} />}
                        />
                        <Text text90 $textDefault className="text-gray-600 dark:text-gray-400">123</Text>
                    </UiView>
            </UiView>

            <CommentForm />
          </>
   </HeaderHandle>
   ),
    [colorScheme]
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
      padding: 24,
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
        paddingHorizontal: 16,
        overflow: 'visible',
      },
  });
  
  export default PostBottomSheet;