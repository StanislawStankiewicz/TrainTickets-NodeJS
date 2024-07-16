export function getSections(
  stations: string[],
  originStation: string,
  destinationStation: string
): number[] {
  const originIndex: number = stations.indexOf(originStation);
  const destinationIndex: number = stations.indexOf(destinationStation);
  if (originIndex === -1 || destinationIndex === -1) {
    throw new Error("Station not found");
  }
  if (originIndex > destinationIndex) {
    throw new Error("Origin station must be before destination station");
  }
  return Array.from(
    { length: destinationIndex - originIndex },
    (_, index) => originIndex + index + 1
  );
}
