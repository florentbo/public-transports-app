import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { QueryProvider } from "@/presentation/providers/QueryProvider";
import { useNearbyStops } from "@/presentation/hooks/useNearbyStops";
import { StopCard } from "@/presentation/components/StopCard";
import { StopEntity } from "@/domain/entities/Stop";

function HomeContent() {
  // Mock coordinates for Paris (you can replace with real location)
  const [searchLocation] = useState({ lat: 48.8566, lon: 2.3522 });
  const [radius, setRadius] = useState(1);

  const {
    data: nearbyStopsData,
    isLoading,
    error,
  } = useNearbyStops({
    lat: searchLocation.lat,
    lon: searchLocation.lon,
    radius: radius,
  });

  const handleStopPress = (stop: StopEntity) => {
    Alert.alert(
      `${stop.name}`,
      `Stop ID: ${stop.id}\nRoutes: ${stop.routes.join(", ")}\nDistance: ${stop.distanceFrom(searchLocation.lat, searchLocation.lon).toFixed(2)}km`,
      [{ text: "OK" }],
    );
  };

  const handleRadiusChange = (text: string) => {
    const value = parseFloat(text);
    if (!isNaN(value) && value > 0) {
      setRadius(value);
    }
  };

  const renderStopItem = ({ item }: { item: StopEntity }) => (
    <StopCard
      stop={item}
      onPress={handleStopPress}
      distance={item.distanceFrom(searchLocation.lat, searchLocation.lon)}
    />
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading nearby stops</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚇 Public Transports</Text>
        <Text style={styles.subtitle}>Find nearby stops and routes</Text>

        <View style={styles.searchContainer}>
          <Text style={styles.label}>Search Radius (km):</Text>
          <TextInput
            style={styles.radiusInput}
            value={radius.toString()}
            onChangeText={handleRadiusChange}
            keyboardType="numeric"
            placeholder="1.0"
          />
        </View>
      </View>

      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>
          📍 Location: {searchLocation.lat.toFixed(4)},{" "}
          {searchLocation.lon.toFixed(4)}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Nearby Stops {nearbyStopsData && `(${nearbyStopsData.stops.length})`}
      </Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading nearby stops...</Text>
        </View>
      ) : (
        <FlatList
          data={nearbyStopsData?.stops || []}
          renderItem={renderStopItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No stops found in this area</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <QueryProvider>
      <HomeContent />
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  radiusInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: "white",
    width: 80,
  },
  locationInfo: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 12,
    color: "#1565c0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
