import { ComponentType, ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Badge, Text, cn } from '@xolacekit/ui';

type DrawerNavIcon = ComponentType<{
  color?: string;
  size?: number;
  className?: string;
}>;

export interface DrawerNavItemProps {
  label: string;
  icon: DrawerNavIcon;
  isActive?: boolean;
  onPress: () => void;
  isDarkMode?: boolean;
  badgeLabel?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  badgeClassName?: string;
  trailing?: ReactNode;
  depth?: number;
}

export function DrawerNavItem({
  label,
  icon: Icon,
  isActive = false,
  onPress,
  isDarkMode = false,
  badgeLabel,
  badgeVariant = 'default',
  badgeClassName,
  trailing,
  depth = 0,
}: DrawerNavItemProps) {
  const IconComponent = Icon;

  const iconColor = isActive
    ? isDarkMode
      ? '#111827'
      : '#111827'
    : isDarkMode
      ? '#E5E7EB'
      : '#374151';

  const textColor = isActive
    ? isDarkMode
      ? 'text-gray-900'
      : 'text-gray-900'
    : isDarkMode
      ? 'text-gray-200'
      : 'text-gray-700';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      className={cn(
        'flex-row items-center justify-between rounded-2xl px-4 py-3',
        isActive
          ? isDarkMode
            ? 'bg-white'
            : 'bg-gray-100'
          : 'bg-transparent',
      )}
      onPress={onPress}
      android_ripple={{
        color: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(17,24,39,0.08)',
      }}
      style={{ paddingLeft: depth > 0 ? 16 + depth * 8 : undefined }}
    >
      <View className="flex-row items-center gap-3">
        <View className="rounded-xl bg-transparent">
          <IconComponent color={iconColor} size={22} />
        </View>
        <Text className={cn('text-base font-semibold', textColor)}>
          {label}
        </Text>
        {badgeLabel ? (
          <Badge
            variant={badgeVariant}
            className={cn(
              'rounded-full px-2 py-0.5',
              badgeVariant === 'outline' && 'border-transparent bg-black/10',
              badgeClassName,
            )}
          >
            <Text className="text-xs font-bold uppercase tracking-wide">
              {badgeLabel}
            </Text>
          </Badge>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}
