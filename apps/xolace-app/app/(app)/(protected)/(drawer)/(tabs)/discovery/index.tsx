// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/index.tsx
import { useState } from 'react';
import { View } from 'react-native';
import { DiscoveryHeader } from '../../../../../../features/campfire/discovery/DiscoveryHeader';
import { SearchBar } from '../../../../../../features/campfire/discovery/SearchBar';
import { CampfireList } from '../../../../../../features/campfire/discovery/campfire-list';
import { PurposeFilter } from '../../../../../../features/campfire/discovery/purpose-filter';

export type CampfirePurpose = 'support circle' | 'growth group' | 'creative outlet' | 'general discussion';

export interface Campfire {
  id: string;
  name: string;
  description: string;
  purpose: CampfirePurpose;
  memberCount: number;
  avatar: string;
  imageUri?: string;
  joined?: boolean;
}

export default function DiscoveryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPurposes, setSelectedPurposes] = useState<CampfirePurpose[]>([]);
  
  // Mock data - replace with actual data fetching
  const campfires: Campfire[] = [
    {
      id: '1',
      name: 'Health Minines',
      description: 'This is a community for health disc...',
      purpose: 'creative outlet',
      memberCount: 4,
      avatar: '👩🏾',
      imageUri:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?',
      joined: true
    },
    {
      id: '2',
      name: 'x/KTU Chaper',
      description: 'This is the best isnt it then',
      purpose: 'growth group',
      memberCount: 4,
      avatar: '👨🏾',
      imageUri:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
    },
    {
      id: '3',
      name: 'KTU',
      description: 'This is it',
      purpose: 'growth group',
      memberCount: 3,
      avatar: 'x/',
    },
    {
      id: '4',
      name: 'x/Best Of Anime',
      description: 'This is your anime provider',
      purpose: 'general discussion',
      memberCount: 8,
      avatar: '🎬',
      imageUri:
      'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=128&q=80',
    },
    {
      id: '5',
      name: 'x/ktu diaries',
      description: 'KTU Diaries is w...',
      purpose: 'general discussion',
      memberCount: 16,
      avatar: '🏫',
    },
  ];

  const filteredCampfires = campfires.filter(campfire => {
    const matchesSearch = campfire.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campfire.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPurpose = selectedPurposes.length === 0 || selectedPurposes.includes(campfire.purpose);
    return matchesSearch && matchesPurpose;
  });

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-4 pb-20">
        <DiscoveryHeader />
        
        <View className="flex-row items-center gap-2 mt-3 mb-4">
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <PurposeFilter
            selectedPurposes={selectedPurposes}
            onPurposesChange={setSelectedPurposes}
          />
        </View>

        <CampfireList campfires={filteredCampfires} />
      </View>
    </View>
  );
}