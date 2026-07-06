import { NextRequest, NextResponse } from 'next/server';

interface RegisterCardBody {
  userId: string;
}

interface RegisterCardBackendResponse {
  url: string;
  token: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_SUBS?.trim();
  try {
    const body = (await req.json()) as RegisterCardBody;
    const res = await fetch(`${base}/customers/register/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': body.userId,
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error al iniciar el registro de tarjeta' }, { status: res.status });
    }
    const data = (await res.json()) as RegisterCardBackendResponse;
    return NextResponse.json({ url: data.url, token: data.token });
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
