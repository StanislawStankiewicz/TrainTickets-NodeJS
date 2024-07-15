import mongoose, { Document } from "mongoose";

// Define the IStation interface
interface IStation extends Document {
  name: string;
  code?: string;
  city?: string;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Station Schema
const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
      unique: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Station = mongoose.model<IStation>("Station", stationSchema);
export default Station;
