import { useCallback, useMemo, useRef } from 'react';

import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Alert, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@xolacekit/ui';

import { CreatePostHeader } from '../../../features/post/create/components/CreatePostHeader';
import { CommunitySelectorPill } from '../../../features/post/create/components/CommunitySelectorPill';
import { ExpirationBadge } from '../../../features/post/create/components/ExpirationBadge';
import { MoodPicker } from '../../../features/post/create/components/MoodPicker';
import { PostComposerToolbar } from '../../../features/post/create/components/PostComposerToolbar';
import { PostMediaPreview } from '../../../features/post/create/components/PostMediaPreview';
import { PostTextFields } from '../../../features/post/create/components/PostTextFields';
import { PostToolsSheet } from '../../../features/post/create/components/PostToolsSheet';
import { usePostDraftStore } from '../../../features/post/create/store/usePostDraftStore';

const PostCreationScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const title = usePostDraftStore((state) => state.title);
  const body = usePostDraftStore((state) => state.body);
  const setTitle = usePostDraftStore((state) => state.setTitle);
  const setBody = usePostDraftStore((state) => state.setBody);
  const community = usePostDraftStore((state) => state.community);
  const image = usePostDraftStore((state) => state.image);
  const moodKey = usePostDraftStore((state) => state.moodKey);
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

  const handleClose = useCallback(() => {
    if (!hasDraft) {
      resetDraft();
      router.back();
      return;
    }

    Alert.alert(
      'Discard draft?',
      'Your current post draft will be lost.',
      [
        { text: 'Keep editing', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            resetDraft();
            router.back();
          },
        },
      ],
    );
  }, [hasDraft, resetDraft, router]);

  const handleSubmit = useCallback(() => {
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

  const paddingBottom = Math.max(insets.bottom, 18);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <CreatePostHeader
        canSubmit={canSubmit}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bottomOffset={32}
        extraKeyboardSpace={16}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
      >
        <View className="px-4">
          <CommunitySelectorPill
            onPress={() => router.push('/(app)/(protected)/post-to')}
          />

          <PostTextFields
            title={title}
            body={body}
            onChangeTitle={setTitle}
            onChangeBody={setBody}
          />

          <MoodPicker />
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
          className="border-t border-white/10 bg-background/95 pb-3 pt-2"
          style={{ paddingBottom }}
        >
          <PostComposerToolbar
            onPickImage={handlePickImage}
            onOpenTools={openToolsSheet}
          />
        </View>
      </KeyboardStickyView>

      <PostToolsSheet
        ref={toolsSheetRef}
        is24h={is24hOnly}
        onToggle24h={setIs24hOnly}
      />
    </SafeAreaView>
  );
};

export default PostCreationScreen;
