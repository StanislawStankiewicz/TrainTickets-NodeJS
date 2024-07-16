import { getSections } from "../../src/utils/getSections";

describe("getSections", () => {
  it("returns the correct sections", async () => {
    const stations = ["A", "B", "C", "D", "E"];
    let originStation = "A";
    let destinationStation = "D";
    let sections = getSections(stations, originStation, destinationStation);
    expect(sections).toEqual([1, 2, 3]);

    originStation = "B";
    destinationStation = "E";
    sections = getSections(stations, originStation, destinationStation);
    expect(sections).toEqual([2, 3, 4]);

    originStation = "A";
    destinationStation = "E";
    sections = getSections(stations, originStation, destinationStation);
    expect(sections).toEqual([1, 2, 3, 4]);
  });

  it("throws an error if the origin station is after the destination station", async () => {
    const stations = ["A", "B", "C", "D", "E"];
    const originStation = "D";
    const destinationStation = "A";
    expect(() =>
      getSections(stations, originStation, destinationStation)
    ).toThrow("Origin station must be before destination station");
  });

  it("throws an error if the origin station is not found", async () => {
    const stations = ["A", "B", "C", "D", "E"];
    const originStation = "F";
    const destinationStation = "D";
    expect(() =>
      getSections(stations, originStation, destinationStation)
    ).toThrow("Station not found");
  });

  it("throws an error if the destination station is not found", async () => {
    const stations = ["A", "B", "C", "D", "E"];
    const originStation = "A";
    const destinationStation = "F";
    expect(() =>
      getSections(stations, originStation, destinationStation)
    ).toThrow("Station not found");
  });
});
