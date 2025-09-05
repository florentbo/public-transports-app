export interface Schedule {
  arrivalTime: Date;
  departureTime: Date;
  stopId: string;
  stopSequence: number;
}

export interface Trip {
  id: string;
  routeId: string;
  headsign: string;
  direction: "inbound" | "outbound";
  schedule: Schedule[];
}

export class TripEntity implements Trip {
  constructor(
    public id: string,
    public routeId: string,
    public headsign: string,
    public direction: "inbound" | "outbound",
    public schedule: Schedule[] = [],
  ) {}

  static create(data: Trip): TripEntity {
    return new TripEntity(
      data.id,
      data.routeId,
      data.headsign,
      data.direction,
      data.schedule,
    );
  }

  getScheduleForStop(stopId: string): Schedule | undefined {
    return this.schedule.find((s) => s.stopId === stopId);
  }

  getNextStops(currentStopId: string, count: number = 3): Schedule[] {
    const currentIndex = this.schedule.findIndex(
      (s) => s.stopId === currentStopId,
    );
    if (currentIndex === -1) return [];

    return this.schedule.slice(currentIndex + 1, currentIndex + 1 + count);
  }

  getDuration(): number {
    if (this.schedule.length < 2) return 0;

    const firstStop = this.schedule[0];
    const lastStop = this.schedule[this.schedule.length - 1];

    return lastStop.arrivalTime.getTime() - firstStop.departureTime.getTime();
  }

  isActive(): boolean {
    const now = new Date();
    const firstDeparture = this.schedule[0]?.departureTime;
    const lastArrival = this.schedule[this.schedule.length - 1]?.arrivalTime;

    return firstDeparture <= now && now <= lastArrival;
  }
}
