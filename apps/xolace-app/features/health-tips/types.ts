import type { Tables } from '@xolacekit/supabase';

export type HealthTipListItem = Pick<
  Tables<'health_tips'>,
  | 'id'
  | 'title'
  | 'read_time'
  | 'topic'
  | 'excerpt'
  | 'author_name'
  | 'slug'
  | 'author_avatar_url'
>;

export type HealthTipTopic = HealthTipListItem['topic'] | 'all';

type HealthTipBase = Pick<
  Tables<'health_tips'>,
  | 'id'
  | 'title'
  | 'content'
  | 'author_name'
  | 'author_avatar_url'
  | 'created_at'
  | 'slug'
>;

export type HealthTipDetail = HealthTipBase & {
  read_time?: number | null;
  topic?: string | null;
  excerpt?: string | null;
};

export interface HealthTipsFilter {
  topic?: HealthTipTopic;
  searchTerm?: string;
  limit?: number;
}
