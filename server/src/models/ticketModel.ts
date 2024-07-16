import mongoose, { Document } from "mongoose";
import { claimFreeSeat } from "./rideModel";
import { IRide, Ride } from "./rideModel";

// Define the ITicket interface
export interface ITicket extends Document {
  train: string;
  ride: string;
  seat: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Ticket Schema
const ticketSchema = new mongoose.Schema(
  {
    train: {
      type: String,
      ref: "Train",
      required: true,
    },
    ride: {
      type: String,
      ref: "Ride",
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

export async function createTicket(
  rideId: string,
  originStation: string,
  destinationStation: string
): Promise<ITicket> {
  const ride: IRide | null = await Ride.findById(rideId).exec();
  if (!ride) {
    throw new Error("Ride not found");
  }
  const seat = await claimFreeSeat(ride, originStation, destinationStation);

  const ticket: ITicket = new Ticket({
    train: ride.train,
    ride: rideId,
    seat,
  });

  return ticket.save();
}
