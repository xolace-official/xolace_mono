export type EntityType = 'post' | 'comment' | 'vote' | 'report' | 'profile' | 'system' | 'view' | 'video';
export type ActionType = 'created' | 'deleted' | 'updated' | 'commented' | 'reported' | 'upvoted' | 'downvoted' | 'viewed' | 'added' | 'liked';

export interface User {
  id: string;
  name: string;
  avatar_url: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  user: User;
  related_user_id?: string;
  related_user?: User;
  entity_type: EntityType;
  entity_id: string;
  action: ActionType;
  metadata: Record<string, any>;
  created_at: string;
  ip_address?: string;
}

export enum ActivityType{
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  SIGNOUT = 'signout',
  POST = 'post',
  COMMENT = 'comment',
  VOTE = 'vote',
  REPORT = 'report',
  PROFILE = 'profile',
  SYSTEM = 'system',
  VIEW = 'view',
  VIDEO = 'video'
}

//
export interface DbUser{
  id: string;
  username: string;
  avatar_url: string;
}

// New interface based on the activity_logs database schema
export interface DbActivityLog {
  id: string;
  user_id: string;
  related_user_id?: string;
  entity_type: 'post' | 'comment' | 'vote' | 'report' | 'profile' | 'system' | 'view';
  related_username?: string;
  related_user_avatar_url?: string;
  username: string,
  user_avatar_url: string,
  
  // Entity-specific references
  post_id?: string;
  comment_id?: number;
  vote_id?: number;
  report_id?: number;
  profile_id?: string;
  video_id?: string;
  action: ActionType;
  metadata: Record<string, any>;
  created_at: string;
  ip_address?: string;
  
  // Join relationships
}


// Types for Reputation System
export interface ReputationInteraction {
  action: ActionType; // e.g., 'upvoted', 'created', 'deleted'
  entityType: EntityType; // e.g., 'post', 'comment', 'vote'
}

export interface UpdateReputationParams {
  interaction: ReputationInteraction;
  performerId: string; // User ID of the person performing the action
  authorId?: string | null; // User ID of the content author (optional, e.g., for self-actions or system actions)
  metadata?: Record<string, any>; // Additional metadata (optional)
}