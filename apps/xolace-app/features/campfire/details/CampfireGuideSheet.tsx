import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Text,
  NAV_THEME,
  useColorScheme,
  ChevronRight,
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
          backgroundColor: isDarkColorScheme ? NAV_THEME.dark.colors.background : NAV_THEME.light.colors.background,
        }}
      >
        <BottomSheetScrollView className="px-6 pt-4 pb-5">
          <View className="items-center gap-3">
            <Avatar alt='avatar' className="w-16 h-16">
              <AvatarImage source={{ uri: campfire.iconURL }} />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500">
                <Text className="text-xl">🔥</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="text-xl font-semibold text-foreground">
              {campfire.name}
            </Text>
          </View>

          <View className="p-4 mt-4 rounded-2xl bg-muted/50 dark:bg-zinc-900">
            <Text className="text-sm text-foreground">{welcomeMessage}</Text>
            <Text className="mt-2 text-xs text-muted-foreground">
              - Campfire Mod Team
            </Text>
          </View>

          <View className="gap-2 mt-5">
            <Text className="text-sm font-semibold text-foreground">
              Resources
            </Text>
            {resources.map((resource) => {
              const tappable = isValidUrl(resource.url);
              return (
                <Pressable
                  key={resource.id}
                  disabled={!tappable}
                  onPress={() => handleResourcePress(resource.url)}
                  className={`flex-row items-center justify-between rounded-2xl px-3 py-2 bg-red-400 ${
                    tappable
                      ? 'active:opacity-80'
                      : 'opacity-60'
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <BookOpen
                      size={18}
                      className="text-muted-foreground"
                    />
                    <Text className="text-base text-foreground">
                      {resource.title}
                    </Text>
                  </View>
                  <View className="p-1 rounded-full bg-muted/60">
                    <ChevronRight
                      size={18}
                      className="text-muted-foreground"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View className="gap-3 mt-6">
            <Button
              className="rounded-full bg-primary"
              onPress={onClose}
              variant="default"
            >
              <Text className="text-base font-semibold text-primary-foreground">
                Got it
              </Text>
            </Button>
            <Text className="text-xs text-center text-muted-foreground">
              Access the campfire guide any time from the About tab.
            </Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
  );
});

CampfireGuideSheet.displayName = 'CampfireGuideSheet';
