import mongoose, { Document } from "mongoose";

// Define the ITicket interface
export interface ITicket extends Document {
  train: string;
  ride: string;
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
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

// Update the createTicket function to use the ITicket interface
export async function createTicket(ticket: ITicket) {
  return "success";
}
