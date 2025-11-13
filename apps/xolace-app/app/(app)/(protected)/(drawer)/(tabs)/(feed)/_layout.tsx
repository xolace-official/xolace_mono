import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { useFeedFilter, useSetFeedFilter } from '@xolacekit/state';
import { Bell } from '@xolacekit/ui';
import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

import { FeedHeaderTitleDropdown } from '../../../../../../components/feed/feed-header-title-dropdown';

export default function Layout() {
  const { colorScheme } = useColorScheme();
  const selectedFilter = useFeedFilter();
  const setFeedFilter = useSetFeedFilter();
  return (
    <Stack
      screenOptions={{
        headerBlurEffect: 'regular',
        headerTransparent: true,
        headerStyle: {
          backgroundColor:
            colorScheme === 'dark'
              ? NAV_THEME.dark.colors.background
              : NAV_THEME.light.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Campfire',
          headerTitle: () => (
            <FeedHeaderTitleDropdown
              selected={selectedFilter}
              onSelect={setFeedFilter}
            />
          ),
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => (
            <View className="ml-2 flex flex-row">
              <Bell color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="glimpse"
        options={{
          title: 'Glimpses',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
