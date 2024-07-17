import mongoose, { Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { Password, IPassword } from "./passwordsModel";

// Define the IUser interface
export interface IUser extends Document {
  _id?: ObjectId;
  name: string;
  email: string;
  refreshToken?: string;
  phone?: string;
  tickets?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    tickets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ticket",
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);

export async function registerUser(
  user: IUser,
  userPwd: string
): Promise<IUser> {
  if (userPwd.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const hashedPassword = await bcrypt.hash(userPwd, 10);
  await user.save();
  const userId = await User.findOne({ email: user.email }).select("_id").exec();
  if (!userId) {
    throw new Error("Error creating user, user not found.");
  }
  const password: IPassword = new Password({
    userId: userId._id,
    password: hashedPassword,
  });
  password.save();
  return user;
}

export async function loginUser(
  email: string,
  password: string
): Promise<IUser | null> {
  const user = await User.findOne({ email }).select("_id").exec();
  const hashedPassword = (
    await Password.findOne({ userId: user?._id }).select("password").exec()
  )?.password;
  if (!user || !hashedPassword) {
    throw new Error("Wrong email or password");
  }
  if (await bcrypt.compare(password, hashedPassword)) {
    return user;
  }
  return null;
}

export async function getUserByRefreshToken(
  refreshToken: string
): Promise<IUser | null> {
  return User.findOne({ refreshToken }).exec();
}

export async function deleteRefreshToken(userId: ObjectId): Promise<void> {
  User.updateOne({ _id: userId }, { refreshToken: null }).exec();
}
