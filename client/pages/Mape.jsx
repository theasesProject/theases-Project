import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

import { SvgXml } from "react-native-svg";
const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";

const Mape = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.842278,
    longitude: 10.187765,

    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState({
    latitude: 36.736451,
    longitude: 10.313687,
  });
  const [isItineraryStarted, setIsItineraryStarted] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);

  const carIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" height='10' width='10' viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
  `;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    setMapRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922, // Initial values
      longitudeDelta: 0.0421,
    });
  };
  const openTurnByTurnNavigation = () => {
    if (destination && location) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;

      Linking.openURL(url)
        .then((supported) => {
          if (!supported) {
            console.error("Can't handle this URL: " + url);
          }
        })
        .catch((err) => {
          console.error("An error occurred while opening the URL: " + err);
        });
    } else {
      console.error("Location or destination is not available.");
    }
  };
  const startItinerary = () => {
    setIsItineraryStarted(true);
  };

  const getTime = async () => {
    if (location && destination) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${destination.latitude},${destination.longitude}&key=${google_api}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const duration = data.routes[0].legs[0].duration.text;
          setEstimatedDuration(duration);
        } else {
          console.error("Error calculating route: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching route data: ", error);
      }
    }
  };
  const handleZoomIn = () => {
    const newLatitudeDelta = mapRegion.latitudeDelta / 2;
    const newLongitudeDelta = mapRegion.longitudeDelta / 2;
    setMapRegion({
      ...mapRegion,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta,
    });
  };

  const handleZoomOut = () => {
    const newLatitudeDelta = mapRegion.latitudeDelta * 2;
    const newLongitudeDelta = mapRegion.longitudeDelta * 2;
    setMapRegion({
      ...mapRegion,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
          />
        )}
        {isItineraryStarted && location && (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={destination}
            apikey={google_api}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
        {destination && (
          <Marker coordinate={destination} title="Destination">
            {/* Render the SVG image using SvgXml */}
            <SvgXml xml={carIconSvg} width="30" height="30" />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
      <Button title="Get Location" onPress={getLocation} />
      {!isItineraryStarted && (
        <Button title="Start Itinerary" onPress={startItinerary} />
      )}
      {isItineraryStarted && <Button title="Get Time" onPress={getTime} />}
      {estimatedDuration && (
        <Text>Estimated Duration: {estimatedDuration}</Text>
      )}
      <Button
        title="Navigate Turn-by-Turn"
        onPress={openTurnByTurnNavigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "column",
  },
  zoomButton: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
});

export default Mape;
