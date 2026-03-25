import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as { box_id?: string };
    if (!body.box_id) {
      return NextResponse.json({ error: "box_id is required" }, { status: 400 });
    }

    // Verify ownership and unopened status
    const { data: box, error: fetchError } = await supabase
      .from("secret_boxes")
      .select("id, is_opened, gift_description")
      .eq("id", body.box_id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !box) {
      return NextResponse.json({ error: "Secret box not found" }, { status: 404 });
    }

    if (box.is_opened) {
      return NextResponse.json({ error: "Secret box already opened" }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from("secret_boxes")
      .update({ is_opened: true, opened_at: new Date().toISOString() })
      .eq("id", body.box_id);

    if (updateError) {
      console.error("Error opening secret box:", updateError);
      return NextResponse.json({ error: "Failed to open secret box" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      gift_description: box.gift_description ?? "",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
