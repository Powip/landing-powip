import type { BackendAddOn, BackendPlan } from '@/types/onboarding';

export async function getPlans(): Promise<BackendPlan[]> {
  const res = await fetch('/api/plans');
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al obtener los planes');
  }
  return res.json() as Promise<BackendPlan[]>;
}

export async function getAddOns(): Promise<BackendAddOn[]> {
  const res = await fetch('/api/add-ons');
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al obtener los add-ons');
  }
  return res.json() as Promise<BackendAddOn[]>;
}
