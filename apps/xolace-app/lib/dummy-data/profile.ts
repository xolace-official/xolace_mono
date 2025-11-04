import type { EnhancedPost } from './post';
import { dummyPosts } from './post';

export type ProfileTabKey = 'overview' | 'posts';

export interface ProfileStatItem {
  id: string;
  label: string;
  value: string;
  helper?: string;
}

export interface ProfileFeat {
  id: string;
  label: string;
  tone: string;
  description?: string;
}

export interface ProfileAboutItem {
  id: string;
  label: string;
  value: string;
}

export interface ProfileData {
  id: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  coverImageUrl: string;
  roleBadge?: string;
  statusText: string;
  bio: string;
  about: ProfileAboutItem[];
  stats: ProfileStatItem[];
  activeCommunities: string[];
  feats: ProfileFeat[];
}

const baseProfileId = 'user-john-doe';

export const dummyProfileData: ProfileData = {
  id: baseProfileId,
  displayName: 'John Doe',
  handle: 'x/John_Doe94madEit',
  avatarUrl:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80',
  roleBadge: 'Active in 12 communities',
  statusText: 'Steady flame · Always listening',
  bio: 'Curator of cozy campfires, exploring empathy, art, and quiet rituals one story at a time.',
  about: [
    { id: 'location', label: 'Campfire Home', value: 'Lagoon District, Accra' },
    { id: 'ritual', label: 'Daily Ritual', value: 'Sunrise journaling & mint tea' },
    { id: 'energy', label: 'Current Mood', value: 'Open to gentle conversations' },
  ],
  stats: [
    { id: 'karma', label: 'Karma', value: '28,137', helper: 'All-time spark' },
    { id: 'contribution', label: 'Contribution', value: '1,345', helper: 'Stories shared' },
    { id: 'age', label: 'Campfire Age', value: '13 yrs', helper: 'Member since 2012' },
    { id: 'streak', label: 'Presence Streak', value: '27 days', helper: 'Showing up daily' },
  ],
  activeCommunities: [
    'Daily Prompt',
    'Healing Sketchbook',
    'Moments of Grace',
    'Night Owls Collective',
  ],
  feats: [
    {
      id: 'feat-yearclub',
      label: '13 Year Club Member',
      tone: '#f87171',
      description: 'Treasure keeper · here before the first spark caught fire.',
    },
    {
      id: 'feat-verified',
      label: 'Verified Email',
      tone: '#4ade80',
      description: 'Signal always secure · every whisper reaches the right hearth.',
    },
    {
      id: 'feat-lasagna',
      label: 'x/field Lasagna',
      tone: '#38bdf8',
      description: 'Started the coziest midnight lasagna circle imaginable.',
    },
    {
      id: 'feat-place22',
      label: 'Place 22',
      tone: '#b45309',
      description: 'Guarding the quietest nook in the library of embers.',
    },
  ],
};

export const dummyProfilePosts: EnhancedPost[] = dummyPosts.slice(0, 4).map((post, index) => ({
  ...post,
  id: `profile-post-${index + 1}`,
  author_name: dummyProfileData.displayName,
  author_avatar_url: dummyProfileData.avatarUrl,
  created_by: baseProfileId,
  campfire_name: undefined,
  posttags: post.posttags.slice(0, 2),
}));
