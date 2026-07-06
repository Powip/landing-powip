import { NextRequest, NextResponse } from 'next/server';

interface CustomersBackendResponse {
  customerId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_SUBS?.trim();
  const token = req.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const res = await fetch(`${base}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Error al crear el cliente' }, { status: res.status });
    }
    const data = (await res.json()) as CustomersBackendResponse;
    return NextResponse.json({ customerId: data.customerId });
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
