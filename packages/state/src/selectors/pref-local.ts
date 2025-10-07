import { useAppStore } from '../create-store';

export const usePrefToggles = () => useAppStore((s) => s.toggles);
export const useSetPrefToggle = () => useAppStore((s) => s.setToggle);
export const useResetPrefToggles = () => useAppStore((s) => s.resetToggles);
