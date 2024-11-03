import { dbconnect } from "@/helper/dbconnect";
import { UserModel } from "@/models/userSchema";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";
// sign in user
export async function POST(request) {
  await dbconnect();
  const { email, password } = await request.json();
  const User = await UserModel.findOne({ email });
  if (!User) {
    return NextResponse.json({
      message: "user does not exist!!please Signup to login",
    });
  }
  const isPasswordValid = await compare(password, User.password);
  if (isPasswordValid) {
    return NextResponse.json({
      message: User.username + " logged in successfully",
    });
  } else {
    return NextResponse.json(
      {
        message: "Incorrect password!! Please enter correct password",
      },
      { status: 400 }
    );
  }
}
