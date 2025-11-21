import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Linking, Pressable, View } from 'react-native';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Text,
  cn,
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
  const snapPoints = useMemo(() => ['60%', '85%'], []);

  const handlePressResource = (url?: string) => {
    if (!url || !isValidUrl(url)) return;
    Linking.openURL(url);
  };

  const welcomeText =
    campfire.guideWelcomeMessage?.replace('{username}', 'you') ||
    'Welcome in! Here are quick sparks to help you settle into the campfire.';

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      onClose={onClose}
    >
      <BottomSheetView className="px-5 py-4">
        <View className="items-center gap-2 py-2">
          <Avatar className="h-16 w-16 bg-primary/10">
            {campfire.iconURL ? (
              <AvatarImage source={{ uri: campfire.iconURL }} />
            ) : null}
            <AvatarFallback>🔥</AvatarFallback>
          </Avatar>
          <Text className="text-lg font-semibold text-foreground">
            {campfire.name}
          </Text>
        </View>

        <View className="mt-4 rounded-3xl border border-border/60 bg-card/90 p-4">
          <Text className="text-sm leading-5 text-foreground">{welcomeText}</Text>
          <Text className="mt-2 text-xs text-muted-foreground">
            — {campfire.memberRole === 'firestarter' ? 'Firestarter team' : 'Campfire Mod Team'}
          </Text>
        </View>

        <View className="mt-5 gap-3">
          <View className="flex-row items-center gap-2">
            <BookOpen size={16} color="#f97316" />
            <Text className="text-sm font-semibold text-foreground">
              Resources
            </Text>
          </View>
          <View className="rounded-2xl border border-border/70 bg-card/80">
            {resources.map((resource, index) => {
              const valid = isValidUrl(resource.url);
              const isLast = index === resources.length - 1;
              return (
                <Pressable
                  key={resource.id}
                  onPress={() => handlePressResource(resource.url)}
                  disabled={!valid}
                  className={cn(
                    'flex-row items-center justify-between px-4 py-3',
                    !isLast && 'border-b border-border/60',
                    !valid && 'opacity-60',
                  )}
                >
                  <View className="flex-row items-center gap-3">
                    <Sparkles size={16} color="#f97316" />
                    <Text className="text-sm text-foreground">
                      {resource.title}
                    </Text>
                  </View>
                  {valid ? <ExternalLink size={16} color="#cbd5e1" /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Button
          className="mt-6 rounded-full bg-primary py-3"
          onPress={onClose}
        >
          <Text className="text-base font-semibold text-primary-foreground">
            Got it
          </Text>
        </Button>

        <Text className="mt-3 text-center text-xs text-muted-foreground">
          Access the campfire guide any time from the About tab.
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
});

CampfireGuideSheet.displayName = 'CampfireGuideSheet';
