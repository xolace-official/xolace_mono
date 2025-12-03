import { useHeaderHeight } from '@react-navigation/elements';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { useUser } from '@xolacekit/supabase';
import { SETTINGS_SECTIONS } from '@xolacekit/ui';
import type { UserClaims } from '@xolacekit/ui';

import { useHeaderBackground } from '../../lib/hooks/use-header-background';
import { LargeTitle } from '../shared/large-title';
import { SettingsProfileCard } from './settings-profile-card';
import { SettingsSectionCard } from './settings-section-card';
import { SignOutButton } from './sign-out-button';

export function SettingsPagesList() {
  const userQuery = useUser();
  const user = userQuery.data as UserClaims | null | undefined;

  // Why: Aligns top padding with actual navigation header height (incl. safe areas)
  // Ensures large title starts visually below the header and measures correctly
  const headerHeight = useHeaderHeight();

  // Shared value coordinating scroll position across header title and content animations
  // Single source of truth passed to LargeTitle and CommunitiesContent
  const offsetY = useSharedValue(0);

  // Worklet: runs on UI thread for 60fps updates
  // Minimal handler keeps GC pressure low and avoids unnecessary allocations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      offsetY.value = y;
    },
  });

  const { targetRef, onTargetLayout } = useHeaderBackground({ offsetY });

  return (
    <Animated.ScrollView
      className={'bg-background flex-1'}
      // Top padding = header height + 16px spacing so first content (LargeTitle) isn't obscured
      contentContainerStyle={{ paddingTop: headerHeight + 16 }}
      contentContainerClassName=""
      indicatorStyle="white"
      // Performance: ~60fps scroll events for smooth interpolation without flooding JS
      scrollEventThrottle={1000 / 60}
      onScroll={scrollHandler}
    >
      <LargeTitle title="Settings" offsetY={offsetY} className="mb-8 px-3" />
      <Animated.View
        ref={targetRef}
        onLayout={onTargetLayout}
        className={'flex-1 gap-6 px-4 py-2 pb-16'}
      >
        <SettingsProfileCard user={user} />

        {SETTINGS_SECTIONS.map((section) => (
          <SettingsSectionCard key={section.id} section={section} />
        ))}

        <SignOutButton
          variant={'ghost'}
          className={
            'border-border bg-card mt-0 w-full rounded-3xl border py-4'
          }
          textClassName={'text-destructive text-base font-semibold'}
        />
      </Animated.View>
    </Animated.ScrollView>
  );
}
