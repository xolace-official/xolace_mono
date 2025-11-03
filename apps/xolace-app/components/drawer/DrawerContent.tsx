import { useCallback, useMemo } from 'react';

import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { ChevronRight, Flame, HouseHeart } from 'lucide-react-native';
import { View } from 'react-native';

import { useColorScheme } from '@xolacekit/ui';
import { Text, cn } from '@xolacekit/ui';

import { DrawerAccordionSection } from './DrawerAccordionSection';
import { DrawerFooterAction } from './DrawerFooterAction';
import { DrawerHeader } from './DrawerHeader';
import { DrawerNavItem } from './DrawerNavItem';
import {
  CAMPFIRE_ITEMS,
  HEALTH_SPACE_ROUTE,
  PRIMARY_NAV_ITEMS,
  WHATS_NEW_ACTION,
  HEALTH_SPACE_ITEMS
} from './drawer-config';

function getRouteAliases(href: string): string[] {

  if(href.endsWith('/campfire/manage')){
    return ['/campfire/manage']
  }

  if (href.endsWith('/post-creation-screen')) {
    return [
      '/(app)/(protected)/(drawer)/(tabs)/post-creation-screen',
      '/(app)/(protected)/(drawer)/(tabs)/post-creation-screen/index',
    ];
  }

  return [href];
}

function isRouteActive(pathname: string, href: string) {
  const aliases = getRouteAliases(href);
  return aliases.some(
    (alias) =>
      pathname === alias ||
      pathname.startsWith(`${alias}/`) ||
      (alias === href && pathname === href),
  );
}

export function DrawerContent(props: DrawerContentComponentProps) {
  const pathname = usePathname();
  console.log('pathname ', pathname)
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const primaryItems = useMemo(
    () =>
      PRIMARY_NAV_ITEMS.map((item) => ({
        ...item,
        isActive: isRouteActive(pathname, item.href),
      })),
    [pathname],
  );

  const navigateTo = useCallback(
    (href: string) => {
      props.navigation.closeDrawer();
      requestAnimationFrame(() => {
        try {
          router.push(href as never);
        } catch (error) {
          console.warn('Navigation target is not ready yet:', href, error);
        }
      });
    },
    [props.navigation],
  );

  return (
    <>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingTop: 55,
        paddingBottom: 48,
        flexGrow: 1,
        backgroundColor: isDarkMode ? '#050505' : '#F9FAFB',
      }}
    >
      <View className="flex-1 px-1">
        <DrawerHeader
          isDarkMode={isDarkMode}
          onPressProfile={() =>
            navigateTo('/(app)/(protected)/(drawer)/(tabs)/settings/profile')
          }
        />

        <View className="gap-2">
          {primaryItems.map((item) => (
            <DrawerNavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={() => navigateTo(item.href)}
              isActive={item.isActive}
              isDarkMode={isDarkMode}
              badgeLabel={item.badgeLabel}
              badgeVariant={item.badgeVariant}
              badgeClassName={item.badgeClassName}
            />
          ))}
        </View>

        <View
          className={cn(
            'my-6 h-px',
            isDarkMode ? 'bg-white/10' : 'bg-gray-200',
          )}
        />

        <DrawerAccordionSection
          value="campfire"
          title="Campfire"
          icon={Flame}
          items={CAMPFIRE_ITEMS.map((item) => ({
            ...item,
            onPress: () => navigateTo(item.href),
            isActive: isRouteActive(pathname, item.href),
          }))}
          isDarkMode={isDarkMode}
          badgeLabel="Beta"
        />

        <DrawerAccordionSection
          value="health-space"
          title="Health Space"
          icon={HouseHeart}
          items={HEALTH_SPACE_ITEMS.map((item) => ({
            ...item,
            onPress: () => navigateTo(item.href),
            isActive: isRouteActive(pathname, item.href),
          }))}
          isDarkMode={isDarkMode}
        />
        
      </View>
    </DrawerContentScrollView>

    <View className='pb-10 bg-[#F9FAFB]  dark:bg-[#050505]'>
      <DrawerFooterAction
          label={WHATS_NEW_ACTION.label}
          icon={WHATS_NEW_ACTION.icon}
          onPress={() => navigateTo(WHATS_NEW_ACTION.href)}
          isDarkMode={isDarkMode}
        />

        <View className="px-2 mt-6 border border-transparent rounded-2xl">
          <Text
            className={cn(
              'text-center text-xs text-gray-500',
              isDarkMode && 'text-gray-400',
            )}
          >
            Handcrafted for your daily rituals. Stay curious ✨
          </Text>
        </View>
    </View>
    </>
  );
}
