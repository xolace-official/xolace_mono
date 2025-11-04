import { memo } from 'react';

import { Pressable, View } from 'react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Text,
  cn,
} from '@xolacekit/ui';
import { ArrowDown01, LayoutGrid } from 'lucide-react-native';

import type { ProfileData, ProfileTabKey } from '../../lib/dummy-data/profile';
import { ProfileAboutAccordion } from './ProfileAboutAccordion';
import { ProfileTabSwitcher } from './ProfileTabSwitcher';

interface ProfileSheetHeaderProps {
  profile: ProfileData;
  activeTab: ProfileTabKey;
  onTabChange: (tab: ProfileTabKey) => void;
  isDarkMode: boolean;
  isExpanded: boolean;
}

function ProfileSheetHeaderComponent({
  profile,
  activeTab,
  onTabChange,
  isDarkMode,
  isExpanded,
}: ProfileSheetHeaderProps) {
  return (
    <View className={cn('gap-6', isExpanded ? 'pt-2' : 'pt-6')}>
      <View
        className={cn(
          'flex-row items-start gap-4 rounded-3xl border px-5 py-5',
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white',
        )}
      >
        <Avatar alt={profile.displayName} className="h-20 w-20">
          <AvatarImage source={{ uri: profile.avatarUrl }} />
          <AvatarFallback className="items-center justify-center bg-gray-200">
            <Text className="text-lg font-semibold uppercase text-gray-700">
              {profile.displayName.slice(0, 2)}
            </Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1">
          <View className="flex-row flex-wrap items-center gap-x-2">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.displayName}
            </Text>
            {profile.roleBadge ? (
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full px-2.5 py-0.5',
                  isDarkMode ? 'border-white/20 bg-white/10' : 'border-gray-200',
                )}
              >
                <Text className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-white/80">
                  {profile.roleBadge}
                </Text>
              </Badge>
            ) : null}
          </View>

          <Text className="mt-1 text-sm text-gray-500 dark:text-white/60">
            {profile.handle}
          </Text>

          <Text className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/50">
            {profile.statusText}
          </Text>

          <Text className="mt-2 text-base leading-relaxed text-gray-700 dark:text-white/70">
            {profile.bio}
          </Text>
        </View>
      </View>

      <ProfileAboutAccordion items={profile.about} isDarkMode={isDarkMode} />

      <View className="gap-4">
        <ProfileTabSwitcher
          activeTab={activeTab}
          onChange={onTabChange}
          isDarkMode={isDarkMode}
        />

        <View className="flex-row items-center justify-between px-1">
          <Pressable
            className={cn(
              'flex-row items-center gap-2 rounded-full border px-3 py-1.5',
              isDarkMode ? 'border-white/15 bg-white/5' : 'border-gray-200 bg-white',
            )}
          >
            <ArrowDown01
              size={16}
              color={isDarkMode ? '#f3f4f6' : '#1f2937'}
              strokeWidth={2}
            />
            <Text className="text-sm font-medium text-gray-700 dark:text-white/70">
              Sort by
            </Text>
            <Text className="text-xs uppercase tracking-wide text-gray-400 dark:text-white/40">
              Fresh
            </Text>
          </Pressable>

          <Pressable
            className={cn(
              'flex-row items-center gap-2 rounded-full border px-3 py-1.5',
              isDarkMode ? 'border-white/15 bg-white/5' : 'border-gray-200 bg-white',
            )}
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-white/70">
              View Format
            </Text>
            <LayoutGrid
              size={16}
              color={isDarkMode ? '#f3f4f6' : '#1f2937'}
              strokeWidth={2}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export const ProfileSheetHeader = memo(ProfileSheetHeaderComponent);
