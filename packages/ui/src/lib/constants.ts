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

import { SettingsSectionConfig } from '../types/ui_types';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const FONTS = {
  regular: {
    fontFamily: WEB_FONT_STACK,
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: WEB_FONT_STACK,
    fontWeight: '500' as const,
  },
  bold: {
    fontFamily: WEB_FONT_STACK,
    fontWeight: '600' as const,
  },
  heavy: {
    fontFamily: WEB_FONT_STACK,
    fontWeight: '700' as const,
  },
};

export const NAV_THEME = {
  light: {
    dark: false,
    colors: {
      background: 'hsl(0 0% 100%)', // background
      border: 'hsl(240 5.9% 90%)', // border
      card: 'hsl(0 0% 100%)', // card
      notification: 'hsl(0 84.2% 60.2%)', // destructive
      primary: 'hsl(240 5.9% 10%)', // primary
      text: 'hsl(240 10% 3.9%)', // foreground
      new_badge: '#4338ca',
      beta_badge: '#F472B6',
      active_route: '#6a71ea',
    },
    fonts: FONTS,
  },
  dark: {
    dark: true,
    colors: {
      background: 'hsl(226, 39%, 13%)', // background
      border: 'hsl(240 3.7% 15.9%)', // border
      card: 'hsl(240 10% 3.9%)', // card
      notification: 'hsl(0 72% 51%)', // destructive
      primary: 'hsl(0 0% 98%)', // primary
      text: 'hsl(0 0% 98%)', // foreground
      new_badge: '#4338ca',
      beta_badge: '#F472B6',
      active_route: '#453fc3',
    },
    fonts: FONTS,
  },
};

export const SETTINGS_SECTIONS: SettingsSectionConfig[] = [
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
