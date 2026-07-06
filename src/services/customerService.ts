export async function createCustomer(): Promise<{ customerId: string }> {
  const res = await fetch('/api/customers', { method: 'POST' });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al crear el perfil de cliente');
  }
  return res.json() as Promise<{ customerId: string }>;
}

export async function registerCard(userId: string): Promise<{ url: string; token: string }> {
  const res = await fetch('/api/customers/register-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al iniciar el registro de tarjeta');
  }
  return res.json() as Promise<{ url: string; token: string }>;
}

export async function getCardStatus(userId: string, token: string): Promise<{ status: string }> {
  const params = new URLSearchParams({ userId, token });
  const res = await fetch(`/api/customers/card-status?${params.toString()}`);
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al verificar la tarjeta');
  }
  return res.json() as Promise<{ status: string }>;
}
