// types/post.types.ts
import type { LucideIcon } from "lucide-react-native";
export type PostMode = 'text' | 'voice';

export type MoodType = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
};

export type Community = {
  id: string;
  name: string;
  image?: string;
  description?: string;
  member_count?: number;
};

export type PostDraft = {
  title: string;
  body: string;
  mood: string | null;
  community: Community | null;
  mediaUri: string | null;
  is24h: boolean;
  mode: PostMode;
};

export type MediaAsset = {
  uri: string;
  mimeType: string;
  width?: number;
  height?: number;
  fileSize?: number;
};