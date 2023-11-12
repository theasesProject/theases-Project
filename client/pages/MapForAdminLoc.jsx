import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { locAgn } from "../store/locationSlice";

const MapComponent = ({ navigation }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.842278,
    longitude: 10.187765,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();

  const handleMapPress = (e) => {
    const selectedLatitude = e.nativeEvent.coordinate.latitude;
    const selectedLongitude = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude: selectedLatitude,
      longitude: selectedLongitude,
    });
  };

  const handleLoc = () => {
    if (selectedLocation) {
      dispatch(locAgn(JSON.stringify(selectedLocation)));
      navigation.navigate("changeRole");
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} onPress={handleMapPress}>
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            pinColor="red"
          />
        )}
      </MapView>
      <Button title="Add This Address" onPress={handleLoc} />
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
});

export default MapComponent;
