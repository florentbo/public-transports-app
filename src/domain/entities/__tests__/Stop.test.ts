import { StopEntity } from "../Stop";

describe("StopEntity", () => {
  const mockStopData = {
    id: "1",
    name: "Central Station",
    lat: 48.8566,
    lon: 2.3522,
    routes: ["A", "B", "C"],
    code: "CS01",
  };

  describe("create", () => {
    it("should create a StopEntity from data", () => {
      const stop = StopEntity.create(mockStopData);

      expect(stop.id).toBe(mockStopData.id);
      expect(stop.name).toBe(mockStopData.name);
      expect(stop.lat).toBe(mockStopData.lat);
      expect(stop.lon).toBe(mockStopData.lon);
      expect(stop.routes).toEqual(mockStopData.routes);
      expect(stop.code).toBe(mockStopData.code);
    });

    it("should create a StopEntity without optional code", () => {
      const { code, ...dataWithoutCode } = mockStopData;

      const stop = StopEntity.create(dataWithoutCode);

      expect(stop.code).toBeUndefined();
    });
  });

  describe("distanceFrom", () => {
    it("should calculate distance correctly", () => {
      const stop = StopEntity.create(mockStopData);

      // Distance to itself should be 0
      const distanceToSelf = stop.distanceFrom(
        mockStopData.lat,
        mockStopData.lon,
      );
      expect(distanceToSelf).toBe(0);
    });

    it("should calculate distance to another point", () => {
      const stop = StopEntity.create(mockStopData);

      // Distance to a point ~1km away (approximate)
      const distance = stop.distanceFrom(48.8656, 2.3522);
      expect(distance).toBeGreaterThan(0);
      expect(distance).toBeLessThan(2); // Should be around 1km
    });
  });

  describe("constructor", () => {
    it("should initialize with default empty routes", () => {
      const stop = new StopEntity("1", "Test Station", 48.8566, 2.3522);

      expect(stop.routes).toEqual([]);
    });

    it("should initialize with provided routes", () => {
      const routes = ["A", "B"];
      const stop = new StopEntity("1", "Test Station", 48.8566, 2.3522, routes);

      expect(stop.routes).toEqual(routes);
    });
  });
});
