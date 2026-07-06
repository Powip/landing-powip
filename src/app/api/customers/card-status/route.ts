import { NextRequest, NextResponse } from 'next/server';

interface CardStatusBackendResponse {
  status: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_SUBS?.trim();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  if (!userId || !token) {
    return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
  }

  try {
    const res = await fetch(`${base}/customers/register/card/status`, {
      headers: {
        'x-user-id': userId,
        token,
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error al verificar el estado de la tarjeta' }, { status: res.status });
    }
    const data = (await res.json()) as CardStatusBackendResponse;
    return NextResponse.json({ status: data.status });
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
