import type { EnhancedPost } from '../../../lib/dummy-data/post';
import { dummyPosts } from '../../../lib/dummy-data/post';

import type {
  CampfireDetails,
  CampfireGuideResource,
  CampfireHighlight,
  CampfireModerator,
  CampfireRule,
} from './types';

export const campfireDetailsMock: CampfireDetails = {
  id: 'campfire-aurora',
  name: 'Flux Haven',
  slug: 'flux-haven',
  description:
    'A cozy corner to swap stories, unpack tough days, and celebrate small wins together. Keep it kind, keep it warm.',
  members: 34200,
  purpose: 'support',
  iconURL: 'https://i.pravatar.cc/150?img=65',
  bannerUrl:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  visibility: 'public',
  createdAt: '2025-11-07T00:00:00Z',
  createdBy: 'flux-team',
  isMember: true,
  memberRole: 'firestarter',
  isFavorite: true,
  guideEnabled: true,
  guideShowOnJoin: true,
  guideWelcomeMessage:
    'Welcome to {username}! Here are a few sparks to help you settle in. We are grateful you are here.',
};

export const campfireHighlightsMock: CampfireHighlight[] = [
  {
    id: 'highlight-1',
    title: 'Weekly Check-in · November 21, 2025',
    subtitle: 'Share a win, a worry, or a wish.',
    imageUrl:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    badge: 'spark',
  },
  {
    id: 'highlight-2',
    title: 'Grounding in 60 Seconds',
    subtitle: 'A calming routine from the Firekeepers.',
    imageUrl:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    badge: 'guide',
  },
  {
    id: 'highlight-3',
    title: 'Gratitude Thread · Open Mic',
    subtitle: 'Drop a note that made you smile.',
    imageUrl:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
    badge: 'heart',
  },
];

export const campfireRulesMock: CampfireRule[] = [
  {
    id: 'rule-1',
    title: 'Respect Comes First',
    description:
      'Treat everyone with kindness. Debate ideas, never people. No harassment, hate speech, or personal attacks.',
  },
  {
    id: 'rule-2',
    title: 'Stay On Topic',
    description:
      'Keep posts grounded in support, growth, or helpful resources. Memes are okay if they lift the vibe.',
  },
  {
    id: 'rule-3',
    title: 'Protect Privacy',
    description:
      'No doxxing or sharing private details. Blur names/faces in screenshots. Safety over virality.',
  },
  {
    id: 'rule-4',
    title: 'Assume Best Intent',
    description:
      'We all arrive with different stories. Listen first, ask clarifying questions, and keep feedback constructive.',
  },
];

export const campfireGuideResourcesMock: CampfireGuideResource[] = [
  {
    id: 'res-1',
    title: 'Warm-up Guide: How Flux Haven Works',
    url: 'https://xolace.com/guide',
  },
  {
    id: 'res-2',
    title: 'Check-in Prompts We Love',
    url: 'https://xolace.com/prompts',
  },
  {
    id: 'res-3',
    title: 'Crisis resources (global)',
    url: 'https://xolace.com/safety',
  },
];

export const campfireModeratorsMock: CampfireModerator[] = [
  {
    id: 'mod-1',
    name: 'Flux Team',
    role: 'firestarter',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 'mod-2',
    name: 'Yuno',
    role: 'firekeeper',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 'mod-3',
    name: 'Mila',
    role: 'firekeeper',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
  },
];

export const campfireFilters = [
  'All',
  'Discussion',
  'Help',
  'Highlights',
  'What to Watch?',
] as const;

export const campfirePostsMock: EnhancedPost[] = dummyPosts
  .slice(0, 8)
  .map((post, index) => ({
    ...post,
    campfire_name: campfireDetailsMock.name,
    campfire_icon_url: campfireDetailsMock.iconURL,
    campfire_slug: campfireDetailsMock.slug,
    mood: index % 2 === 0 ? 'thoughtful' : post.mood,
    is_campfire_post: true,
  }));
