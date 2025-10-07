import { useState } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

import { getDocumentAsync } from 'expo-document-picker';
import { nanoid } from 'nanoid';
import { Image, View } from 'react-native';

import { Database, useSupabase } from '@xolacekit/supabase';
import { Button, Text } from '@xolacekit/ui';

const AVATARS_BUCKET = 'account_image';

export function UpdateProfilePictureForm(props: {
  pictureUrl: string | null;
  userId: string;
}) {
  const [pictureUrl, setPictureUrl] = useState<string | null>(props.pictureUrl);

  return (
    <View className={'flex-col justify-center gap-4'}>
      <PickImageButton
        userId={props.userId}
        pictureUrl={pictureUrl}
        onProfilePhotoUploaded={setPictureUrl}
      />
    </View>
  );
}

function ImagePreview(props: { url: string }) {
  return (
    <View>
      <Image
        className="flex h-20 w-20 rounded-full"
        source={{
          uri: props.url,
        }}
      />
    </View>
  );
}

function PickImageButton(props: {
  userId: string;
  pictureUrl: string | null;
  onProfilePhotoUploaded: (pictureUrl: string | null) => void;
}) {
  const [file, setFile] = useState<File>();
  const client = useSupabase();

  const pickImage = async () => {
    const result = await getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.assets) {
      return;
    }

    const asset = result.assets[0];

    if (!asset) {
      return;
    }

    if (!asset.file) {
      return;
    }

    setFile(asset.file);

    await onProfilePhotoUploaded({
      client,
      pictureUrl: props.pictureUrl,
      userId: props.userId,
      file: asset.file,
      onProfilePhotoUploaded: props.onProfilePhotoUploaded,
    });
  };

  if (file) {
    return (
      <View className="flex-col justify-center gap-4">
        <ImagePreview url={URL.createObjectURL(file)} />

        <Button
          variant={'outline'}
          onPress={() => {
            setFile(undefined);

            return onProfilePhotoUploaded({
              client,
              pictureUrl: props.pictureUrl,
              userId: props.userId,
              file: null,
              onProfilePhotoUploaded: props.onProfilePhotoUploaded,
            });
          }}
        >
          <Text>Clear</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-col justify-center gap-4">
      {props.pictureUrl ? <ImagePreview url={props.pictureUrl} /> : null}

      <Button size={'lg'} variant={'outline'} onPress={pickImage}>
        <Text>Pick a new profile picture</Text>
      </Button>
    </View>
  );
}

function onProfilePhotoUploaded(props: {
  client: SupabaseClient<Database>;
  pictureUrl: string | null;
  userId: string;
  file: File | null;
  onProfilePhotoUploaded: (pictureUrl: string | null) => void;
}) {
  const { client, pictureUrl, userId, file } = props;

  const removeExistingStorageFile = () => {
    if (pictureUrl) {
      return deleteProfilePhoto(client, pictureUrl) ?? Promise.resolve();
    }

    return Promise.resolve();
  };

  if (file) {
    const promise = () =>
      removeExistingStorageFile().then(() =>
        uploadUserProfilePhoto(client, file, userId).then((pictureUrl) => {
          return client
            .from('profiles')
            .update({
              avatar_url: pictureUrl,
            })
            .eq('id', userId)
            .throwOnError()
            .then((response) => {
              props.onProfilePhotoUploaded(pictureUrl);

              return response;
            });
        }),
      );

    return promise();
  } else {
    const promise = () =>
      removeExistingStorageFile().then(() => {
        return client
          .from('profiles')
          .update({
            avatar_url: null,
          })
          .eq('id', userId)
          .throwOnError()
          .then((response) => {
            props.onProfilePhotoUploaded(null);

            return response;
          });
      });

    return promise();
  }
}

function deleteProfilePhoto(client: SupabaseClient<Database>, url: string) {
  const bucket = client.storage.from(AVATARS_BUCKET);
  const fileName = url.split('/').pop()?.split('?')[0];

  if (!fileName) {
    return;
  }

  return bucket.remove([fileName]);
}

async function uploadUserProfilePhoto(
  client: SupabaseClient<Database>,
  photoFile: File,
  userId: string,
) {
  const bytes = await photoFile.arrayBuffer();
  const bucket = client.storage.from(AVATARS_BUCKET);
  const extension = photoFile.name.split('.').pop();
  const fileName = await getAvatarFileName(userId, extension);

  const result = await bucket.upload(fileName, bytes);

  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }

  throw result.error;
}

async function getAvatarFileName(
  userId: string,
  extension: string | undefined,
) {
  // we add a version to the URL to ensure
  // the browser always fetches the latest image
  const uniqueId = nanoid(16);

  return `${userId}.${extension}?v=${uniqueId}`;
}
