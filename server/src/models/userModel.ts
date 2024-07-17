import mongoose, { Document, ObjectId } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  _id?: ObjectId;
  name: string;
  email: string;
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

// export async function registerUser(
//   user: IUser,
//   hashedPassword: string
// ): Promise<IUser> {
//   return user.save();
// }
