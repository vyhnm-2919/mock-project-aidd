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
      .select(`
        gift_description,
        user:user_profiles!secret_boxes_user_id_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url)
      `)
      .eq("is_opened", true)
      .order("opened_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching top receivers:", error);
      return NextResponse.json({ error: "Failed to fetch top receivers" }, { status: 500 });
    }

    const formatted = (data ?? []).map((item) => ({
      profile: Array.isArray(item.user) ? item.user[0] : item.user,
      gift_description: item.gift_description ?? "",
    }));

    return NextResponse.json({ data: formatted });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
