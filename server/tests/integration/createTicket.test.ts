import mongoose from "mongoose";
import { Ticket, createTicket } from "../../src/models/ticketModel";
import { Ride } from "../../src/models/rideModel";
import { Route } from "../../src/models/routeModel";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/TrainTicketsTests");
});

beforeEach(async () => {
  // setup database
  const ride = new Ride({
    route: "route1",
    train: "train1",
    seats: [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Available", "Available"],
      },
    ],
  });
  await ride.save();

  const route = new Route({
    _id: "route1",
    name: "route1",
    stations: ["station1", "station2", "station3", "station4"],
  });
  await route.save();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("createTicket", () => {
  it("should create a ticket", async () => {
    let ride = await Ride.findOne();
    if (!ride) {
      fail("Ride not found");
    }

    const ticket = await createTicket(ride._id, "station1", "station2");
    expect(ticket).toBeDefined();
    expect(ticket.train).toBe(ride.train);
    expect(ticket.ride).toBe(ride.id);
    expect(ticket.seat).toBe("1A");
    ride = await Ride.findById(ride.id);
    if (!ride) {
      fail("Ride not found");
    }
    expect(
      ride.seats.find((seat) => seat.seatNumber === "1A")?.sectionsStatus
    ).toEqual(["Unavailable", "Available", "Available"]);
  });
});
