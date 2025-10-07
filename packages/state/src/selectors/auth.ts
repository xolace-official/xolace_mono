import { useAppStore } from "../create-store";
export const useIsAuthenticated = () => useAppStore((s) => s.isAuthenticated);
export const useAuthIdentity = () => useAppStore((s) => ({ userId: s.userId, email: s.email }));
