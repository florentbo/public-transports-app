import { useQuery } from "@tanstack/react-query";
import { TransportService } from "@/application/services/TransportService";
import { FindNearbyStopsRequest } from "@/domain/usecases/FindNearbyStops";

export function useNearbyStops(
  request: FindNearbyStopsRequest,
  enabled = true,
) {
  return useQuery({
    queryKey: ["nearbyStops", request.lat, request.lon, request.radius],
    queryFn: () => TransportService.findNearbyStops.execute(request),
    enabled: enabled && request.lat !== 0 && request.lon !== 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
