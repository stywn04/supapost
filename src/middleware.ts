import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return user
      ? NextResponse.redirect(new URL("/posts", request.nextUrl))
      : NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (pathname.startsWith("/auth") && user) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!pathname.startsWith("/auth") && !user) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirectTo=${pathname}`, request.nextUrl)
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
