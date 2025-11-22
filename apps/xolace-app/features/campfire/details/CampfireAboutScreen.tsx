import { useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  campfireDetailsMock,
  campfireGuideResourcesMock,
  campfireModeratorsMock,
  campfireRulesMock,
} from './dummy-data';
import { CampfireAboutContent } from './CampfireAboutContent';
import { CampfireCondensedBar } from './CampfireCondensedBar';
import { CampfireGuideSheet } from './CampfireGuideSheet';
import { CampfireHeader } from './CampfireHeader';
import { MembershipSheet } from './MembershipSheet';

export function CampfireAboutScreen() {
  const membershipSheetRef = useRef<BottomSheet>(null);
  const guideSheetRef = useRef<BottomSheet>(null);

  const [isMember, setIsMember] = useState(campfireDetailsMock.isMember);
  const [isCondensed, setIsCondensed] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsCondensed(offsetY > 140);
  };

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
    <View className="flex-1 bg-background">
      <CampfireCondensedBar
        visible={isCondensed}
        campfire={campfireDetailsMock}
        isMember={isMember}
        onJoinPress={handleToggleJoin}
        onMembershipPress={handleOpenMembership}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <CampfireHeader
        campfire={campfireDetailsMock}
        isMember={isMember}
        memberRole={campfireDetailsMock.memberRole}
        onToggleJoin={handleToggleJoin}
        onOpenMembership={handleOpenMembership}
        onOpenModTools={() =>
          Alert.alert('Mod Tools', 'Moderator tools coming soon.')
        }
      />

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
