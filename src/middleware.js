import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl; //extracted the base url
  const cookie = request.cookies.get("loginToken")?.value;

  const UnAcessLoginUserRoutes =
    url.pathname === "/loginForm" || url.pathname === "/signupForm";
  if (UnAcessLoginUserRoutes) {
    if (cookie) {
      return NextResponse.redirect(new URL("/userProfile", request.url));
    }
  } else {
    if (!cookie) {
      return NextResponse.redirect(new URL("/loginForm", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/add-task",
    "/loginForm",
    "/signupForm",
    "/userProfile",
    "/api/:path*",
  ],
};
