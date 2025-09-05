import { useQuery } from "@tanstack/react-query";
import { TransportService } from "@/application/services/TransportService";
import { GetUpcomingArrivalsRequest } from "@/domain/usecases/GetUpcomingArrivals";

export function useUpcomingArrivals(
  request: GetUpcomingArrivalsRequest,
  enabled = true,
) {
  return useQuery({
    queryKey: ["upcomingArrivals", request.stopId, request.limit],
    queryFn: () => TransportService.getUpcomingArrivals.execute(request),
    enabled: enabled && !!request.stopId,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
  });
}
