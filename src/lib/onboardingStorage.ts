import type { StoredOnboardingState } from '@/types/onboarding';

const STORAGE_KEY = 'powip_onboarding';

export function saveOnboardingState(state: StoredOnboardingState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getStoredOnboardingState(): StoredOnboardingState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredOnboardingState;
  } catch {
    return null;
  }
}

export function clearOnboardingState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
