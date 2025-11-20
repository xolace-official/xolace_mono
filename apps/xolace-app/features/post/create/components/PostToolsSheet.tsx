import { forwardRef, useMemo } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import { Badge, NAV_THEME, Switch, Text, useColorScheme } from '@xolacekit/ui';

type PostToolsSheetProps = {
  is24h: boolean;
  onToggle24h: (value: boolean) => void;
};

export const PostToolsSheet = forwardRef<BottomSheet, PostToolsSheetProps>(
  ({ is24h, onToggle24h }, ref) => {
    const snapPoints = useMemo(() => [320], []);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.4}
          />
        )}
        backgroundStyle={{
          backgroundColor: isDark
            ? NAV_THEME.dark.colors.background
            : NAV_THEME.light.colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? '#52525b' : '#d4d4d8',
        }}
      >
        <BottomSheetView className="flex-1 px-6 py-5">
          <Text className="text-2xl font-semibold text-foreground">
            Post tools
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Keep things temporary or special.
          </Text>

          <View className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 dark:bg-white/5">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-base font-semibold text-foreground">
                  Auto-delete after 24 hours
                </Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  We&apos;ll expire the post automatically.
                </Text>
              </View>
              <Switch checked={is24h} onCheckedChange={onToggle24h} />
            </View>
          </View>

          <View className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 opacity-60 dark:bg-white/5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-foreground">
                Polls
              </Text>
              <Badge variant="secondary" className="bg-white/10">
                <Text className="text-xs font-semibold text-secondary-foreground">
                  Soon
                </Text>
              </Badge>
            </View>
            <Text className="mt-1 text-sm text-muted-foreground">
              Poll (coming soon)
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

PostToolsSheet.displayName = 'PostToolsSheet';
