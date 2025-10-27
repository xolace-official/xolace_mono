import { Tabs } from 'expo-router';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';

import { UserCheck } from '@xolacekit/ui';
import { Compass } from '@xolacekit/ui';

import PostCreateButton from '../../../../../components/shared/PostCreateButton';

export default function MainLayout() {
  return (
    <Tabs
      initialRouteName="(feed)"
      screenOptions={{
        animation: 'shift',
        tabBarStyle: { position: 'absolute' },
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tabs.Screen
        name="(feed)"
        options={{
          title: 'Home',
          href: '/',
          tabBarIcon: ({ color }) => <HomeIcon color={color} className="h-5" />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="discovery"
        options={{
          title: 'Campfires',
          href: '/discovery',
          tabBarIcon: ({ color }) => <Compass color={color} className="h-5" />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="post-creation-screen"
        options={{
          title: 'Post Creation',
          tabBarButton: PostCreateButton,
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            console.log('tabPress');
          },
        }}
      />

      <Tabs.Screen
        name="checkin"
        options={{
          title: 'Checkin',
          href: '/checkin',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <UserCheck color={color} className="h-5" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          href: '/settings',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} className="h-5" />
          ),
        }}
      />
    </Tabs>
  );
}
