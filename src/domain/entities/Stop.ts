export interface Stop {
  id: string;
  name: string;
  code?: string;
  lat: number;
  lon: number;
  routes: string[];
}

export class StopEntity implements Stop {
  constructor(
    public id: string,
    public name: string,
    public lat: number,
    public lon: number,
    public routes: string[] = [],
    public code?: string,
  ) {}

  static create(data: Stop): StopEntity {
    return new StopEntity(
      data.id,
      data.name,
      data.lat,
      data.lon,
      data.routes,
      data.code,
    );
  }

  distanceFrom(lat: number, lon: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat - this.lat);
    const dLon = this.toRad(lon - this.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(this.lat)) *
        Math.cos(this.toRad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * (Math.PI / 180);
  }
}
