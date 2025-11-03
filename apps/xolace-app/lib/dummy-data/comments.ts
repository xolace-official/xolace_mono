// lib/dummy-data/comments.ts

export interface NestedComment {
  id: number;
  comment_text: string;
  created_at: string;
  author_name: string;
  author_avatar_url?: string | null;
  created_by: string | null;
  post: string;
  pinned_status: 'none' | 'professional' | 'author';
  ai_suggestion?: boolean;
  replies: NestedComment[];
}

// Helper to get dates
const getRecentDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Sample nested comments for a post
export const dummyComments: NestedComment[] = [
  {
    id: 1,
    comment_text:
      'This really resonates with me. Thank you for sharing your experience! 💜',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Emma Wilson',
    author_avatar_url: 'https://i.pravatar.cc/150?img=5',
    created_by: 'user-emma-001',
    post: 'post-001',
    pinned_status: 'author',
    ai_suggestion: false,
    replies: [
      {
        id: 2,
        comment_text:
          "@Emma I'm so glad it helped! We're all in this together 🤗",
        created_at: '2025-01-24 14:21:19.106039+00',
        author_name: 'Sarah Chen',
        author_avatar_url: 'https://i.pravatar.cc/150?img=1',
        created_by: 'user-sarah-001',
        post: 'post-001',
        pinned_status: 'none',
        ai_suggestion: false,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    comment_text:
      'Have you tried the 5-4-3-2-1 grounding technique? It helps me when anxiety gets overwhelming. Focus on 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Dr. Michael Torres',
    author_avatar_url: 'https://i.pravatar.cc/150?img=15',
    created_by: 'user-michael-003',
    post: 'post-002',
    pinned_status: 'professional',
    ai_suggestion: false,
    replies: [
      {
        id: 4,
        comment_text: "@Michael Thank you so much! I'll try this right now.",
        created_at: '2025-01-24 14:21:19.106039+00',
        author_name: 'Anonymous Fox',
        author_avatar_url: null,
        created_by: 'user-anon-002',
        post: 'post-002',
        pinned_status: 'none',
        ai_suggestion: false,
        replies: [
          {
            id: 5,
            comment_text:
              '@Anonymous Let me know how it goes! Also remember, deep breathing can help - in for 4, hold for 4, out for 4.',
            created_at: '2025-01-24 14:21:19.106039+00',
            author_name: 'Dr. Michael Torres',
            author_avatar_url: 'https://i.pravatar.cc/150?img=15',
            created_by: 'user-michael-003',
            post: 'post-002',
            pinned_status: 'none',
            ai_suggestion: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    comment_text:
      'Box breathing is another excellent technique: breathe in for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat for a few minutes.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'AI Assistant',
    author_avatar_url: null,
    created_by: null,
    post: 'post-002',
    pinned_status: 'none',
    ai_suggestion: true,
    replies: [],
  },
  {
    id: 7,
    comment_text:
      'Congratulations! 90 days is a huge milestone. Keep going strong! 🎉',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Jordan Lee',
    author_avatar_url: 'https://i.pravatar.cc/150?img=30',
    created_by: 'user-jordan-007',
    post: 'post-006',
    pinned_status: 'none',
    ai_suggestion: false,
    replies: [
      {
        id: 8,
        comment_text:
          '@Jordan Thank you! Every day is a battle but worth it 💪',
        created_at: getRecentDate(2),
        author_name: 'Luna Park',
        author_avatar_url: 'https://i.pravatar.cc/150?img=45',
        created_by: 'user-luna-006',
        post: 'post-006',
        pinned_status: 'none',
        ai_suggestion: false,
        replies: [],
      },
    ],
  },
  {
    id: 9,
    comment_text:
      'Your journey is inspiring to so many people here. Thank you for being vulnerable and sharing your story.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Chris Martinez',
    author_avatar_url: 'https://i.pravatar.cc/150?img=18',
    created_by: 'user-chris-009',
    post: 'post-006',
    pinned_status: 'none',
    ai_suggestion: false,
    replies: [],
  },
  {
    id: 10,
    comment_text:
      'Great routine! I would also add journaling to this list. Even 5 minutes of morning journaling can set a positive mindset for the day.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Sophia Anderson',
    author_avatar_url: 'https://i.pravatar.cc/150?img=25',
    created_by: 'user-sophia-010',
    post: 'post-003',
    pinned_status: 'none',
    ai_suggestion: false,
    replies: [
      {
        id: 11,
        comment_text:
          '@Sophia Great addition! Ive been thinking about adding journaling. What do you usually write about?',
        created_at: '2025-01-24 14:21:19.106039+00',
        author_name: 'Alex Rivera',
        author_avatar_url: 'https://i.pravatar.cc/150?img=12',
        created_by: 'user-alex-003',
        post: 'post-003',
        pinned_status: 'none',
        ai_suggestion: false,
        replies: [
          {
            id: 12,
            comment_text:
              '@Alex I usually do gratitude journaling - 3 things I&apos;m grateful for and 3 intentions for the day. Simple but powerful!',
            created_at: '2025-01-24 14:21:19.106039+00',
            author_name: 'Sophia Anderson',
            author_avatar_url: 'https://i.pravatar.cc/150?img=25',
            created_by: 'user-sophia-010',
            post: 'post-003',
            pinned_status: 'none',
            ai_suggestion: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 13,
    comment_text:
      'I feel this so deeply. Dissociation can be really scary. For me, mindfulness exercises help - even something as simple as focusing on my breath brings me back to the present moment.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'Taylor Kim',
    author_avatar_url: 'https://i.pravatar.cc/150?img=40',
    created_by: 'user-taylor-013',
    post: 'post-008',
    pinned_status: 'none',
    ai_suggestion: false,
    replies: [],
  },
  {
    id: 14,
    comment_text:
      'Consider trying body scan meditation. It helps you reconnect with physical sensations and ground yourself in your body. There are great guided ones on various apps.',
    created_at: '2025-01-24 14:21:19.106039+00',
    author_name: 'AI Wellness Coach',
    author_avatar_url: null,
    created_by: null,
    post: 'post-008',
    pinned_status: 'none',
    ai_suggestion: true,
    replies: [],
  },
];

// Helper to get comments for a specific post
export const getCommentsForPost = (postId: string): NestedComment[] => {
  return dummyComments.filter((comment) => comment.post === postId);
};

// Helper to get a comment by ID
export const getCommentById = (
  commentId: number,
): NestedComment | undefined => {
  const findComment = (
    comments: NestedComment[],
  ): NestedComment | undefined => {
    for (const comment of comments) {
      if (comment.id === commentId) return comment;
      if (comment.replies.length > 0) {
        const found = findComment(comment.replies);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findComment(dummyComments);
};

// Helper to count total comments (including nested)
export const countTotalComments = (comments: NestedComment[]): number => {
  return comments.reduce((total, comment) => {
    return total + 1 + countTotalComments(comment.replies);
  }, 0);
};

// Helper to get AI suggestions
export const getAISuggestions = (): NestedComment[] => {
  const findAISuggestions = (comments: NestedComment[]): NestedComment[] => {
    const suggestions: NestedComment[] = [];
    for (const comment of comments) {
      if (comment.ai_suggestion) suggestions.push(comment);
      if (comment.replies.length > 0) {
        suggestions.push(...findAISuggestions(comment.replies));
      }
    }
    return suggestions;
  };
  return findAISuggestions(dummyComments);
};

// Helper to get pinned comments
export const getPinnedComments = (
  pinnedBy: 'professional' | 'author' | 'any' = 'any',
): NestedComment[] => {
  const findPinned = (comments: NestedComment[]): NestedComment[] => {
    const pinned: NestedComment[] = [];
    for (const comment of comments) {
      if (
        comment.pinned_status !== 'none' &&
        (pinnedBy === 'any' || comment.pinned_status === pinnedBy)
      ) {
        pinned.push(comment);
      }
      if (comment.replies.length > 0) {
        pinned.push(...findPinned(comment.replies));
      }
    }
    return pinned;
  };
  return findPinned(dummyComments);
};

export default {
  comments: dummyComments,
  getCommentsForPost,
  getCommentById,
  countTotalComments,
  getAISuggestions,
  getPinnedComments,
};
