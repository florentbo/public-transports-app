import { RouteEntity, TransportType } from "../entities/Route";
import { RouteRepository } from "../repositories/RouteRepository";

export interface SearchRoutesRequest {
  query?: string;
  type?: TransportType;
  stopId?: string;
}

export interface SearchRoutesResponse {
  routes: RouteEntity[];
  query?: string;
  type?: TransportType;
}

export class SearchRoutes {
  constructor(private routeRepository: RouteRepository) {}

  async execute(request: SearchRoutesRequest): Promise<SearchRoutesResponse> {
    let routes: RouteEntity[] = [];

    if (request.stopId) {
      // Search routes that serve a specific stop
      routes = await this.routeRepository.findByStop(request.stopId);
    } else if (request.type) {
      // Search routes by transport type
      routes = await this.routeRepository.findByType(request.type);
    } else if (request.query) {
      // Search routes by name/number
      routes = await this.routeRepository.search(request.query);
    } else {
      // Get all routes if no specific criteria
      routes = await this.routeRepository.getAll();
    }

    // Apply additional filters if specified
    if (request.type && request.query) {
      routes = routes.filter((route) => route.type === request.type);
    }

    if (request.query && !request.stopId) {
      const query = request.query.toLowerCase();
      routes = routes.filter(
        (route) =>
          route.shortName.toLowerCase().includes(query) ||
          route.longName.toLowerCase().includes(query),
      );
    }

    // Sort by short name for better organization
    routes.sort((a, b) => {
      // Try to sort numerically first
      const aNum = parseInt(a.shortName);
      const bNum = parseInt(b.shortName);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }

      // Fall back to alphabetical sorting
      return a.shortName.localeCompare(b.shortName);
    });

    return {
      routes,
      query: request.query,
      type: request.type,
    };
  }
}
