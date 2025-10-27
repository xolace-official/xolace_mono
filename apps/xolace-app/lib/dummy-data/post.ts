// lib/dummy-data/posts.ts

// import type { Tables } from "@xolacekit/supabase";

// Type for enhanced post (matching the component interface)
export interface EnhancedPost {
  id: string;
  created_at: string;
  expires_at?: string | null;
  author_name: string;
  author_avatar_url?: string | null;
  author_roles: string[];
  campfire_name?: string | null;
  campfire_icon_url?: string | null;
  campfire_slug?: string | null;
  mood: string;
  type: 'single' | 'carousel';
  content: string;
  post_slides?: Array<{ content: string; slide_index: number }>;
  prompt_text?: string | null;
  posttags: Array<{ name: string }>;
  comments_count: number;
  upvotes: number;
  downvotes: number;
  views_count: number;
  created_by: string;
  collections?: any[];
  expires_in_24hr?: boolean;
  is_sensitive?: boolean;
  is_campfire_post?: boolean;
}

// Helper function to generate dates
const getRecentDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

const getFutureDate = (hoursFromNow: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date.toISOString();
};

// Dummy post data
export const dummyPosts: EnhancedPost[] = [
  {
    id: 'post-001',
    created_at: getRecentDate(2),
    expires_at: null,
    author_name: 'Sarah Chen',
    author_avatar_url: 'https://i.pravatar.cc/150?img=1',
    author_roles: ['help_professional', 'verified'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'thoughtful',
    type: 'single',
    content:
      "Just finished a really insightful therapy session today. Sometimes the breakthrough moments come when we least expect them. Remember, healing isn't linear - it's okay to have ups and downs. 💜\n\nWhat's one thing you're grateful for today?",
    post_slides: undefined,
    prompt_text: 'What moment made you pause and reflect today?',
    posttags: [
      { name: 'mentalhealth' },
      { name: 'therapy' },
      { name: 'growth' },
    ],
    comments_count: 23,
    upvotes: 156,
    downvotes: 3,
    views_count: 892,
    created_by: 'user-sarah-001',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-002',
    created_at: getRecentDate(5),
    expires_at: getFutureDate(19),
    author_name: 'Anonymous Fox',
    author_avatar_url: null,
    author_roles: [],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'sad',
    type: 'single',
    content:
      "Having a really tough day today. Anxiety is through the roof and I can't seem to calm down. Does anyone have any grounding techniques that work for them?\n\nI feel like I'm drowning...",
    post_slides: undefined,
    prompt_text: null,
    posttags: [
      { name: 'anxiety' },
      { name: 'support' },
      { name: 'helpneeded' },
    ],
    comments_count: 47,
    upvotes: 89,
    downvotes: 1,
    views_count: 534,
    created_by: 'user-anon-002',
    collections: [],
    expires_in_24hr: true,
    is_sensitive: true,
    is_campfire_post: false,
  },
  {
    id: 'post-003',
    created_at: getRecentDate(1),
    expires_at: null,
    author_name: 'Alex Rivera',
    author_avatar_url: 'https://i.pravatar.cc/150?img=12',
    author_roles: ['mentor'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'happy',
    type: 'carousel',
    content: '',
    post_slides: [
      {
        content:
          '3 Simple Morning Habits That Changed My Life 🌅\n\n1. Wake up without hitting snooze\n2. Drink water before coffee\n3. 5 minutes of stretching',
        slide_index: 0,
      },
      {
        content:
          'Why These Work:\n\nWaking up immediately helps regulate your circadian rhythm and gives you momentum for the day.\n\nHydration kickstarts your metabolism after 8 hours of sleep.',
        slide_index: 1,
      },
      {
        content:
          'The Stretching Difference:\n\nJust 5 minutes of gentle stretching increases blood flow, reduces stiffness, and sets a positive tone for the day.\n\nTry it for 7 days and notice the difference! 💪',
        slide_index: 2,
      },
    ],
    prompt_text: null,
    posttags: [
      { name: 'morningroutine' },
      { name: 'selfcare' },
      { name: 'habits' },
    ],
    comments_count: 31,
    upvotes: 203,
    downvotes: 7,
    views_count: 1245,
    created_by: 'user-alex-003',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-004',
    created_at: getRecentDate(8),
    expires_at: null,
    author_name: 'Mindful Warriors',
    author_avatar_url: 'https://i.pravatar.cc/150?img=20',
    author_roles: [],
    campfire_name: 'Mindful Warriors',
    campfire_icon_url: 'https://i.pravatar.cc/150?img=20',
    campfire_slug: 'mindful-warriors',
    mood: 'peaceful',
    type: 'single',
    content:
      "Weekly Campfire Check-in 🔥\n\nHow's everyone doing this week? Remember, this is a safe space to share your struggles and victories.\n\nNo judgment, just support. Drop a comment and let's lift each other up!",
    post_slides: undefined,
    prompt_text: null,
    posttags: [
      { name: 'campfire' },
      { name: 'community' },
      { name: 'checkin' },
    ],
    comments_count: 67,
    upvotes: 124,
    downvotes: 0,
    views_count: 678,
    created_by: 'user-campfire-004',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: true,
  },
  {
    id: 'post-005',
    created_at: getRecentDate(12),
    expires_at: null,
    author_name: 'Dr. James Mitchell',
    author_avatar_url: 'https://i.pravatar.cc/150?img=33',
    author_roles: ['help_professional', 'verified'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'thoughtful',
    type: 'single',
    content:
      "Understanding Cognitive Distortions 🧠\n\nAll-or-nothing thinking is one of the most common cognitive distortions I see in my practice. It's when we see things in black and white, with no middle ground.\n\nExample: \"If I don't do this perfectly, I'm a complete failure.\"\n\nChallenge this by asking: What's the evidence? Are there shades of gray?\n\nRecovery and growth exist in the gray areas. Perfection is a myth.",
    post_slides: undefined,
    prompt_text: 'What cognitive distortion do you struggle with most?',
    posttags: [
      { name: 'psychology' },
      { name: 'cognitivedistortions' },
      { name: 'therapy' },
      { name: 'mentalhealth' },
    ],
    comments_count: 89,
    upvotes: 312,
    downvotes: 5,
    views_count: 1567,
    created_by: 'user-james-005',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-006',
    created_at: getRecentDate(3),
    expires_at: null,
    author_name: 'Luna Park',
    author_avatar_url: 'https://i.pravatar.cc/150?img=45',
    author_roles: ['verified'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'excited',
    type: 'single',
    content:
      "90 DAYS SOBER! 🎉🎊\n\nI never thought I'd make it this far. There were so many days I wanted to give up, but this community kept me going.\n\nTo anyone struggling: it gets better. One day at a time. You've got this! 💪✨",
    post_slides: undefined,
    prompt_text: null,
    posttags: [
      { name: 'sobriety' },
      { name: 'recovery' },
      { name: 'milestone' },
      { name: 'celebration' },
    ],
    comments_count: 156,
    upvotes: 487,
    downvotes: 2,
    views_count: 2103,
    created_by: 'user-luna-006',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-007',
    created_at: getRecentDate(6),
    expires_at: null,
    author_name: 'Marcus Thompson',
    author_avatar_url: 'https://i.pravatar.cc/150?img=52',
    author_roles: ['mentor'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'grateful',
    type: 'carousel',
    content: '',
    post_slides: [
      {
        content:
          '5 Things I Wish I Knew About Depression Earlier 💭\n\n#1: It\'s not "just in your head"\n\nDepression is a real medical condition with biological, psychological, and social factors.',
        slide_index: 0,
      },
      {
        content:
          '#2: Medication isn\'t "cheating"\n\nIf you have diabetes, you take insulin. If you have depression, medication can be part of your treatment plan. No shame.',
        slide_index: 1,
      },
      {
        content:
          "#3: Progress isn't linear\n\nSome days will be harder than others. A bad day doesn't mean you're back at square one.",
        slide_index: 2,
      },
      {
        content:
          '#4: You can\'t "think" your way out\n\nPositive thinking helps, but depression requires real treatment. Be patient with yourself.',
        slide_index: 3,
      },
      {
        content:
          '#5: Asking for help is strength\n\nReaching out for support takes courage. You deserve care and compassion. 💜',
        slide_index: 4,
      },
    ],
    prompt_text: null,
    posttags: [
      { name: 'depression' },
      { name: 'mentalhealth' },
      { name: 'education' },
      { name: 'support' },
    ],
    comments_count: 94,
    upvotes: 276,
    downvotes: 8,
    views_count: 1834,
    created_by: 'user-marcus-007',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-008',
    created_at: getRecentDate(24),
    expires_at: null,
    author_name: 'Riley Kim',
    author_avatar_url: 'https://i.pravatar.cc/150?img=28',
    author_roles: [],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'melancholy',
    type: 'single',
    content:
      "Been feeling really disconnected from myself lately. Like I'm just going through the motions but not really living.\n\nAnyone else ever feel like this? How do you reconnect with yourself?",
    post_slides: undefined,
    prompt_text: 'When was the last time you felt truly present?',
    posttags: [
      { name: 'dissociation' },
      { name: 'mentalhealth' },
      { name: 'seeking' },
    ],
    comments_count: 42,
    upvotes: 98,
    downvotes: 3,
    views_count: 623,
    created_by: 'user-riley-008',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
  {
    id: 'post-009',
    created_at: getRecentDate(6),
    expires_at: null,
    author_name: 'Marcus Thompson',
    author_avatar_url: 'https://i.pravatar.cc/150?img=52',
    author_roles: ['mentor'],
    campfire_name: null,
    campfire_icon_url: null,
    campfire_slug: null,
    mood: 'grateful',
    type: 'single',
    content:
      '5 Things I Wish I Knew About Depression Earlier 💭\n\n#1: It\'s not "just in your head"\n\nDepression is a real medical condition with biological, psychological, and social factors.',
    post_slides: [
      {
        content:
          '5 Things I Wish I Knew About Depression Earlier 💭\n\n#1: It\'s not "just in your head"\n\nDepression is a real medical condition with biological, psychological, and social factors.',
        slide_index: 0,
      },
      {
        content:
          '#2: Medication isn\'t "cheating"\n\nIf you have diabetes, you take insulin. If you have depression, medication can be part of your treatment plan. No shame.',
        slide_index: 1,
      },
      {
        content:
          "#3: Progress isn't linear\n\nSome days will be harder than others. A bad day doesn't mean you're back at square one.",
        slide_index: 2,
      },
      {
        content:
          '#4: You can\'t "think" your way out\n\nPositive thinking helps, but depression requires real treatment. Be patient with yourself.',
        slide_index: 3,
      },
      {
        content:
          '#5: Asking for help is strength\n\nReaching out for support takes courage. You deserve care and compassion. 💜',
        slide_index: 4,
      },
    ],
    prompt_text: null,
    posttags: [
      { name: 'depression' },
      { name: 'mentalhealth' },
      { name: 'education' },
      { name: 'support' },
    ],
    comments_count: 94,
    upvotes: 276,
    downvotes: 8,
    views_count: 1834,
    created_by: 'user-marcus-007',
    collections: [],
    expires_in_24hr: false,
    is_sensitive: false,
    is_campfire_post: false,
  },
];

// Helper function to get a random post
export const getRandomPost = (): EnhancedPost => {
  return dummyPosts[Math.floor(Math.random() * dummyPosts.length)];
};

// Helper function to get posts by mood
export const getPostsByMood = (mood: string): EnhancedPost[] => {
  return dummyPosts.filter((post) => post.mood === mood);
};

// Helper function to get posts by user
export const getPostsByUser = (userId: string): EnhancedPost[] => {
  return dummyPosts.filter((post) => post.created_by === userId);
};

// Helper function to get campfire posts
export const getCampfirePosts = (): EnhancedPost[] => {
  return dummyPosts.filter((post) => post.is_campfire_post);
};

// Helper function to get posts with carousel
export const getCarouselPosts = (): EnhancedPost[] => {
  return dummyPosts.filter((post) => post.type === 'carousel');
};

// Helper function to get sensitive posts
export const getSensitivePosts = (): EnhancedPost[] => {
  return dummyPosts.filter((post) => post.is_sensitive);
};

// Export default
export default dummyPosts;
