import { dbconnect } from "@/helper/dbconnect";
import { taskModel } from "@/models/taskModel";
import { NextResponse } from "next/server";
//post user data onto db
export async function POST(request) {
  await dbconnect();
  const { title, content, userId } = await request.json();
  try {
    const taskContent = new taskModel({
      title,
      content,
      userId,
    });
    const data = await taskContent.save();
    return NextResponse.json({
      message: "content saved sucessfully",
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 400 }
    );
  }
}
//get all users data
export async function GET() {
  await dbconnect();
  try {
    const data = await taskModel.find();
    return NextResponse.json({
      message: "All tasks fetched sucessfully",
      data,
    });
  } catch (err) {
    return NextResponse.json({
      message: "failed to fetch data " + err.message,
    });
  }
}
