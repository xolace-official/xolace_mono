import type { ForwardedRef } from 'react';
import { forwardRef, useMemo, useState } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Pressable, View } from 'react-native';
import { Bell, BellOff, LogOut } from 'lucide-react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Text,
  cn,
} from '@xolacekit/ui';

import type { CampfireDetails } from './types';

type MembershipSheetProps = {
  campfire: CampfireDetails;
  onLeave: () => void;
};

const notificationOptions = [
  { id: 'all', label: 'All new posts', icon: Bell },
  { id: 'popular', label: 'Highlights only', icon: Bell },
  { id: 'off', label: 'Off', icon: BellOff },
] as const;

export const MembershipSheet = forwardRef<
  BottomSheet,
  MembershipSheetProps
>(({ campfire, onLeave }, ref: ForwardedRef<BottomSheet>) => {
  const snapPoints = useMemo(() => ['32%'], []);
  const [preference, setPreference] = useState<'all' | 'popular' | 'off'>(
    'all',
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
    >
      <BottomSheetView className="px-5 py-4">
        <View className="items-center gap-2 py-2">
          <Avatar alt={campfire.name} className="w-12 h-12 bg-primary/10">
              <AvatarImage source={{ uri: campfire.iconURL }} />
            <AvatarFallback>
              <Text>🔥</Text>
            </AvatarFallback>
          </Avatar>
          <Text className="text-base font-semibold text-foreground">
            {campfire.name}
          </Text>
        </View>

        <View className="mt-4 border rounded-2xl border-border/60 bg-card/80">
          {notificationOptions.map(({ id, label, icon: Icon }, index) => {
            const isSelected = preference === id;
            const showDivider = index !== notificationOptions.length - 1;
            return (
              <Pressable
                key={id}
                onPress={() => setPreference(id)}
                className={cn(
                  'flex-row items-center justify-between px-4 py-3',
                  showDivider ? 'border-b border-border/60' : '',
                )}
              >
                <View className="flex-row items-center gap-3">
                  <Icon size={18} color="#f97316" />
                  <Text className="text-sm text-foreground">{label}</Text>
                </View>
                {isSelected ? (
                  <View className="w-3 h-3 rounded-full bg-primary" />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={onLeave}
          className="flex-row items-center justify-center gap-2 px-4 py-3 mt-4 rounded-full bg-destructive/10"
        >
          <LogOut size={18} color="#ef4444" />
          <Text className="text-sm font-semibold text-destructive">
            Leave this campfire
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
});

MembershipSheet.displayName = 'MembershipSheet';
