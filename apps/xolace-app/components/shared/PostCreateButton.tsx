import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { PressableScale } from 'pressto';
import { withUniwind } from 'uniwind';

import { MessageSquarePlus } from '@xolacekit/ui';

const StyledPressableScale = withUniwind(PressableScale);

const PostCreateButton = () => {
  const handlePress = () => {
    impactAsync(ImpactFeedbackStyle.Light);
    router.push('/(app)/(protected)/post-creation');
  };

  return (
    <StyledPressableScale
      style={styles.button}
      onPress={handlePress}
      className=" left-[19%] -top-[30%] h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 shadow-2xl"
    >
      <MessageSquarePlus />
    </StyledPressableScale>
  );
};

export default PostCreateButton;

const styles = StyleSheet.create({
  button: {
    transform: [{ translateX: -20 }],
    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
  },
});
