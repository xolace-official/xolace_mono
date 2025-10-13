import { ONBOARDING_VERSION, useAppStore } from '../create-store';

export const useSelectHasCompletedOnboarding = () =>
  useAppStore((s) => s.onboardingCompletedVersion === ONBOARDING_VERSION);
