import { useCallback, useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Alert, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Text } from '@xolacekit/ui';

import { CommunitySelectorPill } from '../../../features/post/create/components/CommunitySelectorPill';
import { CreatePostHeader } from '../../../features/post/create/components/CreatePostHeader';
import { ExpirationBadge } from '../../../features/post/create/components/ExpirationBadge';
import { MoodPicker } from '../../../features/post/create/components/MoodPicker2';
import { PostComposerToolbar } from '../../../features/post/create/components/PostComposerToolbar';
import { PostMediaPreview } from '../../../features/post/create/components/PostMediaPreview';
import { PostTextFields } from '../../../features/post/create/components/PostTextFields';
import { PostToolsSheet } from '../../../features/post/create/components/PostToolsSheet';
import { usePostDraftStore } from '../../../features/post/create/store/usePostDraftStore';
import { MoodChip } from '../../../features/post/create/components/MoodChip';

const PostCreationScreen = () => {
  const router = useRouter();
  const moodPickerRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const title = usePostDraftStore((state) => state.title);
  const body = usePostDraftStore((state) => state.body);
  const setTitle = usePostDraftStore((state) => state.setTitle);
  const setBody = usePostDraftStore((state) => state.setBody);
  const community = usePostDraftStore((state) => state.community);
  const image = usePostDraftStore((state) => state.image);
  const moodKey = usePostDraftStore((state) => state.moodKey);
  const setMood = usePostDraftStore((state) => state.setMood);
  const attachImage = usePostDraftStore((state) => state.attachImage);
  const is24hOnly = usePostDraftStore((state) => state.is24hOnly);
  const setIs24hOnly = usePostDraftStore((state) => state.setIs24hOnly);
  const resetDraft = usePostDraftStore((state) => state.reset);

  const toolsSheetRef = useRef<BottomSheet>(null);

  const canSubmit = Boolean(title.trim() && community);

  const hasDraft = useMemo(
    () =>
      Boolean(
        title.trim() ||
          body.trim() ||
          community ||
          image ||
          is24hOnly ||
          moodKey,
      ),
    [body, community, image, is24hOnly, moodKey, title],
  );

  const handleClosePostForm = useCallback(() => {
    if (!hasDraft) {
      resetDraft();
      router.back();
      return;
    }

    Alert.alert('Discard draft?', 'Your current post draft will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          resetDraft();
          router.back();
        },
      },
    ]);
  }, [hasDraft, resetDraft, router]);

  const handleSubmitPostForm = useCallback(() => {
    Alert.alert(
      'Post coming soon',
      'Hook this up to Supabase when backend is ready.',
    );
  }, []);

  const handlePickImage = useCallback(async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission required',
          'We need access to your library to attach an image.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        attachImage({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
          mimeType: asset.mimeType ?? asset.type,
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Unable to pick media', 'Please try again in a moment.');
    }
  }, [attachImage]);

  const handleRemoveImage = useCallback(() => {
    attachImage(null);
  }, [attachImage]);

  const openToolsSheet = useCallback(() => {
    toolsSheetRef.current?.expand();
  }, []);

  const handleMoodPress = () => {
    moodPickerRef.current?.expand();
  };

  const handleRemoveMood = () => {
    setMood(null);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <CreatePostHeader
        canSubmit={canSubmit}
        onClose={handleClosePostForm}
        onSubmit={handleSubmitPostForm}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bottomOffset={32}
        extraKeyboardSpace={16}   
      >
        <View className="px-4">
          <CommunitySelectorPill
            onPress={() => router.push('/(app)/(protected)/post-to')}
          />

           {moodKey && <MoodChip moodId={moodKey} onRemove={handleRemoveMood} />}

          <PostTextFields
            title={title}
            body={body}
            onChangeTitle={setTitle}
            onChangeBody={setBody}
          />

         
          <ExpirationBadge visible={is24hOnly} />
          {!community && (
            <Text className="mt-4 text-sm text-muted-foreground">
              Choose a community to unlock the Post button.
            </Text>
          )}
          <PostMediaPreview media={image} onRemove={handleRemoveImage} />
        </View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView>
        <View
          className="pt-2 pb-5 border-t border-white/10 bg-background/95"
        >
          <PostComposerToolbar
            onPickImage={handlePickImage}
            onOpenTools={openToolsSheet}
            onMoodPress={handleMoodPress}
          />
        </View>
      </KeyboardStickyView>

      <PostToolsSheet
        ref={toolsSheetRef}
        is24h={is24hOnly}
        onToggle24h={setIs24hOnly}
      />
       <MoodPicker ref={moodPickerRef} />
    </SafeAreaView>
  );
};

export default PostCreationScreen;
