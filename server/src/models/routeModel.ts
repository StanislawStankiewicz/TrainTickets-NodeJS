import mongoose, { Document } from "mongoose";

// Define the IRoute interface
export interface IRoute extends Document {
  _id?: string;
  name: string;
  stations: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Route Schema
const routeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
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
