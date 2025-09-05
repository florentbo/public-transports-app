import { FindNearbyStops } from "../FindNearbyStops";
import { StopRepository } from "../../repositories/StopRepository";
import { StopEntity } from "../../entities/Stop";

// Mock repository
const mockStopRepository: jest.Mocked<StopRepository> = {
  findById: jest.fn(),
  findByName: jest.fn(),
  findNearby: jest.fn(),
  findByRoute: jest.fn(),
  getAll: jest.fn(),
};

describe("FindNearbyStops", () => {
  let useCase: FindNearbyStops;

  beforeEach(() => {
    useCase = new FindNearbyStops(mockStopRepository);
    jest.clearAllMocks();
  });

  const mockStops = [
    new StopEntity("1", "Central Station", 48.8566, 2.3522, ["A", "B"]),
    new StopEntity("2", "City Hall", 48.8606, 2.3376, ["A", "C"]),
    new StopEntity("3", "University", 48.8496, 2.3435, ["B", "C"]),
  ];

  describe("execute", () => {
    it("should find nearby stops and sort by distance", async () => {
      const request = {
        lat: 48.8566,
        lon: 2.3522,
        radius: 1,
      };

      mockStopRepository.findNearby.mockResolvedValue(mockStops);

      const result = await useCase.execute(request);

      expect(mockStopRepository.findNearby).toHaveBeenCalledWith(
        48.8566,
        2.3522,
        1,
      );
      expect(result.stops).toHaveLength(3);
      expect(result.searchRadius).toBe(1);
    });

    it("should use default radius of 1km when not specified", async () => {
      const request = {
        lat: 48.8566,
        lon: 2.3522,
      };

      mockStopRepository.findNearby.mockResolvedValue([]);

      const result = await useCase.execute(request);

      expect(mockStopRepository.findNearby).toHaveBeenCalledWith(
        48.8566,
        2.3522,
        1,
      );
      expect(result.searchRadius).toBe(1);
    });

    it("should return stops sorted by distance from search point", async () => {
      const request = {
        lat: 48.8566,
        lon: 2.3522,
        radius: 2,
      };

      // Mock stops at different distances
      const nearStop = new StopEntity("near", "Near Stop", 48.8566, 2.3522); // Same location
      const farStop = new StopEntity("far", "Far Stop", 48.8666, 2.3622); // Further away
      const mediumStop = new StopEntity(
        "medium",
        "Medium Stop",
        48.8576,
        2.3532,
      ); // Medium distance

      mockStopRepository.findNearby.mockResolvedValue([
        farStop,
        mediumStop,
        nearStop,
      ]);

      const result = await useCase.execute(request);

      // Should be sorted by distance (nearest first)
      expect(result.stops[0].id).toBe("near");
      expect(result.stops[1].id).toBe("medium");
      expect(result.stops[2].id).toBe("far");
    });

    it("should handle empty results", async () => {
      const request = {
        lat: 48.8566,
        lon: 2.3522,
      };

      mockStopRepository.findNearby.mockResolvedValue([]);

      const result = await useCase.execute(request);

      expect(result.stops).toEqual([]);
      expect(result.searchRadius).toBe(1);
    });
  });
});
