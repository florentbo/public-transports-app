import { RouteEntity, TransportType } from "../../domain/entities/Route";
import { RouteRepository } from "../../domain/repositories/RouteRepository";

export class MockRouteRepository implements RouteRepository {
  private routes: RouteEntity[] = [
    new RouteEntity(
      "A",
      "A",
      "Central Line",
      "metro",
      "Metro Transit",
      "#e50000",
      "#ffffff",
    ),
    new RouteEntity(
      "B",
      "B",
      "Northern Line",
      "metro",
      "Metro Transit",
      "#0066cc",
      "#ffffff",
    ),
    new RouteEntity(
      "C",
      "C",
      "Eastern Line",
      "metro",
      "Metro Transit",
      "#00cc66",
      "#ffffff",
    ),
    new RouteEntity(
      "D",
      "D",
      "Western Line",
      "metro",
      "Metro Transit",
      "#ff9900",
      "#ffffff",
    ),
    new RouteEntity(
      "E",
      "E",
      "Southern Line",
      "metro",
      "Metro Transit",
      "#9900cc",
      "#ffffff",
    ),
    new RouteEntity(
      "F",
      "F",
      "Express Line",
      "metro",
      "Metro Transit",
      "#cc0066",
      "#ffffff",
    ),
    new RouteEntity(
      "101",
      "101",
      "City Center Shuttle",
      "bus",
      "City Bus",
      "#4caf50",
      "#ffffff",
    ),
    new RouteEntity(
      "102",
      "102",
      "Airport Express",
      "bus",
      "City Bus",
      "#2196f3",
      "#ffffff",
    ),
    new RouteEntity(
      "103",
      "103",
      "University Route",
      "bus",
      "City Bus",
      "#ff5722",
      "#ffffff",
    ),
    new RouteEntity(
      "T1",
      "T1",
      "Blue Tram",
      "tram",
      "Tram Network",
      "#3f51b5",
      "#ffffff",
    ),
    new RouteEntity(
      "T2",
      "T2",
      "Green Tram",
      "tram",
      "Tram Network",
      "#8bc34a",
      "#ffffff",
    ),
  ];

  private stopRouteMap: Record<string, string[]> = {
    "1": ["A", "B", "C"], // Central Station
    "2": ["A", "D"], // City Hall
    "3": ["B", "E"], // University
    "4": ["C", "D", "F"], // Shopping Mall
    "5": ["E", "F"], // Airport Terminal
    "6": ["A", "F"], // Sports Complex
    "7": ["B", "C"], // Business District
    "8": ["D", "E"], // Museum Quarter
  };

  async findById(id: string): Promise<RouteEntity | null> {
    return this.routes.find((route) => route.id === id) || null;
  }

  async findByType(type: TransportType): Promise<RouteEntity[]> {
    return this.routes.filter((route) => route.type === type);
  }

  async findByStop(stopId: string): Promise<RouteEntity[]> {
    const routeIds = this.stopRouteMap[stopId] || [];
    return this.routes.filter((route) => routeIds.includes(route.id));
  }

  async search(query: string): Promise<RouteEntity[]> {
    const searchTerm = query.toLowerCase();
    return this.routes.filter(
      (route) =>
        route.shortName.toLowerCase().includes(searchTerm) ||
        route.longName.toLowerCase().includes(searchTerm),
    );
  }

  async getAll(): Promise<RouteEntity[]> {
    return [...this.routes];
  }
}
