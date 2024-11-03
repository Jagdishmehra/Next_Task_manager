import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true, maxLength: 100, minLength: 2 },
  content: {
    type: String,
    required: true,
    unique: true,
    maxLength: 5000,
    minLength: 10,
  },
  dateOfcreation: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: { type: String, enum: ["completed", "pending"] },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

export const taskModel =
  mongoose.models.taskModel || new model("taskModel", taskSchema);
