import { Stack } from 'expo-router';
import { View } from 'react-native';

import { FileVideoCamera, Text } from '@xolacekit/ui';
import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

import BackButton from '../../../../../../../../components/shared/BackButton';

function GlimpseHeaderTitle() {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text className="text-lg font-bold">Discover Glimpses</Text>
      <Text className="text-muted-foreground text-xs">
        Glimpse: Real stories. Real voices.
      </Text>
    </View>
  );
}

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Discover Glimpses',
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <View className="ml-2 flex flex-row">
              <FileVideoCamera
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
          headerTitle: () => <GlimpseHeaderTitle />,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
}
