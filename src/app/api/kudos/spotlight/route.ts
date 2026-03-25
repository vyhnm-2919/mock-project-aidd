import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.rpc("get_spotlight_data");

    if (error) {
      // Fallback: manual aggregation if RPC not available
      const { data: kudos, error: fallbackError } = await supabase
        .from("kudos")
        .select("receiver_id, receiver:user_profiles!kudos_receiver_profile_fkey(full_name)");

      if (fallbackError) {
        console.error("Error fetching spotlight:", fallbackError);
        return NextResponse.json({ error: "Failed to fetch spotlight" }, { status: 500 });
      }

      const counts = new Map<string, { name: string; count: number }>();
      for (const kudo of kudos ?? []) {
        const receiver = Array.isArray(kudo.receiver) ? kudo.receiver[0] : kudo.receiver;
        const name = receiver?.full_name ?? "Unknown";
        const existing = counts.get(kudo.receiver_id);
        if (existing) {
          existing.count++;
        } else {
          counts.set(kudo.receiver_id, { name, count: 1 });
        }
      }

      const entries = Array.from(counts.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 100);

      return NextResponse.json({
        data: entries,
        total_kudos: kudos?.length ?? 0,
      });
    }

    return NextResponse.json({
      data: data ?? [],
      total_kudos: (data ?? []).reduce((sum: number, e: { count: number }) => sum + e.count, 0),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
