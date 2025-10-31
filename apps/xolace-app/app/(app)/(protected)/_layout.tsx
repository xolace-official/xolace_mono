import { Stack } from 'expo-router';

const ProtectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="campfireSelection" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post-creation"
        options={{ title: 'Create Post', presentation: 'formSheet' }}
      />
      <Stack.Screen
        name="post/[id]"
        options={{ title: 'Post Details' }}
      />
    </Stack>
    
  );
};

export default ProtectedLayout;
