import mongoose, { model } from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("enter correct email");
      }
    },
  },
  password: { type: String, required: true, trim: true },
  about: { type: String, default: "this is default user about" },
  photoUrl: {
    type: String,
    default:
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  },
});

export const UserModel =
  mongoose.models.UserModel || new model("UserModel", UserSchema);
// as nextjs supoorts hot reloads that is, it caches the data and reloads on every change.
