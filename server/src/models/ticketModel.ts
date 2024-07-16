import mongoose, { Document } from "mongoose";
import { findFreeSeat } from "./rideModel";

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
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

// Update the createTicket function to use the ITicket interface
export async function createTicket(
  ticket: ITicket,
  originStation: string,
  destinationStation: string
) {
  const seat = await findFreeSeat(
    ticket.ride,
    originStation,
    destinationStation
  );
}
