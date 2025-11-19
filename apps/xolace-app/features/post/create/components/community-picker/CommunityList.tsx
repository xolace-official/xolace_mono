import { ReactNode } from 'react';

import { FlatList, Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Text,
} from '@xolacekit/ui';

import type { PostDraftCommunity } from '../../store/usePostDraftStore';

type CommunityListProps = {
  data: PostDraftCommunity[];
  selectedId?: string | null;
  onSelect: (community: PostDraftCommunity) => void;
  ListEmptyComponent?: ReactNode;
};

const formatMemberCount = (count?: number) => {
  if (!count) {
    return 'Just launched';
  }

  if (count < 1000) {
    return `${count} members`;
  }

  return `${(count / 1000).toFixed(1)}k members`;
};

export const CommunityList = ({
  data,
  selectedId,
  onSelect,
  ListEmptyComponent,
}: CommunityListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 48 }}
      ListEmptyComponent={ListEmptyComponent ?? null}
      renderItem={({ item }) => {
        const isActive = selectedId === item.id;
        return (
          <Pressable
            onPress={() => onSelect(item)}
            className={`flex-row items-center justify-between border-b border-white/5 px-1 py-4 active:opacity-80 ${
              isActive ? 'bg-white/5' : ''
            }`}
          >
            <View className="flex-row items-center flex-1 gap-3 pr-4">
              <Avatar className="w-12 h-12">
                <AvatarImage source={{ uri: item.avatar }} />
                <AvatarFallback>
                  <Text className="text-base font-semibold text-foreground">
                    {item.name.charAt(0)}
                  </Text>
                </AvatarFallback>
              </Avatar>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  {item.slug}
                </Text>
                <Text
                  className="text-xs text-muted-foreground"
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  {formatMemberCount(item.memberCount)}
                </Text>
              </View>
            </View>
            {isActive && (
              <View className="items-center justify-center rounded-full h-7 w-7 bg-primary/20">
                <Check size={18} color="#a78bfa" />
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};
