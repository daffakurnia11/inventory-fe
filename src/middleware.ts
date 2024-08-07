import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_PATH, PATH, PROTECTED_PATH, PUBLIC_PATH } from "./utils/path";

export function middleware(request: NextRequest) {
  const path = `/${request.nextUrl.pathname.split("/")[1]}`;

  const isProtectedRoute = PROTECTED_PATH.includes(path);

  const isPublicRoute = PUBLIC_PATH.includes(path);

  const session = cookies().get("session")?.value;

  const cookie = session ? JSON.parse(session) : "";

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie?.token) {
    return NextResponse.redirect(new URL(AUTH_PATH.LOGIN, request.nextUrl));
  }

  // Redirect to root if the user is authenticated
  if (isPublicRoute && cookie?.token) {
    return NextResponse.redirect(new URL(PATH.ROOT, request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.jpeg$).*)",
  ],
};
