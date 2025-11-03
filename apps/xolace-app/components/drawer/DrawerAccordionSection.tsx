import { View } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Text,
  cn,
} from '@xolacekit/ui';

import { DrawerNavItem, DrawerNavItemProps } from './DrawerNavItem';

type DrawerAccordionItem = Pick<
  DrawerNavItemProps,
  | 'label'
  | 'icon'
  | 'onPress'
  | 'isActive'
  | 'badgeLabel'
  | 'badgeVariant'
  | 'badgeClassName'
>& { id: string };

export interface DrawerAccordionSectionProps {
  value: string;
  title: string;
  icon: DrawerNavItemProps['icon'];
  items: DrawerAccordionItem[];
  isDarkMode?: boolean;
  badgeLabel?: string;
  badgeClassName?: string;
  defaultOpen?: boolean;
}

export function DrawerAccordionSection({
  value,
  title,
  icon,
  items,
  isDarkMode = false,
  badgeLabel,
  badgeClassName,
  defaultOpen = true,
}: DrawerAccordionSectionProps) {
  const IconComponent = icon;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
    >
      <AccordionItem value={value} className="border-0">
        <AccordionTrigger
          className={cn(
            'items-center rounded-2xl pr-4 py-2',
            isDarkMode ? 'bg-white/5' : 'bg-gray-50',
          )}
        >
          <View className="flex-row items-center gap-3">
            <View
              className={cn(
                'rounded-2xl p-2',
                isDarkMode ? 'bg-white/10' : 'bg-gray-200',
              )}
            >
              <IconComponent
                color={isDarkMode ? '#F9FAFB' : '#111827'}
                size={18}
              />
            </View>
            <Text
              className={cn(
                'text-base font-semibold',
                isDarkMode ? 'text-white' : 'text-gray-900',
              )}
            >
              {title}
            </Text>
            {badgeLabel ? (
              <Badge
                className={cn(
                  'rounded-full bg-[#F472B6]/90 px-2 py-0.5',
                  badgeClassName,
                )}
                variant="secondary"
              >
                <Text className="text-xs font-bold tracking-wide text-white uppercase">
                  {badgeLabel}
                </Text>
              </Badge>
            ) : null}
          </View>
        </AccordionTrigger>
        <AccordionContent className="px-1 py-2 ml-4 border-l-2 border-gray-200 dark:border-gray-800">
          <View className="gap-2 rounded-2xl">
            {items.map((item) => (
              <DrawerNavItem
                key={item.id}
                {...item}
                isDarkMode={isDarkMode}
                depth={1}
              />
            ))}
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
