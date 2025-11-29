import { View } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
} from '@xolacekit/ui';

import type { CampfireRule } from '../types';

export function CampfireRulesSection({ rules }: { rules: CampfireRule[] }) {
  if (!rules.length) return null;

  return (
    <View className="bg-muted/30 dark:bg-card rounded-3xl p-4">
      <Text className="text-foreground mb-1 text-base font-semibold">
        Campfire rules
      </Text>
      <Accordion type="single" collapsible defaultValue={rules[0]?.id}>
        {rules.map((rule, index) => (
          <AccordionItem key={rule.id} value={rule.id} className="border-0">
            <AccordionTrigger className="flex-row items-center justify-between px-2 py-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-foreground text-sm font-semibold">
                  {index + 1}. {rule.title}
                </Text>
              </View>
            </AccordionTrigger>
            <AccordionContent className="pr-6 pb-3">
              <Text className="text-muted-foreground text-sm leading-5">
                {rule.description}
              </Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </View>
  );
}
