import { useAppStore } from '../create-store';

export const useProfileDraft = () => useAppStore((s) => s.editDraft);
export const useSetProfileDraft = () => useAppStore((s) => s.setEditDraft);
export const useClearProfileDraft = () => useAppStore((s) => s.clearDraft);
