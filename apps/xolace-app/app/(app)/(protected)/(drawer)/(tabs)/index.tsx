import { Text, View } from 'react-native';

import { useUserEmail } from '@xolacekit/state/dist';

export default function HomePage() {
  const email = useUserEmail();

  return (
    <View className="flex flex-1 items-center justify-center">
      {/* Your code goes here */}
      <Text>Email {email}</Text>
    </View>
  );
}
