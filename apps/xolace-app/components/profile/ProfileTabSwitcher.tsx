import { memo } from 'react';

import { Pressable, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';

import type { ProfileTabKey } from '../../lib/dummy-data/profile';

interface ProfileTabSwitcherProps {
  activeTab: ProfileTabKey;
  onChange: (tab: ProfileTabKey) => void;
  isDarkMode: boolean;
}

const tabs: Array<{ key: ProfileTabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'posts', label: 'Posts' },
];

function ProfileTabSwitcherComponent({
  activeTab,
  onChange,
  isDarkMode,
}: ProfileTabSwitcherProps) {
  return (
    <View
      className={cn(
        'flex-row items-center rounded-full p-1',
        isDarkMode ? 'bg-white/5' : 'bg-gray-100',
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className={cn(
              'flex-1 items-center rounded-full px-4 py-2',
              isActive
                ? isDarkMode
                  ? 'bg-white/20'
                  : 'bg-white shadow'
                : 'bg-transparent',
            )}
          >
            <Text
              className={cn(
                'text-sm font-semibold',
                isActive
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDarkMode
                    ? 'text-white/60'
                    : 'text-gray-500',
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const ProfileTabSwitcher = memo(ProfileTabSwitcherComponent);
