import { NextRequest, NextResponse } from "next/server";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginBackendResponse {
  token: string;
  userId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_USERS?.trim();

  console.log("[LOGIN] Base URL:", base);

  try {
    const body = (await req.json()) as LoginBody;

    console.log("[LOGIN] Request body:", body);

    const url = `${base}/auth/login`;
    console.log("[LOGIN] Fetching:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("[LOGIN] Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("[LOGIN] Error response:", errorText);

      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: res.status },
      );
    }

    const data = (await res.json()) as LoginBackendResponse;

    console.log("[LOGIN] Response data:", data);

    const isProd = process.env.NODE_ENV === "production";
    console.log("[LOGIN] Is production:", isProd);

    const response = NextResponse.json({ userId: data.userId });

    response.cookies.set("auth_token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("[LOGIN] Cookie set OK");

    return response;
  } catch (error) {
    console.log("[LOGIN] Catch error:", error);

    return NextResponse.json(
      { error: "Error al conectar con el servidor" },
      { status: 500 },
    );
  }
}
