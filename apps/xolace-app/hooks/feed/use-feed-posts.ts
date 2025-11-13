// apps/xolace-app/hooks/use-feed-posts.ts
import { useMemo } from 'react';
import { useFeedFilter } from '@xolacekit/state';
import type { EnhancedPost } from '../../lib/dummy-data/post';

/**
 * Hook to filter and sort posts based on the current feed filter
 * Uses global state from @xolacekit/state package
 */
export function useFeedPosts(posts: EnhancedPost[]) {
  const selectedFilter = useFeedFilter();

  const filteredPosts = useMemo(() => {
    switch (selectedFilter) {
      case 'popular':
        // Sort by engagement score (upvotes + comments * 2 + views / 10)
        return [...posts].sort((a, b) => {
          const scoreA = a.upvotes + a.comments_count * 2 + a.views_count / 10;
          const scoreB = b.upvotes + b.comments_count * 2 + b.views_count / 10;
          return scoreB - scoreA;
        });

      case 'trending':
        // Sort by trending score (recent engagement + upvotes - downvotes)
        return [...posts].sort((a, b) => {
          const hoursAgoA = (Date.now() - new Date(a.created_at).getTime()) / (1000 * 60 * 60);
          const hoursAgoB = (Date.now() - new Date(b.created_at).getTime()) / (1000 * 60 * 60);
          
          // Trending score: higher for recent posts with good engagement
          const scoreA = (a.upvotes - a.downvotes + a.comments_count * 3) / Math.max(hoursAgoA, 1);
          const scoreB = (b.upvotes - b.downvotes + b.comments_count * 3) / Math.max(hoursAgoB, 1);
          
          return scoreB - scoreA;
        });

    //   case 'following':
    //     // Filter posts from verified users or help professionals
    //     // TODO: Replace with actual following logic from user data
    //     return posts
    //       .filter(post => 
    //         post.author_roles.includes('verified') || 
    //         post.author_roles.includes('help_professional')
    //       )
    //       .sort((a, b) => 
    //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    //       );

      case 'campfires':
        // Filter posts from campfires (is_campfire_post = true)
        return posts
          .filter(post => post.is_campfire_post === true)
          .sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

      case 'latest':
      default:
        // Sort by creation date (newest first)
        return [...posts].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [posts, selectedFilter]);

  return { filteredPosts, selectedFilter };
}