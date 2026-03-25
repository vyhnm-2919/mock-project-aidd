import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    // TODO: Query notification table when available
    // For now, return stub count
    return NextResponse.json({ count: 0 });
  } catch (error) {
    console.error("Failed to fetch unread notification count:", error);
    return NextResponse.json({ count: 0 });
  }
}
