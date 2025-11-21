import { useCallback } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import { PostMediaAttachment } from '../store/usePostDraftStore';

export const useSingleImagePicker = (
  onAttach: (media: PostMediaAttachment | null) => void,
) => {
  const pickImage = useCallback(async () => {
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
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: false,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        onAttach({
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
  }, [onAttach]);

  const removeImage = useCallback(() => onAttach(null), [onAttach]);

  return { pickImage, removeImage };
};
