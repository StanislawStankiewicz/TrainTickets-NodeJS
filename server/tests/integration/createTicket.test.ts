import mongoose, { ObjectId } from "mongoose";
import { ObjectId as mongoObjectId } from "mongodb";
import { createTicket } from "../../src/models/ticketModel";
import { IRide, Ride } from "../../src/models/rideModel";
import { Route } from "../../src/models/routeModel";
import { User } from "../../src/models/userModel";

beforeAll(async () => {
  const dbName = `TrainTicketsTests_createTicket`;
  await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
});

beforeEach(async () => {
  const route = new Route({
    name: "route1",
    stations: ["station1", "station2", "station3", "station4"],
  });
  const routeId = (await route.save())._id;

  // setup database
  const ride = new Ride({
    route: routeId,
    train: new mongoObjectId(),
    seats: [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Available", "Available"],
      },
    ],
  });
  await ride.save();

  const user = new User({
    name: "user1",
    email: "user1@user.us",
  });
  await user.save();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("createTicket", () => {
  it("should create a ticket", async () => {
    let ride: IRide | null = await Ride.findOne();
    if (!ride) {
      fail("Ride not found");
    }
    const user = await User.findOne({ name: "user1" }).select("_id").exec();
    if (!user) {
      fail("User not found");
    }
    const ticket = await createTicket(
      user._id,
      ride._id!,
      "station1",
      "station2"
    );
    expect(ticket).toBeDefined();
    expect(ticket.train).toEqual(ride.train);
    expect(ticket.ride).toEqual(ride._id);
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
