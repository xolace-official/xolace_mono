import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Badge, Text, cn } from '@xolacekit/ui';
import { SettingsListItem } from '@xolacekit/ui/src/types/ui_types';

type SettingsSectionItemProps = {
  isLast: boolean;
  item: SettingsListItem;
};

export function SettingsSectionItem({
  item,
  isLast,
}: SettingsSectionItemProps) {
  const rowClassName = cn(
    'flex-row items-center gap-4 px-4 py-4',
    !isLast && 'border-b border-border/60',
    item.disabled && 'opacity-60',
  );

  const iconContainerClassName = cn(
    'h-12 w-12 items-center justify-center rounded-2xl',
    item.iconBackgroundClassName,
  );

  const content = (
    <>
      <View className={iconContainerClassName}>
        <item.icon color={item.iconColor} size={22} />
      </View>

      <View className={'flex-1 gap-1'}>
        <Text className={'text-base font-medium'}>{item.title}</Text>
        {item.description ? (
          <Text className={'text-sm text-muted-foreground'}>
            {item.description}
          </Text>
        ) : null}
      </View>

      {item.badge ? (
        <Badge
          className={'px-3 py-1'}
          variant={item.badge.variant ?? 'secondary'}
        >
          <Text className={'text-[11px] font-semibold uppercase tracking-wide'}>
            {item.badge.label}
          </Text>
        </Badge>
      ) : null}

      {item.href && !item.disabled ? (
        <ChevronRight color={'#71717a'} size={18} />
      ) : null}
    </>
  );

  if (item.href && !item.disabled) {
    return (
      <Link asChild href={item.href}>
        <Pressable className={cn(rowClassName, 'active:opacity-80')}>
          {content}
        </Pressable>
      </Link>
    );
  }

  return <View className={rowClassName}>{content}</View>;
}
