import { NextResponse } from "next/server";
import { MOCK_AGENCIES } from "@/app/api/mock/_mockData";

// Solo para preview local (ver docs/hito1-backend-requirements.md). No
// disponible en producción.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }
  return NextResponse.json(MOCK_AGENCIES);
}
