import { NextRequest, NextResponse } from 'next/server';

interface SubscriptionBody {
  planId: string;
  planAdditionalList: string[];
  trial_period_days: number;
  periods_number: number;
}

interface SubscriptionBackendResponse {
  subscriptionId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_SUBS?.trim();
  try {
    const body = (await req.json()) as SubscriptionBody;
    const res = await fetch(`${base}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Temporal: el gateway en producción inyecta x-user-id desde el JWT
        'x-user-id': '123',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error al crear la suscripción' }, { status: res.status });
    }
    const data = (await res.json()) as SubscriptionBackendResponse;
    return NextResponse.json({ subscriptionId: data.subscriptionId });
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
