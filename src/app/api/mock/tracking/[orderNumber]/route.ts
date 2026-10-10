import { NextResponse } from "next/server";
import { buildMockTracking } from "@/app/api/mock/_mockData";

// Solo para preview local (ver docs/hito1-backend-requirements.md). No
// disponible en producción.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }
  const { orderNumber } = await params;
  return NextResponse.json(buildMockTracking(orderNumber));
}
