import mongoose, { Document } from "mongoose";

// Define the IRoute interface
interface IRoute extends Document {
  train: string;
  stations: {
    station: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Route Schema
const routeSchema = new mongoose.Schema(
  {
    train: {
      type: String,
      ref: "Train",
      required: true,
    },
    stations: [
      {
        station: {
          type: String,
          ref: "Station",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Route = mongoose.model<IRoute>("Route", routeSchema);
export default Route;
