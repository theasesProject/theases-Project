import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import ResultSearch from "../components/ResultsSearch";
import { Svg, Circle } from "react-native-svg";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";
const directions_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";

const MapAgencyProfile = ({ navigation }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.842278,
    longitude: 10.187765,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  const handleMapPress = (e) => {
    const selectedLatitude = e.nativeEvent.coordinate.latitude;
    const selectedLongitude = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude: selectedLatitude,
      longitude: selectedLongitude,
    });
  };

  const searchLocation = async () => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${google_api}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
      }
    } catch (error) {}
  };

  const handleZoomIn = () => {
    setMapRegion({
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 0.5,
      longitudeDelta: mapRegion.longitudeDelta * 0.5,
    });
  };

  const handleZoomOut = () => {
    setMapRegion({
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <FontAwesome name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <MapView style={styles.map} region={mapRegion} onPress={handleMapPress}>
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            pinColor="red"
          />
        )}
        {selectedLocation && (
          <MapViewDirections
            origin={{
              latitude: mapRegion.latitude,
              longitude: mapRegion.longitude,
            }}
            destination={selectedLocation}
            apikey={directions_api}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}

        {mapRegion && (
          <Marker coordinate={mapRegion} anchor={{ x: 0.5, y: 0.5 }}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Circle cx="12" cy="12" r="8" fill="blue" />
            </Svg>
          </Marker>
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text), searchLocation();
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchLocation}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 && (
        <ResultSearch
          results={searchResults}
          onLocationSelect={(location) => {
            setSelectedLocation({
              latitude: location.geometry.location.lat,
              longitude: location.geometry.location.lng,
            });
            setSearchResults([]);
          }}
        />
      )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
  },
  zoomContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  zoomButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
});

export default MapAgencyProfile;
