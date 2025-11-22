import { useEffect, useMemo, useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';

import { Text } from '@xolacekit/ui';

import {
  campfireDetailsMock,
  campfireFilters,
  campfireGuideResourcesMock,
  campfireHighlightsMock,
  campfirePostsMock,
} from './dummy-data';
import { CampfireCondensedBar } from './CampfireCondensedBar';
import { CampfireFilterChips } from './CampfireFilterChips';
import { CampfireGuideSheet } from './CampfireGuideSheet';
import { CampfireHeader } from './CampfireHeader';
import { CampfireHighlights } from './CampfireHighlights';
import { CampfirePostsList } from './CampfirePostsList';
import { MembershipSheet } from './MembershipSheet';

export function CampfireDetailsScreen() {
  const router = useRouter();
  const membershipSheetRef = useRef<BottomSheet>(null);
  const guideSheetRef = useRef<BottomSheet>(null);

  const [isMember, setIsMember] = useState(campfireDetailsMock.isMember);
  const [isCondensed, setIsCondensed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(campfireFilters[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return campfirePostsMock;
    if (activeFilter === 'Help') {
      return campfirePostsMock.filter((post) =>
        post.posttags.some((tag) => tag.name.toLowerCase().includes('help')),
      );
    }
    if (activeFilter === 'Highlights') {
      return campfirePostsMock.slice(0, 3);
    }
    return campfirePostsMock;
  }, [activeFilter]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsCondensed(offsetY > 180);
  };

  const handleToggleJoin = () => {
    setIsMember((prev) => !prev);
    if (!isMember && campfireDetailsMock.guideShowOnJoin) {
      guideSheetRef.current?.expand();
    }
  };

  const handleOpenMembership = () => {
    membershipSheetRef.current?.expand();
  };

  const handleLeave = () => {
    setIsMember(false);
    membershipSheetRef.current?.close();
  };

  const handleOpenGuide = () => {
    guideSheetRef.current?.expand();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const NavHeader = () => (

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

  );

  const ListHeader = () => {
    return(
      <>
      <Pressable
        onPress={() => router.push('/x/health/about')}
        className="flex-row items-center gap-2 px-4 py-2 mx-4 mb-3 rounded-full bg-muted/30"
      >
        <Text className="text-sm font-semibold text-foreground">
          About this campfire
        </Text>
        <ChevronRight size={14} color="#94a3b8" />
      </Pressable>

      {/* <CampfireFilterChips
        filters={campfireFilters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      /> */}

      <CampfireHighlights
        highlights={campfireHighlightsMock}
        onPressHighlight={(highlight) =>
          Alert.alert(highlight.title, 'Opens highlight detail soon.')
        }
      />
      </>
    )
  }

  return (
    <View className="flex-1 bg-background">
     <NavHeader/>

      <CampfirePostsList
        posts={filteredPosts}
        header={<ListHeader />}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        campfireOverride={{
          name: campfireDetailsMock.name,
          iconUrl: campfireDetailsMock.iconURL,
          slug: campfireDetailsMock.slug,
        }}
      />

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
