import { memo } from 'react';

import { ChevronDown, Info } from 'lucide-react-native';
import { View } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
  cn,
} from '@xolacekit/ui';

import type { ProfileAboutItem } from '../../lib/dummy-data/profile';

interface ProfileAboutAccordionProps {
  items: ProfileAboutItem[];
  isDarkMode: boolean;
}

function ProfileAboutAccordionComponent({
  items,
  isDarkMode,
}: ProfileAboutAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="about"
      className={cn(
        'mb-2 rounded-3xl border px-4',
        isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white',
      )}
    >
      <AccordionItem value="about" className="border-0">
        <AccordionTrigger className="flex-row items-center justify-between py-4">
          <View className="flex-row items-center gap-3">
            <View
              className={cn(
                'h-9 w-9 items-center justify-center rounded-full',
                isDarkMode ? 'bg-white/10' : 'bg-gray-100',
              )}
            >
              <Info color={isDarkMode ? 'white' : 'black'} size={20} />
            </View>
            <View>
              <Text className="text-base font-semibold text-gray-900 dark:text-white">
                About
              </Text>
              <Text className="text-xs text-gray-500 dark:text-white/60">
                Small rituals that make the spark feel grounded.
              </Text>
            </View>
          </View>
          <ChevronDown
            size={18}
            color={isDarkMode ? '#f3f4f6' : '#1f2937'}
            strokeWidth={2}
            className="ml-2"
          />
        </AccordionTrigger>

        <AccordionContent className="pb-4 pt-1">
          <View className="gap-3">
            {items.map((item) => (
              <View
                key={item.id}
                className={cn(
                  'flex-row items-center justify-between rounded-2xl px-3 py-3',
                  isDarkMode ? 'bg-white/5' : 'bg-gray-50',
                )}
              >
                <View className="flex-1 pr-3">
                  <Text className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/40">
                    {item.label}
                  </Text>
                  <Text className="mt-1 text-base text-gray-900 dark:text-white">
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const ProfileAboutAccordion = memo(ProfileAboutAccordionComponent);
