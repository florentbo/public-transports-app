import { TripEntity } from "../entities/Trip";

export interface TripRepository {
  findById(id: string): Promise<TripEntity | null>;
  findByRoute(routeId: string): Promise<TripEntity[]>;
  findByStop(stopId: string, date?: Date): Promise<TripEntity[]>;
  findActiveTrips(): Promise<TripEntity[]>;
  getUpcomingArrivals(stopId: string, limit?: number): Promise<TripEntity[]>;
}
