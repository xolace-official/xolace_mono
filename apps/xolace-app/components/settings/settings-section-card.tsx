import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

import { SettingsSectionConfig } from '@xolacekit/ui/src/types/ui_types';
import { SettingsSectionItem } from './settings-section-item';

type SettingsSectionCardProps = {
  section: SettingsSectionConfig;
};

export function SettingsSectionCard({ section }: SettingsSectionCardProps) {
  if (!section.items.length) {
    return null;
  }

  return (
    <View className={'gap-3'}>
      {section.title ? (
        <Text
          className={'text-xs font-semibold uppercase text-muted-foreground'}
        >
          {section.title}
        </Text>
      ) : null}

      <View
        className={'overflow-hidden rounded-3xl border border-border bg-card'}
      >
        {section.items.map((item, index) => (
          <SettingsSectionItem
            key={item.id}
            item={item}
            isLast={index === section.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
