import { Tabs } from 'expo-router';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';

export default function MainLayout() {
  return (
    <Tabs initialRouteName="(feed)">
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
