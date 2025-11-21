import { View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

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
    <Accordion
      type="single"
      collapsible
      defaultValue={rules[0]?.id}
      className="rounded-3xl border border-border/60 bg-card/90 px-2"
    >
      {rules.map((rule, index) => (
        <AccordionItem key={rule.id} value={rule.id} className="border-0">
          <AccordionTrigger className="flex-row items-center justify-between px-2 py-3">
            <View className="flex-row items-center gap-3">
              <Text className="text-base font-semibold text-foreground">
                {index + 1}. {rule.title}
              </Text>
            </View>
            <ChevronDown size={16} color="#94a3b8" />
          </AccordionTrigger>
          <AccordionContent className="pb-3 pr-6">
            <Text className="text-sm leading-5 text-muted-foreground">
              {rule.description}
            </Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
