import { useEffect } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { StyleSheet } from 'react-native';
import { Avatar, Text as UiText, View as UiView } from 'react-native-ui-lib';

import { LibraryBig } from '@xolacekit/ui';

const example = {
  title: 'Image with fade in animation',
  size: 40,
  animate: true,
  imageProps: { animationDuration: 500 },
  source: {
    uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg',
  },
};

const CustomDrawerContent = (props: any) => {
  const path = usePathname();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const getBackgroundColor = (targetPath: string) => {
    if (path === targetPath) {
      return colorScheme === 'dark' ? '#fff' : '#333';
    }
    return colorScheme === 'dark' ? 'transparent' : 'transparent';
  };

  const getLabelColor = (targetPath: string) => {
    if (path === targetPath) {
      return colorScheme === 'dark' ? '#333' : '#fff';
    }
    return colorScheme === 'dark' ? '#fff' : '#111';
  };

  const getIconColor = (targetPath: string) => {
    if (path === targetPath) {
      return colorScheme === 'dark' ? '#333' : '#fff';
    }
    return colorScheme === 'dark' ? '#fff' : '#111';
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: colorScheme === 'dark' ? '#111' : '#fff',
        position: 'relative',
      }}
    >
      <UiView
        paddingL-15
        marginB-30
        paddingV-15
        className="border-b-[1px] border-gray-500 border-opacity-50 dark:border-gray-700"
      >
        <Avatar {...example} onPress={() => console.log('avatar')} />
        <UiText marginT-7 className="text-black dark:text-gray-400">
          @user1
        </UiText>
      </UiView>

      {/*<DrawerItem*/}
      {/*    icon={({ color, size, focused})=>(*/}
      {/*        <MaterialCommunityIcons name="human-greeting-variant"*/}
      {/*                                size={24}*/}
      {/*                                color={getIconColor('/profile')} />*/}
      {/*    )}*/}
      {/*    label={"Profile"}*/}
      {/*    labelStyle={[styles.navItemLabel, {color : getLabelColor('/profile')}]}*/}
      {/*    style={{ backgroundColor: getBackgroundColor('/profile')}}*/}
      {/*    onPress={()=> router.push("/(drawer)/(tabs)/(settings)/profile")}*/}
      {/*/>*/}

      <DrawerItem
        icon={({ focused }) => (
          <MaterialIcons
            name="app-settings-alt"
            size={focused ? 24 : 20}
            color={getIconColor('/')}
          />
        )}
        label={'Feed'}
        labelStyle={[styles.navItemLabel, { color: getLabelColor('/') }]}
        style={{ backgroundColor: getBackgroundColor('/') }}
        onPress={() => router.push('/')}
      />

      <DrawerItem
        icon={({ focused }) => (
          <LibraryBig
            size={focused ? 24 : 20}
            color={getIconColor('/collections')}
          />
        )}
        label={'Collections'}
        labelStyle={[
          styles.navItemLabel,
          { color: getLabelColor('/collections') },
        ]}
        style={{ backgroundColor: getBackgroundColor('/collections') }}
        onPress={() => router.push('/(app)/(protected)/(drawer)/collections')}
      />

      <DrawerItem
        icon={({ focused }) => (
          <MaterialIcons
            name="app-settings-alt"
            size={focused ? 24 : 15}
            color={getIconColor('/logout')}
          />
        )}
        label={'Logout'}
        labelStyle={[styles.navItemLabel, { color: getLabelColor('/logout') }]}
        style={{ position: 'absolute', bottom: 40, left: 0, right: 0 }}
        onPress={() => router.push('/(app)/auth/sign-in')}
      />
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}
    />
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: 5,
    fontSize: 18,
  },
});
