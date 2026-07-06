import type { CreateSubscriptionData, Invoice } from '@/types/onboarding';

export async function createSubscription(
  data: CreateSubscriptionData,
): Promise<{ subscriptionId: string }> {
  const res = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al crear la suscripción');
  }
  return res.json() as Promise<{ subscriptionId: string }>;
}

export async function getInvoices(subscriptionId: string): Promise<Invoice[]> {
  const res = await fetch(`/api/invoices?subscriptionId=${encodeURIComponent(subscriptionId)}`);
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al obtener las facturas');
  }
  return res.json() as Promise<Invoice[]>;
}
