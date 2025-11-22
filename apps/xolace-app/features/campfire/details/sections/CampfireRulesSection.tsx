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
    <View className='p-4 rounded-3xl bg-muted/30 dark:bg-card' >
       <Text className="mb-1 text-base font-semibold text-foreground">
          Campfire rules
        </Text>
      <Accordion
      type="single"
      collapsible
      defaultValue={rules[0]?.id}
      
    >
      {rules.map((rule, index) => (
        <AccordionItem key={rule.id} value={rule.id} className="border-0">
          <AccordionTrigger className="flex-row items-center justify-between px-2 py-3">
            <View className="flex-row items-center gap-3">
              <Text className="text-sm font-semibold text-foreground">
                {index + 1}. {rule.title}
              </Text>
            </View>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pr-6">
            <Text className="text-sm leading-5 text-muted-foreground">
              {rule.description}
            </Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </View>
  );
}
