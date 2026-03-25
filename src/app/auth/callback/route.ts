import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=auth_error", request.url)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=auth_error", request.url)
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email?.endsWith("@sun-asterisk.com")) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/login?error=domain_restricted", request.url)
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
