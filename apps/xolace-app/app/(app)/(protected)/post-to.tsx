import { useMemo, useState } from 'react';

import { useRouter } from 'expo-router';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';

import { Text, useColorScheme } from '@xolacekit/ui';

import { CommunityList } from '../../../features/post/create/components/community-picker/CommunityList';
import { MOCK_COMMUNITIES } from '../../../features/post/create/constants/mock-communities';
import {
  usePostDraftStore,
  type PostDraftCommunity,
} from '../../../features/post/create/store/usePostDraftStore';

const PostToScreen = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const setCommunity = usePostDraftStore((state) => state.setCommunity);
  const selectedCommunity = usePostDraftStore((state) => state.community);

  const filteredCommunities = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_COMMUNITIES;
    }
    const normalizedQuery = searchQuery.toLowerCase();
    return MOCK_COMMUNITIES.filter(
      (community) =>
        community.name.toLowerCase().includes(normalizedQuery) ||
        community.slug.toLowerCase().includes(normalizedQuery) ||
        (community.description ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  const handleSelect = (community: PostDraftCommunity) => {
    setCommunity(community);
    router.back();
  };

  const handleClear = () => {
    setCommunity(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
        >
          <X size={22} color={colorScheme === 'dark' ? '#f4f4f5' : '#0f172a'} />
        </Pressable>
        <Text className="text-lg font-semibold text-foreground">Post to</Text>
        {selectedCommunity ? (
          <Pressable
            onPress={handleClear}
            className="rounded-full border border-white/10 px-3 py-1 active:opacity-80"
          >
            <Text className="text-sm text-muted-foreground">Clear</Text>
          </Pressable>
        ) : (
          <View className="w-14" />
        )}
      </View>

      {selectedCommunity && (
        <View className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <Text className="text-xs uppercase text-muted-foreground">
            Posting to
          </Text>
          <Text className="text-lg font-semibold text-foreground">
            {selectedCommunity.slug}
          </Text>
          <Text className="text-sm text-muted-foreground" numberOfLines={2}>
            {selectedCommunity.description}
          </Text>
        </View>
      )}

      <View className="mx-4 mb-4 rounded-2xl border border-white/10 bg-muted/30 px-3">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for a community"
          placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
          className="h-12 text-base text-foreground"
        />
      </View>

      <View className="flex-1 px-4">
        <CommunityList
          data={filteredCommunities}
          selectedId={selectedCommunity?.id}
          onSelect={handleSelect}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Text className="text-sm text-muted-foreground">
                No communities found.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PostToScreen;
