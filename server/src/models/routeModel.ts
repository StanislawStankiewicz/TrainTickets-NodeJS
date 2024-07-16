import mongoose, { Document, ObjectId } from "mongoose";

// Define the IRoute interface
export interface IRoute extends Document {
  _id?: ObjectId;
  name: string;
  stations: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Route Schema
const routeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stations: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Route = mongoose.model<IRoute>("Route", routeSchema);
