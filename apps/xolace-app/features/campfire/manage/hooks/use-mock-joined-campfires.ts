// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/hooks/use-mock-joined-campfires.ts
import { useMemo, useState, useEffect } from 'react';
import type { UserCampfireFavoriteJoin } from '../types';
import type { CampfireFilter } from '../types';

const MOCK_CAMPFIRES: UserCampfireFavoriteJoin[] = [
  {
    campfireId: '1',
    name: 'x/KTU Chaper',
    slug: 'ktu-chaper',
    description: 'This is the best isnt it then',
    members: 4,
    purpose: 'growth group',
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: '2024-01-15T10:00:00Z',
    role: 'camper',
  },
  {
    campfireId: '2',
    name: 'Health Minines',
    slug: 'health-minines',
    description: 'This is a community for health discussions and wellness tips',
    members: 12,
    purpose: 'support circle',
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: '2024-01-20T14:30:00Z',
    role: 'firekeeper',
  },
  {
    campfireId: '3',
    name: 'x/ktu diaries',
    slug: 'ktu-diaries',
    description: 'KTU Diaries is where campus life unfolds',
    members: 16,
    purpose: 'general discussion',
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: '2024-02-01T09:15:00Z',
    role: 'camper',
    favoritedAt: '2024-02-05T12:00:00Z',
  },
  {
    campfireId: '4',
    name: 'Creative Tech Hub',
    slug: 'creative-tech-hub',
    description: 'A space for creative technologists to share and collaborate',
    members: 23,
    purpose: 'creative outlet',
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: '2024-02-10T16:45:00Z',
    role: 'firestarter',
    favoritedAt: '2024-02-10T16:45:00Z',
  },
  {
    campfireId: '5',
    name: 'Study Squad',
    slug: 'study-squad',
    description: 'Group study sessions and academic support',
    members: 8,
    purpose: 'growth group',
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: '2024-02-15T11:20:00Z',
    role: 'camper',
  },
];

export function useMockJoinedCampfires(searchQuery: string, filter: CampfireFilter) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, filter]);

  const campfires = useMemo(() => {
    let filtered = MOCK_CAMPFIRES;

    // Apply filter
    if (filter === 'favorites') {
      filtered = filtered.filter(c => c.isFavorite);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filter]);

  return { campfires, isLoading };
}