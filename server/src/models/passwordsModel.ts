import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IPassword extends Document {
  userId: ObjectId;
  password: string;
}

const PasswordSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Password = mongoose.model<IPassword>("Password", PasswordSchema);
