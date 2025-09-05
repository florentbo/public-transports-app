import { StopEntity } from "../../domain/entities/Stop";
import { StopRepository } from "../../domain/repositories/StopRepository";

export class MockStopRepository implements StopRepository {
  private stops: StopEntity[] = [
    new StopEntity(
      "1",
      "Central Station",
      48.8566,
      2.3522,
      ["A", "B", "C"],
      "CS01",
    ),
    new StopEntity("2", "City Hall", 48.8606, 2.3376, ["A", "D"], "CH01"),
    new StopEntity("3", "University", 48.8496, 2.3435, ["B", "E"], "UN01"),
    new StopEntity(
      "4",
      "Shopping Mall",
      48.8629,
      2.3445,
      ["C", "D", "F"],
      "SM01",
    ),
    new StopEntity(
      "5",
      "Airport Terminal",
      48.8738,
      2.3522,
      ["E", "F"],
      "AT01",
    ),
    new StopEntity("6", "Sports Complex", 48.8445, 2.3398, ["A", "F"], "SC01"),
    new StopEntity(
      "7",
      "Business District",
      48.8687,
      2.3489,
      ["B", "C"],
      "BD01",
    ),
    new StopEntity("8", "Museum Quarter", 48.8534, 2.3367, ["D", "E"], "MQ01"),
  ];

  async findById(id: string): Promise<StopEntity | null> {
    return this.stops.find((stop) => stop.id === id) || null;
  }

  async findByName(name: string): Promise<StopEntity[]> {
    const query = name.toLowerCase();
    return this.stops.filter((stop) => stop.name.toLowerCase().includes(query));
  }

  async findNearby(
    lat: number,
    lon: number,
    radius: number,
  ): Promise<StopEntity[]> {
    return this.stops.filter((stop) => stop.distanceFrom(lat, lon) <= radius);
  }

  async findByRoute(routeId: string): Promise<StopEntity[]> {
    return this.stops.filter((stop) => stop.routes.includes(routeId));
  }

  async getAll(): Promise<StopEntity[]> {
    return [...this.stops];
  }
}
