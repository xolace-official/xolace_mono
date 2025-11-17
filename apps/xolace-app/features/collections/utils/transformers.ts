import type { ComponentProps } from 'react';

import type { EnhancedPostCard } from '../../../components/cards/EnhancedPostCard';
import type { GlimpseVideo } from '../../glimpse/types';
import type {
  CollectionPostRow,
  PostTagRelation,
  PostWithRelations,
  SlideRelation,
  VideoCollectionRow,
} from '../types';

export type EnhancedPostCardModel = ComponentProps<
  typeof EnhancedPostCard
>['post'];

function mapVoteCount(votes: PostWithRelations['votes'], type: 'upvote' | 'downvote') {
  if (!votes?.length) {
    return 0;
  }

  return votes.filter((vote) => vote.vote_type === type).length;
}

export function mapCollectionPostRow(
  row: CollectionPostRow,
): EnhancedPostCardModel | null {
  const post = row.posts;

  if (!post) {
    return null;
  }

  const upvotes = post.upvotes ?? mapVoteCount(post.votes, 'upvote');
  const downvotes = post.downvotes ?? mapVoteCount(post.votes, 'downvote');
  const commentsCount = post.comments?.[0]?.count ?? 0;
  const viewsCount = post.views?.[0]?.count ?? 0;

  return {
    id: post.id,
    created_at: post.created_at ?? new Date().toISOString(),
    created_by: post.created_by ?? '',
    author_name: post.author_name ?? 'Anonymous',
    content: post.content ?? '',
    mood: post.mood ?? 'neutral',
    author_avatar_url: post.author_avatar_url,
    expires_in_24hr: post.expires_in_24hr ?? false,
    expires_at: post.expires_at ?? null,
    downvotes,
    upvotes,
    is_sensitive: post.is_sensitive ?? false,
    type: post.type ?? 'single',
    author_roles: post.author_roles ?? [],
    campfire_name: post.campfires?.name ?? null,
    campfire_slug: post.campfires?.slug ?? null,
    campfire_icon_url: post.campfires?.icon_url ?? null,
    is_campfire_post: !!post.campfires,
    prompt_text: (post as PostWithRelations & { prompt_text?: string | null })
      .prompt_text ?? null,
    posttags:
      post.posttags?.map((tag: PostTagRelation) => ({
        name: tag.tags?.name ?? '',
      })) ?? [],
    comments_count: commentsCount,
    views_count: viewsCount,
    collections: post.collections ?? [],
    post_slides:
      post.post_slides
        ?.map((slide: SlideRelation) => ({
          slide_index: slide.slide_index,
          content: slide.content,
        }))
        .sort(
          (
            a: { slide_index: number },
            b: { slide_index: number },
          ) => a.slide_index - b.slide_index,
        ) ?? [],
  };
}

export function mapVideoCollectionRow(
  row: VideoCollectionRow,
): GlimpseVideo | null {
  const video = row.videos;

  if (!video) {
    return null;
  }

  return {
    id: video.id,
    title: video.title,
    thumbnailUrl: video.thumbnail_url,
    duration: Number(video.duration ?? 0),
    authorName: video.author_name,
    authorAvatarUrl: video.author_avatar_url ?? undefined,
    createdAt: video.created_at,
    visibility: video.visibility as GlimpseVideo['visibility'],
    likesCount: Number(video.likes_count ?? 0),
    viewsCount: Number(video.views ?? 0),
  };
}
