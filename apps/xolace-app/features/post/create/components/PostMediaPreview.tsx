import { memo } from 'react';

import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

import type { PostMediaAttachment } from '../store/usePostDraftStore';

type PostMediaPreviewProps = {
  media: PostMediaAttachment | null;
  onRemove: () => void;
};

export const PostMediaPreview = memo(
  ({ media, onRemove }: PostMediaPreviewProps) => {
    if (!media) {
      return null;
    }

    return (
      <View className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <Image
          source={{ uri: media.uri }}
          className="aspect-square w-full bg-muted"
          contentFit="cover"
        />
        <Pressable
          onPress={onRemove}
          hitSlop={12}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2"
        >
          <X size={16} color="#fff" />
        </Pressable>
        <View className="px-4 py-2">
          <Text
            className="text-xs text-muted-foreground"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {media.mimeType ?? 'image'} • Tap tools to manage after upload
          </Text>
        </View>
      </View>
    );
  },
);

PostMediaPreview.displayName = 'PostMediaPreview';
