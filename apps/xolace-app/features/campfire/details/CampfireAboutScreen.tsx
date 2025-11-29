import { useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { Alert, ScrollView, View } from 'react-native';

import { CampfireAboutContent } from './CampfireAboutContent';
import { CampfireGuideSheet } from './CampfireGuideSheet';
import { CampfireHeader } from './CampfireHeader';
import { MembershipSheet } from './MembershipSheet';
import {
  campfireDetailsMock,
  campfireGuideResourcesMock,
  campfireModeratorsMock,
  campfireRulesMock,
} from './dummy-data';

export function CampfireAboutScreen() {
  const membershipSheetRef = useRef<BottomSheet>(null);
  const guideSheetRef = useRef<BottomSheet>(null);

  const [isMember, setIsMember] = useState(campfireDetailsMock.isMember);

  const handleToggleJoin = () => {
    setIsMember((prev) => !prev);
  };

  const handleOpenMembership = () => {
    membershipSheetRef.current?.expand();
  };

  const handleLeave = () => {
    setIsMember(false);
    membershipSheetRef.current?.close();
  };

  const openGuide = () => {
    guideSheetRef.current?.expand();
  };

  return (
    <View className="bg-background flex-1 pb-16">
      {/* <CampfireCondensedBar
        visible={isCondensed}
        campfire={campfireDetailsMock}
        isMember={isMember}
        onJoinPress={handleToggleJoin}
        onMembershipPress={handleOpenMembership}
      /> */}
      <CampfireHeader
        campfire={campfireDetailsMock}
        isMember={isMember}
        memberRole={campfireDetailsMock.memberRole}
        showProfileCard={false}
        onToggleJoin={handleToggleJoin}
        onOpenMembership={handleOpenMembership}
        onOpenModTools={() =>
          Alert.alert('Mod Tools', 'Moderator tools coming soon.')
        }
      />

      <ScrollView className="mt-32 flex-1" showsVerticalScrollIndicator={false}>
        <CampfireAboutContent
          campfire={campfireDetailsMock}
          rules={campfireRulesMock}
          moderators={campfireModeratorsMock}
          onOpenGuide={openGuide}
        />
      </ScrollView>

      <MembershipSheet
        ref={membershipSheetRef}
        campfire={campfireDetailsMock}
        onLeave={handleLeave}
      />
      <CampfireGuideSheet
        ref={guideSheetRef}
        campfire={campfireDetailsMock}
        resources={campfireGuideResourcesMock}
        onClose={() => guideSheetRef.current?.close()}
      />
    </View>
  );
}
