import { Seat } from "../models/rideModel";

// export type Seat = {
//   seatNumber: string;
//   sectionsStatus: ("Available" | "Unavailable")[];
// };

export function findBestSeat(seats: Seat[], sections: number[]): string {
  for (const seat of seats) {
    const status = seat.sectionsStatus;
    if (sections.every((section) => status[section - 1] === "Available")) {
      return seat.seatNumber;
    }
  }
  return "No seat available";
}
