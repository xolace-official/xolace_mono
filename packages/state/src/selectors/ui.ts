import { useAppStore } from '../create-store';

export const useTheme = () => useAppStore((s) => s.theme);
export const useSetTheme = () => useAppStore((s) => s.setTheme);
