import { dbconnect } from "@/helper/dbconnect";
import { taskModel } from "@/models/taskModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
//get particular user by userId
export async function GET(request, { params }) {
  await dbconnect();
  try {
    const userId = params.userTasks;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          message: "userId not found or incorrect userId",
        },
        { status: 404 }
      );
    }

    const user = await taskModel.findOne({ userId });
    // you cant access params directly in next js intead they provide function params

    return NextResponse.json({
      message: "userId fetched succesfully",
      user,
    });
  } catch (err) {
    return NextResponse.json({
      message: "error " + err.message,
    });
  }
}

//update user data
export async function PATCH(request, { params }) {
  await dbconnect();
  const data = await request.json();
  const { title, content, status } = data;
  const allowedUpdates = ["title", "content", "status"];
  const userId = params.userTasks;
  try {
    const isallowedUpdates = Object.keys(data).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isallowedUpdates) {
      return NextResponse.json({
        message:
          "Check update fields!! Only title, content and status update is allowed",
      });
    }
    const updatedData = await taskModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          title,
          content,
          status,
        },
      },
      { runValidators: true }
    );
    return NextResponse.json({
      message: "updated sucessfully",
      updatedData,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "an error occured " + error.message,
    });
  }
}
