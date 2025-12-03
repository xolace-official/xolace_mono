export type CampfireRole = 'camper' | 'firestarter' | 'firekeeper';

export type CampfirePurpose =
  | 'general_discussion'
  | 'support'
  | 'education'
  | 'other';

export type CampfireDetails = {
  id: string;
  name: string;
  slug: string;
  description: string;
  members: number;
  purpose: CampfirePurpose;
  iconURL?: string;
  bannerUrl?: string;
  visibility: 'public' | 'private' | 'restricted' | 'secret';
  createdAt: string;
  createdBy: string;
  isMember: boolean;
  memberRole: CampfireRole;
  isFavorite: boolean;
  guideEnabled: boolean;
  guideShowOnJoin: boolean;
  guideWelcomeMessage?: string;
};

export type CampfireHighlight = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  badge?: string;
};

export type CampfireGuideResource = {
  id: string;
  title: string;
  url?: string;
};

export type CampfireRule = {
  id: string;
  title: string;
  description: string;
};

export type CampfireModerator = {
  id: string;
  name: string;
  role: CampfireRole;
  avatarUrl?: string;
};
