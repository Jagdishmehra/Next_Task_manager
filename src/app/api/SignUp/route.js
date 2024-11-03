import { dbconnect } from "@/helper/dbconnect";
import { UserModel } from "@/models/userSchema";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
//signup user
export async function POST(request) {
  await dbconnect();
  const { username, email, password, about, photoUrl } = await request.json();
  const hashedPassword = await hash(password, 10);
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json({
        message: "user already exists",
      });
    }
    const userData = new UserModel({
      username,
      email,
      password: hashedPassword,
      about,
      photoUrl,
    });
    const saveDb = await userData.save();
    return NextResponse.json({ message: "User added successfully" });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 400 }
    );
  }
}
