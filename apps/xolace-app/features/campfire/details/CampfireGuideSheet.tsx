import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BookOpen } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ChevronRight,
  NAV_THEME,
  Text,
  useColorScheme,
} from '@xolacekit/ui';

import type { CampfireDetails, CampfireGuideResource } from './types';

type CampfireGuideSheetProps = {
  campfire: CampfireDetails;
  resources: CampfireGuideResource[];
  onClose?: () => void;
};

const isValidUrl = (url?: string) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const CampfireGuideSheet = forwardRef<
  BottomSheet,
  CampfireGuideSheetProps
>(({ campfire, resources, onClose }, ref: ForwardedRef<BottomSheet>) => {
  const { isDarkColorScheme } = useColorScheme();
  const snapPoints = useMemo(() => ['65%'], []);

  const handleResourcePress = (url?: string) => {
    if (!url || !isValidUrl(url)) return;
    Linking.openURL(url);
  };

  const welcomeMessage =
    campfire.guideWelcomeMessage?.replace('{username}', 'you') ||
    'Welcome in! Here are quick sparks to help you settle into the campfire.';

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      detached
      bottomInset={87}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
        />
      )}
      backgroundStyle={{
        backgroundColor: isDarkColorScheme
          ? NAV_THEME.dark.colors.background
          : NAV_THEME.light.colors.background,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDarkColorScheme
          ? NAV_THEME.dark.colors.background
          : NAV_THEME.light.colors.background,
      }}
    >
      <BottomSheetScrollView className="px-6 pt-4 pb-5">
        <View className="items-center gap-3">
          <Avatar alt="avatar" className="h-16 w-16">
            <AvatarImage source={{ uri: campfire.iconURL }} />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500">
              <Text className="text-xl">🔥</Text>
            </AvatarFallback>
          </Avatar>
          <Text className="text-foreground text-xl font-semibold">
            {campfire.name}
          </Text>
        </View>

        <View className="bg-muted/50 mt-4 rounded-2xl p-4 dark:bg-zinc-900">
          <Text className="text-foreground text-sm">{welcomeMessage}</Text>
          <Text className="text-muted-foreground mt-2 text-xs">
            - Campfire Mod Team
          </Text>
        </View>

        <View className="mt-5 gap-2">
          <Text className="text-foreground text-sm font-semibold">
            Resources
          </Text>
          {resources.map((resource) => {
            const tappable = isValidUrl(resource.url);
            return (
              <Pressable
                key={resource.id}
                disabled={!tappable}
                onPress={() => handleResourcePress(resource.url)}
                className={`flex-row items-center justify-between rounded-2xl bg-red-400 px-3 py-2 ${
                  tappable ? 'active:opacity-80' : 'opacity-60'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <BookOpen size={18} className="text-muted-foreground" />
                  <Text className="text-foreground text-base">
                    {resource.title}
                  </Text>
                </View>
                <View className="bg-muted/60 rounded-full p-1">
                  <ChevronRight size={18} className="text-muted-foreground" />
                </View>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-6 gap-3">
          <Button
            className="bg-primary rounded-full"
            onPress={onClose}
            variant="default"
          >
            <Text className="text-primary-foreground text-base font-semibold">
              Got it
            </Text>
          </Button>
          <Text className="text-muted-foreground text-center text-xs">
            Access the campfire guide any time from the About tab.
          </Text>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

CampfireGuideSheet.displayName = 'CampfireGuideSheet';
