import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("token:", token);
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // user NOT logged in
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // user already logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|.*\\..*).*)"],
};
