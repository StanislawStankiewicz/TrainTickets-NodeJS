import mongoose, { Document } from "mongoose";

// Define the IRide interface
interface IRide extends Document {
  route: string;
  seats: {
    seatNumber: string;
    status: "Available" | "Unavailable";
  }[];
  fromStation: string;
  toStation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Ride Schema
const rideSchema = new mongoose.Schema(
  {
    route: {
      type: String,
      ref: "Route",
      required: true,
    },
    seats: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Available", "Unavailable"],
          required: true,
        },
      },
    ],
    fromStation: {
      type: String,
      ref: "Station",
      required: true,
    },
    toStation: {
      type: String,
      ref: "Station",
      required: true,
    },
  },
  { timestamps: true }
);

export const Ride = mongoose.model<IRide>("Ride", rideSchema);
