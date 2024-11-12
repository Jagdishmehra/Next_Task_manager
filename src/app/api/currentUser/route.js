import { UserModel } from "@/models/userSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("loginToken")?.value;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(data);
  //user information
  const user = await UserModel.findById(data.updateUser._id).select(
    "-password"
  );
  //console.log(user);
  return NextResponse.json({
    message: "data fetched",
  });
}
