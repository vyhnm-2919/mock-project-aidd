import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { supabase, supabaseResponse } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Pre-event: redirect ALL routes to /countdown (except /countdown itself and /login)
  const eventDate = process.env.NEXT_PUBLIC_EVENT_START_DATE;
  if (eventDate && new Date(eventDate) > new Date()) {
    if (pathname === "/countdown") {
      return supabaseResponse;
    }
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/countdown", request.url));
    }
    // /login falls through to normal handling below
  }

  if (pathname === "/login") {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return supabaseResponse;
  }

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|images/|auth/callback).*)",
  ],
};
