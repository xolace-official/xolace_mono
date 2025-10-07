import { useAppStore } from '../create-store';

//import {shallow} from "zustand/shallow"
export const useIsAuthenticated = () => useAppStore((s) => s.isAuthenticated);

export const useUserId = () => useAppStore((s) => s.userId);
export const useUserEmail = () => useAppStore((s) => s.email);

// to use the below format , wrap with shallow
/*
 *The shallow parameter tells Zustand to compare the object's properties rather than the object reference itself, preventing unnecessary re-renders.
 */

//export const useAuthIdentity = () => useAppStore((s) => ({ userId: s.userId, email: s.email }));
