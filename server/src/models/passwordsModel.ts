import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IPassword extends Document {
  userId: ObjectId;
  password: string;
}

const PasswordSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPassword>("Password", PasswordSchema);
