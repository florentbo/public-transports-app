// Dependency injection container for transport services
import { StopRepository } from "@/domain/repositories/StopRepository";
import { RouteRepository } from "@/domain/repositories/RouteRepository";
import { TripRepository } from "@/domain/repositories/TripRepository";
import { MockStopRepository } from "@/infrastructure/repositories/MockStopRepository";
import { MockRouteRepository } from "@/infrastructure/repositories/MockRouteRepository";
import { MockTripRepository } from "@/infrastructure/repositories/MockTripRepository";
import { FindNearbyStops } from "@/domain/usecases/FindNearbyStops";
import { GetUpcomingArrivals } from "@/domain/usecases/GetUpcomingArrivals";
import { SearchRoutes } from "@/domain/usecases/SearchRoutes";

export class TransportService {
  // Repositories
  private static stopRepository: StopRepository = new MockStopRepository();
  private static routeRepository: RouteRepository = new MockRouteRepository();
  private static tripRepository: TripRepository = new MockTripRepository();

  // Use Cases
  static findNearbyStops = new FindNearbyStops(this.stopRepository);
  static getUpcomingArrivals = new GetUpcomingArrivals(
    this.tripRepository,
    this.routeRepository,
  );
  static searchRoutes = new SearchRoutes(this.routeRepository);

  // Repository getters for direct access
  static get stops(): StopRepository {
    return this.stopRepository;
  }

  static get routes(): RouteRepository {
    return this.routeRepository;
  }

  static get trips(): TripRepository {
    return this.tripRepository;
  }
}
