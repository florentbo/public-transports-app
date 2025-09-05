import { RouteEntity, TransportType } from "../entities/Route";

export interface RouteRepository {
  findById(id: string): Promise<RouteEntity | null>;
  findByType(type: TransportType): Promise<RouteEntity[]>;
  findByStop(stopId: string): Promise<RouteEntity[]>;
  search(query: string): Promise<RouteEntity[]>;
  getAll(): Promise<RouteEntity[]>;
}
