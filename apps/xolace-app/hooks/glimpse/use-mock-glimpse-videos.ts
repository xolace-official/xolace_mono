// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/hooks/use-mock-glimpse-videos.ts
import { useEffect, useMemo, useState } from 'react';

import type {
  GlimpseSortOptionTypes,
  GlimpseVideo,
} from '../../features/glimpse/types';

const MOCK_VIDEOS: GlimpseVideo[] = [
  {
    id: '1',
    title: 'In The Mind 🧠',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    duration: 136, // 02:16
    authorName: 'Xolace Team🌍',
    authorAvatarUrl: undefined,
    createdAt: '2025-10-15T10:00:00Z',
    visibility: 'public',
    likesCount: 5,
    viewsCount: 120,
  },
  {
    id: '2',
    title: 'Journey Through Campus Life',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    duration: 245,
    authorName: 'Sarah Johnson',
    authorAvatarUrl: undefined,
    createdAt: '2025-10-20T14:30:00Z',
    visibility: 'public',
    likesCount: 23,
    viewsCount: 450,
  },
  {
    id: '3',
    title: 'Student Success Stories',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    duration: 180,
    authorName: 'Michael Chen',
    authorAvatarUrl: undefined,
    createdAt: '2025-09-25T09:15:00Z',
    visibility: 'public',
    likesCount: 67,
    viewsCount: 890,
  },
  {
    id: '4',
    title: 'Behind the Scenes: Tech Innovation',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    duration: 320,
    authorName: 'Emma Watson',
    authorAvatarUrl: undefined,
    createdAt: '2025-11-01T16:45:00Z',
    visibility: 'public',
    likesCount: 145,
    viewsCount: 1200,
  },
];

export function useMockGlimpseVideos(
  searchQuery: string,
  sortOption: GlimpseSortOptionTypes,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, sortOption]);

  const videos = useMemo(() => {
    let filtered = [...MOCK_VIDEOS];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.authorName.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'most_recent':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'most_viewed':
        filtered.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case 'oldest_first':
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case 'least_viewed':
        filtered.sort((a, b) => a.viewsCount - b.viewsCount);
        break;
    }

    return filtered;
  }, [searchQuery, sortOption]);

  const loadMore = () => {
    // Implement pagination logic
    console.log('Load more videos');
  };

  return { videos, isLoading, hasMore, loadMore };
}
