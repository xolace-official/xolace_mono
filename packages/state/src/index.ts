// Core store
export { useAppStore } from './create-store';
export type { AppState } from './create-store';

// Storage adapters (public on purpose)
export { mmkv, mmkvStorage } from './storage/mmkv';

// Selectors (stable convenience API — safe to expose)
export * from './selectors/auth';
export * from './selectors/ui';
export * from './selectors/profile-local';
export * from './selectors/pref-local';
export * from './selectors/onboarding';
