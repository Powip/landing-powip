import { NextRequest, NextResponse } from "next/server";

interface RegisterBody {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_USERS?.trim();

  console.log("[REGISTER] Base URL:", base);

  try {
    const body = (await req.json()) as RegisterBody;

    console.log("[REGISTER] Request body:", body);

    const url = `${base}/auth/register`;
    console.log("[REGISTER] Fetching:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("[REGISTER] Response status:", res.status);

    const text = await res.text();
    console.log("[REGISTER] Raw response:", text);

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("[REGISTER] Error parsing JSON:", e);
      return NextResponse.json(
        { error: "Respuesta inválida del servidor" },
        { status: 500 },
      );
    }

    if (!res.ok) {
      console.error("[REGISTER] API error response:", data);
      return NextResponse.json(
        { error: "Error al registrar la cuenta", details: data },
        { status: res.status },
      );
    }

    console.log("[REGISTER] Success response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("[REGISTER] Catch error:", error);
    return NextResponse.json(
      { error: "Error al conectar con el servidor" },
      { status: 500 },
    );
  }
}
