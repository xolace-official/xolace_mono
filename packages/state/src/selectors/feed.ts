import { useAppStore } from '../create-store';

export const useFeedFilter = () => useAppStore((s) => s.feedFilter);
export const useSetFeedFilter = () => useAppStore((s) => s.setFeedFilter);
