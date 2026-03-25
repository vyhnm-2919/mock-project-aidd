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
      .from("secret_boxes")
      .select("id, is_opened, gift_description, opened_at")
      .eq("user_id", user.id)
      .eq("is_opened", false);

    if (error) {
      console.error("Error fetching unopened boxes:", error);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
