import { useInfiniteQuery } from '@tanstack/react-query';

import { useSupabase } from '@xolacekit/supabase';

import type { CollectionPostRow } from '../types';
import {
  type EnhancedPostCardModel,
  mapCollectionPostRow,
} from '../utils/transformers';

const PAGE_SIZE = 10;

const COLLECTION_COLUMNS = `
  post_id,
  collection_name,
  posts (
    *,
    posttags (
      tags (
        name
      )
    ),
    votes (
      user_id,
      vote_type
    ),
    comments:comments (
      count
    ),
    views:views (
      count
    ),
    collections (
      user_id
    ),
    post_slides (
      slide_index,
      content
    ),
    campfires!posts_campfire_id_fkey (
      name,
      icon_url,
      slug
    )
  )
`;

type PostCollectionsPage = {
  items: EnhancedPostCardModel[];
  nextCursor: number | null;
};

export function usePostCollections(options?: { enabled?: boolean }) {
  const supabase = useSupabase();
  const enabled = options?.enabled ?? true;

  return useInfiniteQuery<PostCollectionsPage>({
    queryKey: ['collections', 'posts'],
    enabled,
    staleTime: 60 * 1000,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const currentPage =
        typeof pageParam === 'number' ? pageParam : 0;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from('collections')
        .select(COLLECTION_COLUMNS)
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<CollectionPostRow[]>();

      if (error) {
        throw new Error(error.message);
      }

      const items =
        data
          ?.map((row) => mapCollectionPostRow(row))
          .filter(
            (post): post is EnhancedPostCardModel => post !== null,
          ) ?? [];

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
