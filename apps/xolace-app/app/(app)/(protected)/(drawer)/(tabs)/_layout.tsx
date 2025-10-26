import { Tabs } from 'expo-router';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';
import PostCreateButton from "../../../../../components/shared/PostCreateButton";
import {Compass } from '@xolacekit/ui'

export default function MainLayout() {
  return (
    <Tabs initialRouteName="(feed)" screenOptions={{ animation: 'shift', tabBarStyle: {position: 'absolute'} }}>
      <Tabs.Screen
        name="(feed)"
        options={{
          title: 'Home',
          href: '/',
          tabBarIcon: () => <HomeIcon className="h-5" />,
          headerShown: false,
        }}
      />

        <Tabs.Screen
            name="discovery"
            options={{
                title: 'Campfires',
                href: '/discovery',
                tabBarIcon: () => < Compass className="h-5" />,
                headerShown: false,
            }}
        />

        <Tabs.Screen
            name="post-creation-screen"
            options={{
                title: 'Post Creation',
                tabBarButton:  PostCreateButton ,
                headerShown: false,
            }}
            listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    console.log('tabPress');
                } }}
        />


        <Tabs.Screen
            name="checkin"
            options={{
                title: 'Checkin',
                href: '/checkin',
                headerShown: false,
                tabBarIcon: () => <SettingsIcon className="h-5" />,
            }}
        />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          href: '/settings',
          headerShown: false,
          tabBarIcon: () => <SettingsIcon className="h-5" />,
        }}
      />
    </Tabs>
  );
}
