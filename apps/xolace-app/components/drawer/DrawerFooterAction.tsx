import { View } from 'react-native';

import { Button, Text, cn } from '@xolacekit/ui';

import type { DrawerNavItemProps } from './DrawerNavItem';

interface DrawerFooterActionProps {
  label: string;
  icon: DrawerNavItemProps['icon'];
  onPress: () => void;
  isDarkMode?: boolean;
}

export function DrawerFooterAction({
  label,
  icon,
  onPress,
  isDarkMode = false,
}: DrawerFooterActionProps) {
  const IconComponent = icon;

  return (
    <View
      className={cn(
        'mt-6 rounded-3xl border px-4 py-5',
        isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5',
      )}
    >
      <Button
        onPress={onPress}
        className={cn(
          'flex-row items-center gap-2 rounded-2xl bg-[#111827]',
          'px-5 py-4',
        )}
      >
        <IconComponent color="#FDE68A" size={20} />
        <Text className="text-base font-semibold text-white">{label}</Text>
      </Button>
    </View>
  );
}
