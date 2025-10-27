import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MessageSquarePlus } from '@xolacekit/ui';

const PostCreateButton = () => {
  const handlePress = () => {
    impactAsync(ImpactFeedbackStyle.Light);
    router.push('/(app)/(protected)/post-creation');
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      className="left-[50%] h-16 w-16 items-center justify-center rounded-2xl bg-purple-500"
    >
      <MessageSquarePlus />
    </TouchableOpacity>
  );
};

export default PostCreateButton;

const styles = StyleSheet.create({
  button: {
    transform: [{ translateX: -20 }],
    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
  },
});
