import type { Database } from '@xolacekit/supabase';

export type PostTagRelation = {
  tags: {
    name: string;
  } | null;
};

type VoteRelation = {
  user_id: string | null;
  vote_type: 'upvote' | 'downvote' | null;
};

type AggregateCount = {
  count: number;
};

type CollectionRelation = {
  user_id: string;
};

export type SlideRelation = {
  slide_index: number;
  content: string;
};

type CampfireRelation = {
  name: string;
  icon_url: string | null;
  slug: string;
} | null;

export type PostWithRelations = Database['public']['Tables']['posts']['Row'] & {
  posttags?: PostTagRelation[];
  votes?: VoteRelation[];
  comments?: AggregateCount[];
  views?: AggregateCount[];
  collections?: CollectionRelation[];
  post_slides?: SlideRelation[];
  campfires?: CampfireRelation;
};

export type CollectionPostRow =
  Database['public']['Tables']['collections']['Row'] & {
    posts: PostWithRelations | null;
  };

export type VideoWithRelations = Database['public']['Tables']['videos']['Row'];

export type VideoCollectionRow =
  Database['public']['Tables']['video_collections']['Row'] & {
    videos: VideoWithRelations | null;
  };
