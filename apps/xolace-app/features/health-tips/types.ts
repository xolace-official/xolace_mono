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

export interface HealthTipsFilter {
  topic?: HealthTipTopic;
  searchTerm?: string;
  limit?: number;
}
