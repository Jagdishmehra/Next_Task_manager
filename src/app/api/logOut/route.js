import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({
    message: "Logout Successful!!",
    success: true,
  });
  response.cookies.set("loginToken", "", {
    expiresIn: new Date(0),
    path: "/",
  });
  return response;
}
