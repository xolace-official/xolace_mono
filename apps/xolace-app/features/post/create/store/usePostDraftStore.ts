import { create } from 'zustand';

export type PostDraftMode = 'text' | 'voice';

export type PostDraftCommunity = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  memberCount?: number;
  avatar?: string;
};

export type PostMediaAttachment = {
  uri: string;
  width?: number;
  height?: number;
  mimeType?: string | null;
};

type PostDraftState = {
  title: string;
  body: string;
  community: PostDraftCommunity | null;
  moodKey: string | null;
  image: PostMediaAttachment | null;
  is24hOnly: boolean;
  mode: PostDraftMode;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setCommunity: (community: PostDraftCommunity | null) => void;
  setMood: (key: string | null) => void;
  attachImage: (media: PostMediaAttachment | null) => void;
  setIs24hOnly: (value: boolean) => void;
  setMode: (mode: PostDraftMode) => void;
  reset: () => void;
};

const baseState: Omit<
  PostDraftState,
  | 'setTitle'
  | 'setBody'
  | 'setCommunity'
  | 'setMood'
  | 'attachImage'
  | 'setIs24hOnly'
  | 'setMode'
  | 'reset'
> = {
  title: '',
  body: '',
  community: null,
  moodKey: null,
  image: null,
  is24hOnly: false,
  mode: 'text',
};

export const usePostDraftStore = create<PostDraftState>((set) => ({
  ...baseState,
  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setCommunity: (community) => set({ community }),
  setMood: (key) => set({ moodKey: key }),
  attachImage: (media) => set({ image: media }),
  setIs24hOnly: (value) => set({ is24hOnly: value }),
  setMode: (mode) => set({ mode }),
  reset: () => set({ ...baseState }),
}));
