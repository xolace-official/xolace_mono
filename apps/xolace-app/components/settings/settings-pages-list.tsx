import { ScrollView, View } from 'react-native';

import { useUser } from '@xolacekit/supabase';
import { SETTINGS_SECTIONS } from '@xolacekit/ui';
import type { UserClaims } from '@xolacekit/ui';

import { SettingsProfileCard } from './settings-profile-card';
import { SettingsSectionCard } from './settings-section-card';
import { SignOutButton } from './sign-out-button';

export function SettingsPagesList() {
  const userQuery = useUser();
  const user = userQuery.data as UserClaims | null | undefined;

  return (
    <ScrollView
      className={'flex-1 bg-background'}
      contentInsetAdjustmentBehavior={'automatic'}
    >
      <View className={'flex-1 gap-6 px-4 py-2 pb-16'}>
        <SettingsProfileCard user={user} />

        {SETTINGS_SECTIONS.map((section) => (
          <SettingsSectionCard key={section.id} section={section} />
        ))}

        <SignOutButton
          variant={'ghost'}
          className={
            'mt-0 w-full rounded-3xl border border-border bg-card py-4'
          }
          textClassName={'text-destructive text-base font-semibold'}
        />
      </View>
    </ScrollView>
  );
}
