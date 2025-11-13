import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { ChevronLeft, useColorScheme } from '@xolacekit/ui';

const BackButton = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable onPress={() => router.back()}>
      <ChevronLeft
        size={32}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    </Pressable>
  );
};

export default BackButton;
