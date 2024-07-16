import mongoose, { Document } from "mongoose";
import { IRoute, Route } from "../models/routeModel";
import { getSections } from "../utils/getSections";
import { findBestSeat } from "../utils/findBestSeat";

export type Seat = {
  seatNumber: string;
  sectionsStatus: ("Available" | "Unavailable")[];
};

// Define the IRide interface
export interface IRide extends Document {
  route: string;
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

export async function findFreeSeat(
  rideId: string,
  originStation: string,
  destinationStation: string
): Promise<string> {
  // Find the ride
  const ride: IRide | null = await Ride.findById(rideId).exec();
  if (!ride) {
    throw new Error("Ride not found");
  }
  // Find the route
  let route: IRoute | null = routesCache[ride.route];
  if (!route) {
    route = await Route.findOne({
      route: ride.route,
    }).exec();
    if (!route) {
      throw new Error("Route not found");
    }
    routesCache[route._id!.toString()] = route;
  }
  const sections: number[] = await getSections(
    route.stations,
    originStation,
    destinationStation
  );
  const freeSeat: string = findBestSeat(ride.seats, sections);
  return freeSeat;
}
