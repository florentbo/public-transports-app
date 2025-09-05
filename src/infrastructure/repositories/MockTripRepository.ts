import { TripEntity, Schedule } from "../../domain/entities/Trip";
import { TripRepository } from "../../domain/repositories/TripRepository";

export class MockTripRepository implements TripRepository {
  private trips: TripEntity[] = [];

  constructor() {
    this.generateMockTrips();
  }

  private generateMockTrips(): void {
    // Generate trips for route A (Central Line)
    this.createTripsForRoute(
      "A",
      ["1", "2", "6"],
      "Central Station → Sports Complex",
    );
    this.createTripsForRoute(
      "A",
      ["6", "2", "1"],
      "Sports Complex → Central Station",
    );

    // Generate trips for route B (Northern Line)
    this.createTripsForRoute(
      "B",
      ["1", "3", "7"],
      "Central Station → Business District",
    );
    this.createTripsForRoute(
      "B",
      ["7", "3", "1"],
      "Business District → Central Station",
    );

    // Generate trips for bus route 101
    this.createTripsForRoute(
      "101",
      ["2", "4", "8"],
      "City Hall → Museum Quarter",
    );
    this.createTripsForRoute(
      "101",
      ["8", "4", "2"],
      "Museum Quarter → City Hall",
    );
  }

  private createTripsForRoute(
    routeId: string,
    stopIds: string[],
    headsign: string,
  ): void {
    const baseTime = new Date();
    baseTime.setHours(6, 0, 0, 0); // Start at 6:00 AM

    // Generate trips every 10-15 minutes for the next 18 hours
    for (let hour = 0; hour < 18; hour++) {
      for (let trip = 0; trip < 4; trip++) {
        const tripId = `${routeId}_${hour}_${trip}`;
        const startTime = new Date(baseTime);
        startTime.setHours(baseTime.getHours() + hour);
        startTime.setMinutes(trip * 15); // 15-minute intervals

        const schedule: Schedule[] = stopIds.map((stopId, index) => {
          const arrivalTime = new Date(startTime);
          const departureTime = new Date(startTime);

          // Add travel time between stops (3-5 minutes)
          const travelTime = index * 4; // 4 minutes between stops
          arrivalTime.setMinutes(startTime.getMinutes() + travelTime);
          departureTime.setMinutes(arrivalTime.getMinutes() + 1); // 1-minute stop time

          return {
            arrivalTime,
            departureTime,
            stopId,
            stopSequence: index + 1,
          };
        });

        const direction = headsign.includes("→")
          ? headsign.split("→")[1].trim() === "Central Station"
            ? "inbound"
            : "outbound"
          : "outbound";

        this.trips.push(
          new TripEntity(tripId, routeId, headsign, direction, schedule),
        );
      }
    }
  }

  async findById(id: string): Promise<TripEntity | null> {
    return this.trips.find((trip) => trip.id === id) || null;
  }

  async findByRoute(routeId: string): Promise<TripEntity[]> {
    return this.trips.filter((trip) => trip.routeId === routeId);
  }

  async findByStop(stopId: string, date?: Date): Promise<TripEntity[]> {
    const targetDate = date || new Date();
    const today = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
    );

    return this.trips.filter((trip) =>
      trip.schedule.some((schedule) => {
        const scheduleDate = new Date(
          schedule.arrivalTime.getFullYear(),
          schedule.arrivalTime.getMonth(),
          schedule.arrivalTime.getDate(),
        );
        return (
          schedule.stopId === stopId &&
          scheduleDate.getTime() === today.getTime()
        );
      }),
    );
  }

  async findActiveTrips(): Promise<TripEntity[]> {
    return this.trips.filter((trip) => trip.isActive());
  }

  async getUpcomingArrivals(
    stopId: string,
    limit: number = 10,
  ): Promise<TripEntity[]> {
    const now = new Date();

    // Find all trips that stop at this location
    const relevantTrips = this.trips.filter((trip) =>
      trip.schedule.some(
        (schedule) => schedule.stopId === stopId && schedule.arrivalTime > now,
      ),
    );

    // Sort by next arrival time at this stop
    relevantTrips.sort((a, b) => {
      const aSchedule = a.getScheduleForStop(stopId);
      const bSchedule = b.getScheduleForStop(stopId);

      if (!aSchedule || !bSchedule) return 0;

      return aSchedule.arrivalTime.getTime() - bSchedule.arrivalTime.getTime();
    });

    return relevantTrips.slice(0, limit);
  }
}
