export type TransportType = "bus" | "tram" | "metro" | "train" | "ferry";

export interface Route {
  id: string;
  shortName: string;
  longName: string;
  type: TransportType;
  color?: string;
  textColor?: string;
  agency: string;
}

export class RouteEntity implements Route {
  constructor(
    public id: string,
    public shortName: string,
    public longName: string,
    public type: TransportType,
    public agency: string,
    public color: string = "#1976d2",
    public textColor: string = "#ffffff",
  ) {}

  static create(data: Route): RouteEntity {
    return new RouteEntity(
      data.id,
      data.shortName,
      data.longName,
      data.type,
      data.agency,
      data.color || "#1976d2",
      data.textColor || "#ffffff",
    );
  }

  get displayName(): string {
    return this.shortName
      ? `${this.shortName} - ${this.longName}`
      : this.longName;
  }

  get transportIcon(): string {
    switch (this.type) {
      case "bus":
        return "🚌";
      case "tram":
        return "🚊";
      case "metro":
        return "🚇";
      case "train":
        return "🚆";
      case "ferry":
        return "⛴️";
      default:
        return "🚌";
    }
  }
}
