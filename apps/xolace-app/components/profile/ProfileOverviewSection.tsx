import { memo, useMemo } from 'react';

import { View } from 'react-native';

import { Card, Text, cn } from '@xolacekit/ui';

import type {
  ProfileData,
  ProfileFeat,
  ProfileStatItem,
} from '../../lib/dummy-data/profile';

interface ProfileOverviewSectionProps {
  profile: Pick<ProfileData, 'stats' | 'activeCommunities' | 'feats'>;
  isDarkMode: boolean;
}

function chunkStats(stats: ProfileStatItem[]): ProfileStatItem[][] {
  const result: ProfileStatItem[][] = [];
  for (let index = 0; index < stats.length; index += 2) {
    result.push(stats.slice(index, index + 2));
  }
  return result;
}

function renderFeat(feat: ProfileFeat, isDarkMode: boolean) {
  return (
    <View
      key={feat.id}
      className={cn(
        'flex-row items-start gap-3 rounded-3xl border px-4 py-3',
        isDarkMode ? 'border-white/15 bg-white/5' : 'border-gray-200 bg-gray-50',
      )}
      style={{ borderColor: feat.tone }}
    >
      <View
        className="mt-1 h-9 w-9 rounded-full"
        style={{ backgroundColor: feat.tone }}
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          {feat.label}
        </Text>
        {feat.description ? (
          <Text className="mt-1 text-sm text-gray-500 dark:text-white/60">
            {feat.description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function ProfileOverviewSectionComponent({
  profile,
  isDarkMode,
}: ProfileOverviewSectionProps) {
  const statRows = useMemo(() => chunkStats(profile.stats), [profile.stats]);

  return (
    <View className="gap-6">
      <Card
        className={cn(
          'rounded-3xl border p-5',
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white',
        )}
      >
        <Text className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/50">
          Snapshot
        </Text>

        <View className="mt-4 gap-5">
          {statRows.map((row, index) => (
            <View key={`stat-row-${index}`} className="flex-row gap-4">
              {row.map((stat) => (
                <View
                  key={stat.id}
                  className={cn(
                    'flex-1 rounded-2xl px-4 py-3',
                    isDarkMode ? 'bg-white/5' : 'bg-gray-50',
                  )}
                >
                  <Text className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/50">
                    {stat.label}
                  </Text>
                  <Text className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </Text>
                  {stat.helper ? (
                    <Text className="mt-1 text-xs text-gray-500 dark:text-white/50">
                      {stat.helper}
                    </Text>
                  ) : null}
                </View>
              ))}
              {row.length === 1 ? <View className="flex-1" /> : null}
            </View>
          ))}
        </View>
      </Card>

      <Card
        className={cn(
          'rounded-3xl border p-5',
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white',
        )}
      >
        <Text className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/50">
          Active In
        </Text>

        <View className="mt-4 flex-row flex-wrap gap-2">
          {profile.activeCommunities.map((community) => (
            <View
              key={community}
              className={cn(
                'rounded-full px-3 py-1',
                isDarkMode ? 'bg-white/10' : 'bg-indigo-50',
              )}
            >
              <Text
                className={cn(
                  'text-xs font-medium',
                  isDarkMode ? 'text-white' : 'text-indigo-800',
                )}
              >
                {community}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card
        className={cn(
          'rounded-3xl border p-5',
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white',
        )}
      >
        <Text className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/50">
          Featured Feats
        </Text>

        <View className="mt-5 gap-3">
          {profile.feats.map((feat) => renderFeat(feat, isDarkMode))}
        </View>
      </Card>
    </View>
  );
}

export const ProfileOverviewSection = memo(ProfileOverviewSectionComponent);
