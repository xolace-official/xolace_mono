
export type GlimpseSortOptionTypes = 
  | 'most_recent' 
  | 'most_viewed' 
  | 'oldest_first' 
  | 'least_viewed';

export type GlimpseVisibility = 'public' | 'private' | 'unlisted';

export interface GlimpseVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  authorName: string;
  authorAvatarUrl?: string;
  createdAt: string;
  visibility: GlimpseVisibility;
  likesCount: number;
  viewsCount: number;
}

export interface GlimpseSortOption {
  value: GlimpseSortOption;
  label: string;
}