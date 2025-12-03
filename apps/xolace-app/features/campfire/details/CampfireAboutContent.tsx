import { View } from 'react-native';

import { CampfireAboutCard } from './sections/CampfireAboutCard';
import { CampfireGuideCard } from './sections/CampfireGuideCard';
import { CampfireModeratorsSection } from './sections/CampfireModeratorsSection';
import { CampfireRoleCard } from './sections/CampfireRoleCard';
import { CampfireRulesSection } from './sections/CampfireRulesSection';
import type { CampfireDetails, CampfireModerator, CampfireRule } from './types';

type CampfireAboutContentProps = {
  campfire: CampfireDetails;
  rules: CampfireRule[];
  moderators: CampfireModerator[];
  onOpenGuide: () => void;
};

export function CampfireAboutContent({
  campfire,
  rules,
  moderators,
  onOpenGuide,
}: CampfireAboutContentProps) {
  return (
    <View className="gap-4 px-4 pb-10">
      <CampfireAboutCard campfire={campfire} />
      {campfire.guideEnabled ? (
        <CampfireGuideCard onPress={onOpenGuide} />
      ) : null}
      <CampfireRoleCard campfire={campfire} />
      <CampfireRulesSection rules={rules} />
      <CampfireModeratorsSection moderators={moderators} />
    </View>
  );
}
