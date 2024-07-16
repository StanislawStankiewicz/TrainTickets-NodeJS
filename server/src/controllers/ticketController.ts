import { Request, Response } from "express";
import { Ticket, ITicket } from "../models/ticketModel";
import * as ticketModel from "../models/ticketModel";

export async function createTicket(req: Request, res: Response) {
  try {
    const ticket: ITicket = await ticketModel.createTicket(
      req.body.userId,
      req.body.rideId,
      req.body.originStation,
      req.body.destinationStation
    );
    res.status(201).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

export async function cancelTicket(req: Request, res: Response) {
  try {
    await ticketModel.cancelTicket(req.body.ticketId);
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
