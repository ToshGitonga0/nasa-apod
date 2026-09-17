import { NextRequest, NextResponse } from "next/server";
import { fetchApod } from "@/lib/nasa";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? undefined;

  try {
    const apod = await fetchApod(date);
    return NextResponse.json(apod);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reach NASA's APOD API.";

    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
