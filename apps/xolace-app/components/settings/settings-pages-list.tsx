import { Link } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import {
  HelpCircle,
  ListChecks,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Settings as SettingsIcon,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { useUser } from '@xolacekit/supabase';
import { BadgeProps } from '@xolacekit/ui';

import { SettingsProfileCard } from './settings-profile-card';
import { UserClaims } from './settings-profile-card';
import { SettingsSectionCard } from './settings-section-card';
import { SignOutButton } from './sign-out-button';

export type SettingsListItem = {
  badge?: {
    label: string;
    variant?: BadgeProps['variant'];
  };
  description?: string;
  disabled?: boolean;
  href?: React.ComponentProps<typeof Link>['href'];
  icon: LucideIcon;
  iconBackgroundClassName: string;
  iconColor: string;
  id: string;
  title: string;
};

export type SettingsSectionConfig = {
  id: string;
  items: SettingsListItem[];
  title?: string;
};

const SETTINGS_SECTIONS: SettingsSectionConfig[] = [
  {
    id: 'shortcuts',
    title: 'Shortcuts',
    items: [
      {
        id: 'lists',
        title: 'Lists',
        description: 'Curate spaces to revisit quickly.',
        icon: ListChecks,
        iconBackgroundClassName: 'bg-emerald-500/10',
        iconColor: '#22c55e',
        disabled: true,
        badge: {
          label: 'Soon',
          variant: 'secondary',
        },
      },
      {
        id: 'broadcasts',
        title: 'Broadcast messages',
        description: 'Share updates with everyone at once.',
        icon: Megaphone,
        iconBackgroundClassName: 'bg-sky-500/10',
        iconColor: '#0ea5e9',
        disabled: true,
        badge: {
          label: 'Soon',
          variant: 'secondary',
        },
      },
      {
        id: 'starred',
        title: 'Starred',
        description: 'Keep important posts within reach.',
        icon: Star,
        iconBackgroundClassName: 'bg-amber-500/10',
        iconColor: '#f59e0b',
        disabled: true,
      },
      {
        id: 'devices',
        title: 'Linked devices',
        description: 'Manage where your account is active.',
        icon: MonitorSmartphone,
        iconBackgroundClassName: 'bg-violet-500/10',
        iconColor: '#8b5cf6',
        disabled: true,
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & preferences',
    items: [
      {
        id: 'application',
        title: 'Application',
        description: 'Theme, accessibility, language.',
        href: '/settings/application',
        icon: SettingsIcon,
        iconBackgroundClassName: 'bg-sky-500/10',
        iconColor: '#0ea5e9',
      },
      {
        id: 'profile',
        title: 'Profile',
        description: 'Personal details, avatar, biography.',
        href: '/settings/profile',
        icon: UserRound,
        iconBackgroundClassName: 'bg-orange-500/10',
        iconColor: '#f97316',
      },
      {
        id: 'account-security',
        title: 'Account',
        description: 'Security, privacy, multi-factor auth.',
        href: '/settings/account',
        icon: ShieldCheck,
        iconBackgroundClassName: 'bg-emerald-500/10',
        iconColor: '#22c55e',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'help',
        title: 'Help & support',
        description: 'Guides, FAQs and troubleshooting.',
        icon: HelpCircle,
        iconBackgroundClassName: 'bg-indigo-500/10',
        iconColor: '#6366f1',
        disabled: true,
        badge: {
          label: 'Soon',
          variant: 'secondary',
        },
      },
      {
        id: 'feedback',
        title: 'Give feedback',
        description: 'Tell us how to improve your experience.',
        icon: MessageCircle,
        iconBackgroundClassName: 'bg-fuchsia-500/10',
        iconColor: '#d946ef',
        disabled: true,
        badge: {
          label: 'Soon',
          variant: 'secondary',
        },
      },
    ],
  },
];

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
