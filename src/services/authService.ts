import type { RegisterData } from '@/types/onboarding';

export async function register(data: RegisterData): Promise<void> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al registrar la cuenta');
  }
}

export async function login(email: string, password: string): Promise<{ userId: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? 'Error al iniciar sesión');
  }
  return res.json() as Promise<{ userId: string }>;
}
