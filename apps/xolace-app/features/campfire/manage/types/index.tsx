// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/types.ts
export type CampfirePurpose = 
  | 'support circle' 
  | 'growth group' 
  | 'creative outlet' 
  | 'general discussion';

export type CampfireRole = 'firestarter' | 'firekeeper' | 'camper';

export interface UserCampfireFavoriteJoin {
  campfireId: string;
  name: string;
  slug: string;
  description: string;
  members: number;
  purpose: CampfirePurpose;
  iconURL?: string;
  isFavorite: boolean;
  isJoined: boolean;
  joinedAt?: string;
  role?: CampfireRole;
  favoritedAt?: string;
}

export type CampfireFilter = 'all' | 'favorites'