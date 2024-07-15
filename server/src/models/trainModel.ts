import mongoose, { Document } from "mongoose";

// Define the ITrain interface
interface ITrain extends Document {
  name: string;
  number: string;
  seatsAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Train Schema
const trainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    seatsAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Train = mongoose.model<ITrain>("Train", trainSchema);
export default Train;
