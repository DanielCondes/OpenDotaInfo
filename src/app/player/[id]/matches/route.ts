import { NextResponse } from "next/server";
import { getPlayerMatches } from "@/lib/opendota";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const url = new URL(_req.url);
  const limit = Number(url.searchParams.get("limit") ?? "10");
  const offset = Number(url.searchParams.get("offset") ?? "0");

  const matches = await getPlayerMatches(id, limit, offset);
  return NextResponse.json(matches);
}