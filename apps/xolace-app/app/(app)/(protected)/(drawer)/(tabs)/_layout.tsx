import { Tabs } from 'expo-router';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function MainLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/',
          tabBarIcon: () => <HomeIcon className="h-5" />,
            headerLeft: ()=>(
                <DrawerToggleButton/>
            )
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
