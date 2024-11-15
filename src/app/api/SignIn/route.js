import { dbconnect } from "@/helper/dbconnect";
import { UserModel } from "@/models/userSchema";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// sign in user
export async function POST(request) {
  await dbconnect();
  const { email, password } = await request.json();
  const User = await UserModel.findOne({ email });
  if (!User) {
    return NextResponse.json({
      message: "User does not exist!!",
    });
  }
  // 1- generated jwt token
  // 2- wrap this token inside cookie
  const isPasswordValid = await compare(password, User.password);
  if (isPasswordValid) {
    //cant directly covert user as it is mongoose doc not js.
    const { password, ...updateUser } = User.toObject();
    const token = jwt.sign({ updateUser }, process.env.JWT_SECRET);
    //console.log(token);
    const cookieStores = await cookies();
    const authToken = cookieStores.set("loginToken", token, {
      expiresIn: "1d",
      httpOnly: true,
      secure: true,
    });
    return NextResponse.json({
      message: "login successful",
      token,
      User,
    });
  } else {
    return NextResponse.json(
      {
        message: "Incorrect password!!",
      },
      { status: 400 }
    );
  }
}
