import { StopEntity } from "../entities/Stop";
import { StopRepository } from "../repositories/StopRepository";

export interface FindNearbyStopsRequest {
  lat: number;
  lon: number;
  radius?: number; // in kilometers, default 1km
}

export interface FindNearbyStopsResponse {
  stops: StopEntity[];
  searchRadius: number;
}

export class FindNearbyStops {
  constructor(private stopRepository: StopRepository) {}

  async execute(
    request: FindNearbyStopsRequest,
  ): Promise<FindNearbyStopsResponse> {
    const radius = request.radius ?? 1; // Default 1km radius

    const stops = await this.stopRepository.findNearby(
      request.lat,
      request.lon,
      radius,
    );

    // Sort by distance
    const sortedStops = stops.sort(
      (a, b) =>
        a.distanceFrom(request.lat, request.lon) -
        b.distanceFrom(request.lat, request.lon),
    );

    return {
      stops: sortedStops,
      searchRadius: radius,
    };
  }
}
