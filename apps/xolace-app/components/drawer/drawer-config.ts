import {
  Compass,
  Flame,
  Gift,
  HeartPulse,
  LibraryBig,
  PlusCircle,
  Radio,
  Settings2,
  ShieldCheck,
  TvMinimalPlay,
} from 'lucide-react-native';

import type { DrawerNavItemProps } from './DrawerNavItem';

export type DrawerRouteItem = {
  id: string;
  label: string;
  href: string;
  icon: DrawerNavItemProps['icon'];
  badgeLabel?: string;
  badgeVariant?: DrawerNavItemProps['badgeVariant'];
  badgeClassName?: string;
};

export const PRIMARY_NAV_ITEMS: DrawerRouteItem[] = [
  { id: 'fireside', label: 'Fireside', href: '/', icon: Flame },

  {
    id: 'explore',
    label: 'Explore',
    href: '/(app)/(protected)/(drawer)/(tabs)/discovery',
    icon: Compass,
  },
  {
    id: 'channel',
    label: 'Channel',
    href: '/(app)/(protected)/(drawer)/channel',
    icon: Radio,
  },
  {
    id: 'collections',
    label: 'Collections',
    href: '/(app)/(protected)/(drawer)/collections',
    icon: LibraryBig,
  },
  {
    id: 'confide',
    label: 'Confide',
    href: '/(app)/(protected)/(drawer)/confide',
    icon: ShieldCheck,
    badgeLabel: 'New',
    badgeVariant: 'default',
    badgeClassName: 'bg-[#4338ca]',
  },
];

export const CAMPFIRE_ITEMS: DrawerRouteItem[] = [
  {
    id: 'campfire-create',
    label: 'Create Campfire',
    href: '/(app)/(protected)/(drawer)/campfire/create',
    icon: PlusCircle,
  },
  {
    id: 'campfire-manage',
    label: 'Manage Campfires',
    href: '/(app)/(protected)/(drawer)/campfire/manage',
    icon: Settings2,
  },
];

export const HEALTH_SPACE_ITEMS: DrawerRouteItem[] = [
  {
    id: 'health-tips',
    label: 'Health Tips',
    href: '/(app)/(protected)/(drawer)/campfire/discover',
    icon: HeartPulse,
    badgeLabel: 'New',
    badgeVariant: 'default',
    badgeClassName: 'bg-[#4338ca]',
  },
  {
    id: 'glimpse',
    label: 'Glimpse',
    href: '/(app)/(protected)/(drawer)/campfire/discover',
    icon: TvMinimalPlay,
    badgeLabel: 'New',
    badgeVariant: 'default',
    badgeClassName: 'bg-[#4338ca]',
  },
];

export const HEALTH_SPACE_ROUTE: DrawerRouteItem = {
  id: 'health-space',
  label: 'Health Space',
  href: '/(app)/(protected)/(drawer)/(tabs)/checkin',
  icon: HeartPulse,
};

export const WHATS_NEW_ACTION = {
  label: "See What's New",
  icon: Gift,
  href: '/(app)/(protected)/(drawer)/whats-new',
};
