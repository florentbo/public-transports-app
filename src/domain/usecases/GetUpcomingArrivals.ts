import { TripEntity } from "../entities/Trip";
import { RouteEntity } from "../entities/Route";
import { TripRepository } from "../repositories/TripRepository";
import { RouteRepository } from "../repositories/RouteRepository";

export interface ArrivalInfo {
  trip: TripEntity;
  route: RouteEntity;
  arrivalTime: Date;
  minutesUntilArrival: number;
}

export interface GetUpcomingArrivalsRequest {
  stopId: string;
  limit?: number; // Default 10
}

export interface GetUpcomingArrivalsResponse {
  arrivals: ArrivalInfo[];
  stopId: string;
}

export class GetUpcomingArrivals {
  constructor(
    private tripRepository: TripRepository,
    private routeRepository: RouteRepository,
  ) {}

  async execute(
    request: GetUpcomingArrivalsRequest,
  ): Promise<GetUpcomingArrivalsResponse> {
    const limit = request.limit ?? 10;
    const now = new Date();

    // Get upcoming trips for this stop
    const trips = await this.tripRepository.getUpcomingArrivals(
      request.stopId,
      limit,
    );

    // Get arrival information with route details
    const arrivals: ArrivalInfo[] = [];

    for (const trip of trips) {
      const route = await this.routeRepository.findById(trip.routeId);
      if (!route) continue;

      const schedule = trip.getScheduleForStop(request.stopId);
      if (!schedule) continue;

      const minutesUntilArrival = Math.ceil(
        (schedule.arrivalTime.getTime() - now.getTime()) / (1000 * 60),
      );

      // Only include future arrivals
      if (minutesUntilArrival >= 0) {
        arrivals.push({
          trip,
          route,
          arrivalTime: schedule.arrivalTime,
          minutesUntilArrival,
        });
      }
    }

    // Sort by arrival time
    arrivals.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime());

    return {
      arrivals: arrivals.slice(0, limit),
      stopId: request.stopId,
    };
  }
}
