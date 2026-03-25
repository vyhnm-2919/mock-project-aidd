import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    const [received, sent, hearts, boxOpened, boxUnopened] = await Promise.all([
      supabase.from("kudos").select("*", { count: "exact", head: true }).eq("receiver_id", userId),
      supabase.from("kudos").select("*", { count: "exact", head: true }).eq("sender_id", userId),
      supabase
        .from("kudos_hearts")
        .select("kudo_id, kudos!inner(receiver_id)", { count: "exact", head: true })
        .eq("kudos.receiver_id", userId),
      supabase.from("secret_boxes").select("*", { count: "exact", head: true }).eq("user_id", userId).eq("is_opened", true),
      supabase.from("secret_boxes").select("*", { count: "exact", head: true }).eq("user_id", userId).eq("is_opened", false),
    ]);

    return NextResponse.json({
      kudos_received: received.count ?? 0,
      kudos_sent: sent.count ?? 0,
      hearts_received: hearts.count ?? 0,
      secret_box_opened: boxOpened.count ?? 0,
      secret_box_unopened: boxUnopened.count ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
