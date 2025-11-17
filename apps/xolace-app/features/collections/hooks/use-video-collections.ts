import { useInfiniteQuery } from '@tanstack/react-query';

import { useSupabase } from '@xolacekit/supabase';

import type { GlimpseVideo } from '../../glimpse/types';
import type { VideoCollectionRow } from '../types';
import { mapVideoCollectionRow } from '../utils/transformers';

const PAGE_SIZE = 10;

const VIDEO_COLLECTION_COLUMNS = `
  id,
  created_at,
  collection_name,
  videos (
    id,
    created_at,
    title,
    description,
    thumbnail_url,
    author_name,
    author_avatar_url,
    views,
    likes_count,
    duration,
    visibility,
    video_id
  )
`;

type VideoCollectionsPage = {
  items: GlimpseVideo[];
  nextCursor: number | null;
};

export function useVideoCollections(options?: { enabled?: boolean }) {
  const supabase = useSupabase();
  const enabled = options?.enabled ?? true;

  return useInfiniteQuery<VideoCollectionsPage>({
    queryKey: ['collections', 'videos'],
    enabled,
    staleTime: 60 * 1000,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const currentPage =
        typeof pageParam === 'number' ? pageParam : 0;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from('video_collections')
        .select(VIDEO_COLLECTION_COLUMNS)
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<VideoCollectionRow[]>();

      if (error) {
        throw new Error(error.message);
      }

      const items =
        data
          ?.map((row) => mapVideoCollectionRow(row))
          .filter((video): video is GlimpseVideo => video !== null) ?? [];

      return {
        items,
        nextCursor:
          data && data.length === PAGE_SIZE
            ? currentPage + 1
            : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
