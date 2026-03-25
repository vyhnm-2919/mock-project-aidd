import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: kudoId } = await params;

    // Check if kudo exists
    const { data: kudo, error: kudoError } = await supabase
      .from("kudos")
      .select("id")
      .eq("id", kudoId)
      .single();

    if (kudoError || !kudo) {
      return NextResponse.json({ error: "Kudo not found" }, { status: 404 });
    }

    // Check if already hearted
    const { data: existing } = await supabase
      .from("kudos_hearts")
      .select("user_id")
      .eq("kudo_id", kudoId)
      .eq("user_id", user.id)
      .single();

    if (existing) {
      // Unheart
      await supabase
        .from("kudos_hearts")
        .delete()
        .eq("kudo_id", kudoId)
        .eq("user_id", user.id);
    } else {
      // Heart
      await supabase
        .from("kudos_hearts")
        .insert({ kudo_id: kudoId, user_id: user.id });
    }

    // Get updated count
    const { count } = await supabase
      .from("kudos_hearts")
      .select("*", { count: "exact", head: true })
      .eq("kudo_id", kudoId);

    return NextResponse.json({
      hearted: !existing,
      heart_count: count ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
