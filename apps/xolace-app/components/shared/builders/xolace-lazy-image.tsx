import React from 'react';

import { Image as ExpoImage } from 'expo-image';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface LazyImageProps {
  source: ImageSourcePropType | string;
  style?: StyleProp<ImageStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  contentPosition?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

const DEFAULT_BLUR_HASH = 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.';

export const XolaceLazyImage = React.memo<LazyImageProps>(
  ({
    source,
    style,
    contentFit = 'cover',
    contentPosition = 'center',
    placeholder,
    onLoad,
    onError,
  }) => {
    const blurHash = placeholder || DEFAULT_BLUR_HASH;

    return (
      <ExpoImage
        source={source}
        style={style}
        contentFit={contentFit}
        contentPosition={contentPosition as any}
        placeholder={{ blurhash: blurHash }}
        onLoad={onLoad}
        onError={onError}
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={typeof source === 'string' ? source : undefined}
      />
    );
  },
);

XolaceLazyImage.displayName = 'XolaceLazyImage';
