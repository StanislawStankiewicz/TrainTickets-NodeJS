import mongoose, { Document, ObjectId } from "mongoose";
import { IRoute, Route } from "../models/routeModel";
import { getSections } from "../utils/getSections";
import { findBestSeat } from "../utils/findBestSeat";

export type Seat = {
  seatNumber: string;
  sectionsStatus: ("Available" | "Unavailable")[];
};

// Define the IRide interface
export interface IRide extends Document {
  _id?: ObjectId;
  route: IRoute;
  train: ObjectId;
  seats: Seat[];
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
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    seats: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        sectionsStatus: {
          type: [String],
          enum: ["Available", "Unavailable"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Ride = mongoose.model<IRide>("Ride", rideSchema);

const routesCache: { [key: string]: IRoute } = {};

export async function claimFreeSeat(
  ride: IRide,
  originStation: string,
  destinationStation: string
): Promise<string> {
  // Find the route
  let route: IRoute | null = routesCache[ride.route.toString()];
  if (!route) {
    route = await Route.findOne({
      _id: ride.route,
    }).exec();
    if (!route) {
      throw new Error("Route not found");
    }
    routesCache[route._id!.toString()] = route;
  }
  const sections: number[] = getSections(
    route.stations,
    originStation,
    destinationStation
  );
  const freeSeat: string = findBestSeat(ride.seats, sections);

  // Update the ride
  ride.seats = ride.seats.map((seat) => {
    if (seat.seatNumber === freeSeat) {
      sections.forEach((section) => {
        seat.sectionsStatus[section - 1] = "Unavailable";
      });
    }
    return seat;
  });
  ride.save();

  return freeSeat;
}
