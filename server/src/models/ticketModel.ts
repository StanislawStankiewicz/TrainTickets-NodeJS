import mongoose, { Document, ObjectId } from "mongoose";
import { claimFreeSeat } from "./rideModel";
import { IRide, Ride } from "./rideModel";
import { User } from "./userModel";

// Define the ITicket interface
export interface ITicket extends Document {
  userId: ObjectId;
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
  userId: ObjectId,
  rideId: ObjectId,
  originStation: string,
  destinationStation: string
): Promise<ITicket> {
  const ride: IRide | null = await Ride.findById(rideId).exec();
  if (!ride) {
    throw new Error("Ride not found");
  }
  const seat = await claimFreeSeat(ride, originStation, destinationStation);

  const ticket: ITicket = new Ticket({
    userId: userId,
    train: ride.train,
    ride: rideId,
    seat,
  });

  const savedTicket = await ticket.save();

  User.updateOne(
    { _id: userId },
    { $push: { tickets: savedTicket._id } }
  ).exec();

  return savedTicket;
}
