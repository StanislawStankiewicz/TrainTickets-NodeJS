import { Request, Response } from "express";
import { Ticket, ITicket } from "../models/ticketModel";
import * as ticketModel from "../models/ticketModel";

export async function createTicket(req: Request, res: Response) {
  try {
    const ticket: ITicket = new Ticket(req.body);
    await ticketModel.createTicket(ticket);
    res.status(201).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
