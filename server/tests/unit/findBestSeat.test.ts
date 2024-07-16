import { findBestSeat } from "../../src/utils/findBestSeat";
import { Seat } from "../../src/models/rideModel";

describe("findBestSeat", () => {
  it("returns seat number if seat is available", () => {
    const seats: Seat[] = [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Available", "Available"],
      },
      {
        seatNumber: "2A",
        sectionsStatus: ["Available", "Available", "Available"],
      },
    ];
    const sections = [1, 2, 3];
    expect(findBestSeat(seats, sections)).toBe("1A");

    const seats2: Seat[] = [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Available", "Unavailable"],
      },
      {
        seatNumber: "2A",
        sectionsStatus: ["Available", "Available", "Available"],
      },
    ];
    const sections2 = [1, 2];
    expect(findBestSeat(seats2, sections2)).toBe("1A");

    const seats3: Seat[] = [
      {
        seatNumber: "1A",
        sectionsStatus: ["Unavailable", "Unavailable", "Unavailable"],
      },
      {
        seatNumber: "2A",
        sectionsStatus: ["Available", "Available", "Unavailable"],
      },
    ];
    const sections3 = [2];
    expect(findBestSeat(seats3, sections3)).toBe("2A");
  });

  it("returns 'No seat available' if no seat is available", () => {
    const seats: Seat[] = [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Available", "Unavailable"],
      },
      {
        seatNumber: "2A",
        sectionsStatus: ["Available", "Unavailable", "Available"],
      },
    ];
    const sections = [1, 2, 3];
    expect(findBestSeat(seats, sections)).toBe("No seat available");

    const seats2: Seat[] = [
      {
        seatNumber: "1A",
        sectionsStatus: ["Available", "Unavailable", "Available"],
      },
      {
        seatNumber: "2A",
        sectionsStatus: ["Available", "Unavailable", "Available"],
      },
    ];
    const sections2 = [2];
    expect(findBestSeat(seats2, sections2)).toBe("No seat available");
  });
});
