import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const hashtag = searchParams.get("hashtag");
    const department = searchParams.get("department");

    let query = supabase
      .from("kudos")
      .select(`
        id, content, hashtag_category, created_at,
        sender:user_profiles!kudos_sender_profile_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url),
        receiver:user_profiles!kudos_receiver_profile_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url),
        kudos_hashtags(hashtag),
        kudos_hearts(user_id)
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    if (hashtag) {
      // Get kudo IDs that have this hashtag
      const { data: matchingKudos } = await supabase
        .from("kudos_hashtags")
        .select("kudo_id")
        .eq("hashtag", hashtag);
      const kudoIds = (matchingKudos ?? []).map((k) => k.kudo_id);
      if (kudoIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      query = query.in("id", kudoIds);
    }

    if (department) {
      const { data: profileIds } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("department_code", department);
      const userIds = (profileIds ?? []).map((p) => p.id);
      if (userIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      query = query.or(`sender_id.in.(${userIds.join(",")}),receiver_id.in.(${userIds.join(",")})`);
    }

    const { data: kudos, error } = await query;

    if (error) {
      console.error("Error fetching highlights:", error);
      return NextResponse.json({ error: "Failed to fetch highlights" }, { status: 500 });
    }

    const formatted = (kudos ?? [])
      .map((kudo) => ({
        id: kudo.id,
        sender: Array.isArray(kudo.sender) ? kudo.sender[0] : kudo.sender,
        receiver: Array.isArray(kudo.receiver) ? kudo.receiver[0] : kudo.receiver,
        content: kudo.content,
        hashtag_category: kudo.hashtag_category,
        hashtags: (kudo.kudos_hashtags ?? []).map((h: { hashtag: string }) => h.hashtag),
        images: [],
        heart_count: (kudo.kudos_hearts ?? []).length,
        is_hearted: (kudo.kudos_hearts ?? []).some((h: { user_id: string }) => h.user_id === user.id),
        created_at: kudo.created_at,
      }))
      .sort((a, b) => b.heart_count - a.heart_count);

    return NextResponse.json({ data: formatted });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
