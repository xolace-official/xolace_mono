import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ChevronLeft, useColorScheme } from '@xolacekit/ui';

const BackButton = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable onPress={() => router.back()} >
      <ChevronLeft
        size={32}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default BackButton;
