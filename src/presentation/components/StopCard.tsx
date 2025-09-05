import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StopEntity } from "@/domain/entities/Stop";

interface Props {
  stop: StopEntity;
  onPress: (stop: StopEntity) => void;
  distance?: number;
}

export function StopCard({ stop, onPress, distance }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(stop)}
      testID={`stop-card-${stop.id}`}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{stop.name}</Text>
        {distance && (
          <Text style={styles.distance}>
            {distance < 1
              ? `${Math.round(distance * 1000)}m`
              : `${distance.toFixed(1)}km`}
          </Text>
        )}
      </View>

      {stop.code && <Text style={styles.code}>Stop {stop.code}</Text>}

      <View style={styles.routesContainer}>
        {stop.routes.map((routeId, index) => (
          <View key={routeId} style={styles.routeTag}>
            <Text style={styles.routeText}>{routeId}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  code: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  routesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  routeTag: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  routeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
