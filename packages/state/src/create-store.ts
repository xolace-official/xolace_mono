import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { mmkvStorage } from './storage/mmkv';

export const ONBOARDING_VERSION = '2025.10.1';

type OnboardingSlice = {
  onboardingCompletedVersion: string | null;
  completeOnboarding: (version?: string) => void;
  resetOnboarding: () => void;
};

type AuthSlice = {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setAuth: (p: { userId: string | null; email: string | null }) => void;
  resetAuth: () => void;
};

type UiSlice = {
  theme: 'system' | 'light' | 'dark';
  setTheme: (t: 'system' | 'light' | 'dark') => void;
};

type ProfileLocalSlice = {
  editDraft: Record<string, unknown> | null;
  setEditDraft: (draft: Record<string, unknown> | null) => void;
  clearDraft: () => void;
};

type PrefLocalSlice = {
  // mirrors for instant UX (e.g. show_sensitive_content) while server catches up
  toggles: Record<string, boolean>;
  setToggle: (key: string, value: boolean) => void;
  resetToggles: () => void;
};

type HydrationSlice = {
  _hasHydrated: boolean;
  _setHasHydrated: (v: boolean) => void;
};

export type AppState = AuthSlice &
  UiSlice &
  ProfileLocalSlice &
  PrefLocalSlice &
  OnboardingSlice &
  HydrationSlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // auth slice (derived, not authoritative)
        userId: null,
        email: null,
        isAuthenticated: false,
        setAuth: ({ userId, email }) =>
          set({ userId, email, isAuthenticated: !!userId }),
        resetAuth: () =>
          set({ userId: null, email: null, isAuthenticated: false }),

        // ui slice
        theme: 'system',
        setTheme: (t) => set({ theme: t }),

        // profile local slice
        editDraft: null,
        setEditDraft: (draft) => set({ editDraft: draft }),
        clearDraft: () => set({ editDraft: null }),

        // preferences local slice
        toggles: {},
        setToggle: (key, value) =>
          set((s) => ({ toggles: { ...s.toggles, [key]: value } })),
        resetToggles: () => set({ toggles: {} }),

        // onboarding (versioned)
        onboardingCompletedVersion: null,
        completeOnboarding: (version = ONBOARDING_VERSION) =>
          set({ onboardingCompletedVersion: version }),
        resetOnboarding: () => set({ onboardingCompletedVersion: null }),

        // hydration
        _hasHydrated: false,
        _setHasHydrated: (v) => set({ _hasHydrated: v }),
      }),
      {
        name: 'xolace-app-store',
        storage: createJSONStorage(() => mmkvStorage),
        partialize: (s) => ({
          // persist only what is safe/useful at boot
          theme: s.theme,
          toggles: s.toggles,
          onboardingCompletedVersion: s.onboardingCompletedVersion,
          // DO NOT persist auth identifiers unless you explicitly want cached UI routing.
          // userId/email/isAuthenticated rehydrate from Supabase listener on boot.
        }),
        onRehydrateStorage: () => (state) => {
          // mark hydrated after rehydrate finishes
          state?._setHasHydrated?.(true);
        },
      },
    ),
  ),
);
