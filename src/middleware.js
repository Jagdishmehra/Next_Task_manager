import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl; //extracted the base url
  const cookie = request.cookies.get("loginToken")?.value;
  //console.log(cookie);
  //made these sign in and sign up routes public.
  if (
    url.pathname.startsWith("/api/SignIn") ||
    url.pathname.startsWith("/api/SignUp")
  ) {
    return;
  }
  const UnAcessLoginUserRoutes =
    url.pathname === "/loginForm" || url.pathname === "/signupForm";
  try {
    if (UnAcessLoginUserRoutes) {
      if (cookie) {
        return NextResponse.redirect(new URL("/userProfile", url));
      }
    } else {
      if (!cookie) {
        if (request.nextUrl.pathname.startsWith("/api")) {
          return NextResponse.json(
            {
              message: "Access Denied !!",
              success: false,
            },
            {
              status: 401,
            }
          );
        }

        return NextResponse.redirect(new URL("/loginForm", request.url));
      }
    }
  } catch (err) {
    console.log("Error in middleware:", err.message);
    return NextResponse.json({ status: 401, message: "Unauthorized Access" });
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
// we have included them inside these routes cuz we want middle-ware to detect them
//to exclude these pages when user is logged in
