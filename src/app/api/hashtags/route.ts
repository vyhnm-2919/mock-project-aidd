import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("hashtags")
      .select("name")
      .order("name");

    if (error) {
      console.error("Error fetching hashtags:", error);
      return NextResponse.json({ error: "Failed to fetch hashtags" }, { status: 500 });
    }

    return NextResponse.json({
      data: (data ?? []).map((h) => h.name),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
