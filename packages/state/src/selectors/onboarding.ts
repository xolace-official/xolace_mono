import {useAppStore, ONBOARDING_VERSION} from "../create-store";


export const useSelectHasCompletedOnboarding = () => useAppStore((s) =>  s.onboardingCompletedVersion === ONBOARDING_VERSION);