import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { google_api } from '../env';
import { SvgXml } from 'react-native-svg';

const Mape = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 36.736451, // Replace with the destination latitude
    longitude: 10.313687, // Replace with the destination longitude
  });
  const [isItineraryStarted, setIsItineraryStarted] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);

  // Import the car logo image
  const carIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" height='10' width='10' viewBox="0 0 512 512"><!-- Your SVG code here --></svg>
  `;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
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
        if (data.status === 'OK') {
          const duration = data.routes[0].legs[0].duration.text;
          setEstimatedDuration(duration);
        } else {
          console.error('Error calculating route: ', data.status);
        }
      } catch (error) {
        console.error('Error fetching route data: ', error);
      }
    }
  };

  const handleZoomIn = () => {
    // Decrease the latitudeDelta and longitudeDelta to zoom in
    setMapRegion({
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 0.5,
      longitudeDelta: mapRegion.longitudeDelta * 0.5,
    });
  };

  const handleZoomOut = () => {
    // Increase the latitudeDelta and longitudeDelta to zoom out
    setMapRegion({
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2,
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
      {isItineraryStarted && (
        <Button title="Get Time" onPress={getTime} />
      )}
      {estimatedDuration && <Text>Estimated Duration: {estimatedDuration}</Text>}
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
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'column',
  },
  zoomButton: {
    backgroundColor: 'white',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
});

export default Mape;
