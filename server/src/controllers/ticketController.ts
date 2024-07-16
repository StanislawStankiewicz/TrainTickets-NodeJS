import { Request, Response } from "express";
import { Ticket, ITicket } from "../models/ticketModel";
import * as ticketModel from "../models/ticketModel";

export async function createTicket(req: Request, res: Response) {
  try {
    const ticket: ITicket = await ticketModel.createTicket(
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
