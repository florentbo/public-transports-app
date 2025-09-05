import { StopEntity } from "../entities/Stop";

export interface StopRepository {
  findById(id: string): Promise<StopEntity | null>;
  findByName(name: string): Promise<StopEntity[]>;
  findNearby(lat: number, lon: number, radius: number): Promise<StopEntity[]>;
  findByRoute(routeId: string): Promise<StopEntity[]>;
  getAll(): Promise<StopEntity[]>;
}
