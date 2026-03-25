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
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 10));
    const hashtag = searchParams.get("hashtag");
    const department = searchParams.get("department");
    const category = searchParams.get("category");
    const offset = (page - 1) * limit;

    let query = supabase
      .from("kudos")
      .select(`
        id, content, hashtag_category, created_at,
        sender:user_profiles!kudos_sender_profile_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url),
        receiver:user_profiles!kudos_receiver_profile_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url),
        kudos_hashtags(hashtag),
        kudos_images(image_url, sort_order),
        kudos_hearts(user_id)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("hashtag_category", category);
    }

    if (hashtag) {
      const { data: matchingKudos } = await supabase
        .from("kudos_hashtags")
        .select("kudo_id")
        .eq("hashtag", hashtag);
      const kudoIds = (matchingKudos ?? []).map((k) => k.kudo_id);
      if (kudoIds.length === 0) {
        return NextResponse.json({ data: [], total: 0, page, has_more: false });
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
        return NextResponse.json({ data: [], total: 0, page, has_more: false });
      }
      query = query.or(`sender_id.in.(${userIds.join(",")}),receiver_id.in.(${userIds.join(",")})`);
    }

    const { data: kudos, count, error } = await query;

    if (error) {
      console.error("Error fetching kudos:", error);
      return NextResponse.json({ error: "Failed to fetch kudos", details: error.message }, { status: 500 });
    }

    const formatted = (kudos ?? []).map((kudo) => ({
      id: kudo.id,
      sender: Array.isArray(kudo.sender) ? kudo.sender[0] : kudo.sender,
      receiver: Array.isArray(kudo.receiver) ? kudo.receiver[0] : kudo.receiver,
      content: kudo.content,
      hashtag_category: kudo.hashtag_category,
      hashtags: (kudo.kudos_hashtags ?? []).map((h: { hashtag: string }) => h.hashtag),
      images: (kudo.kudos_images ?? [])
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((i: { image_url: string }) => i.image_url),
      heart_count: (kudo.kudos_hearts ?? []).length,
      is_hearted: (kudo.kudos_hearts ?? []).some((h: { user_id: string }) => h.user_id === user.id),
      created_at: kudo.created_at,
    }));

    const total = count ?? 0;
    return NextResponse.json({
      data: formatted,
      total,
      page,
      has_more: offset + limit < total,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

interface CreateKudoBody {
  receiver_id: string;
  danh_hieu: string;
  content: string;
  hashtags: string[];
  images: string[];
  is_anonymous: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as CreateKudoBody;

    // Validate required fields
    if (!body.receiver_id) {
      return NextResponse.json({ error: "receiver_id is required" }, { status: 400 });
    }
    if (!body.danh_hieu?.trim()) {
      return NextResponse.json({ error: "danh_hieu is required" }, { status: 400 });
    }
    const strippedContent = body.content?.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent) {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }
    if (!body.hashtags || body.hashtags.length < 1 || body.hashtags.length > 5) {
      return NextResponse.json({ error: "1-5 hashtags required" }, { status: 400 });
    }
    if (body.images && body.images.length > 5) {
      return NextResponse.json({ error: "Max 5 images" }, { status: 400 });
    }

    // Verify receiver exists
    const { data: receiver } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("id", body.receiver_id)
      .single();

    if (!receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 400 });
    }

    // Insert kudo
    const { data: kudo, error: kudoError } = await supabase
      .from("kudos")
      .insert({
        sender_id: user.id,
        receiver_id: body.receiver_id,
        content: body.content,
        danh_hieu: body.danh_hieu,
        hashtag_category: body.hashtags[0] ?? null,
        is_anonymous: body.is_anonymous ?? false,
      })
      .select("id")
      .single();

    if (kudoError || !kudo) {
      console.error("Error creating kudo:", kudoError);
      return NextResponse.json({ error: "Failed to create kudo" }, { status: 500 });
    }

    // Insert hashtags
    if (body.hashtags.length > 0) {
      await supabase.from("kudos_hashtags").insert(
        body.hashtags.map((tag) => ({ kudo_id: kudo.id, hashtag: tag }))
      );
    }

    // Insert images
    if (body.images && body.images.length > 0) {
      await supabase.from("kudos_images").insert(
        body.images.map((url, idx) => ({ kudo_id: kudo.id, image_url: url, sort_order: idx }))
      );
    }

    return NextResponse.json({ success: true, id: kudo.id });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
