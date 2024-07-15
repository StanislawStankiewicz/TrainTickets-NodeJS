import mongoose, { Document } from "mongoose";

// Define the IUser interface
interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
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
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
