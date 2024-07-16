import mongoose, { Document, ObjectId } from "mongoose";
import { claimFreeSeat } from "./rideModel";
import { IRide, Ride } from "./rideModel";
import { IUser, User } from "./userModel";
import { getSections } from "../utils/getSections";

// Define the ITicket interface
export interface ITicket extends Document {
  userId: IUser;
  train: ObjectId;
  ride: IRide;
  seat: string;
  price: number;
  originStation: string;
  destinationStation: string;
  isCancelled?: boolean;
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    ride: {
      type: mongoose.Schema.Types.ObjectId,
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
    originStation: {
      type: String,
      required: true,
    },
    destinationStation: {
      type: String,
      required: true,
    },
    isCancelled: {
      type: Boolean,
      required: false,
      default: false,
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

export async function cancelTicket(ticketId: ObjectId): Promise<void> {
  const ticket = (await Ticket.findById(ticketId)
    .populate({
      path: "ride",
      select: "seats route",
      populate: {
        path: "route",
        select: "stations",
      },
    })
    .exec()) as ITicket;
  if (!ticket) {
    throw new Error("Ticket not found");
  }
  ticket.isCancelled = true;
  await User.updateOne(
    { _id: ticket.userId },
    { $pull: { tickets: ticketId } }
  ).exec();
  const sections: number[] = getSections(
    ticket.ride.route.stations,
    ticket.originStation,
    ticket.destinationStation
  );
  ticket.ride.seats = ticket.ride.seats.map((seat) => {
    if (seat.seatNumber === ticket.seat) {
      sections.forEach((section) => {
        seat.sectionsStatus[section - 1] = "Available";
      });
    }
    return seat;
  });
  ticket.ride.save();
}
