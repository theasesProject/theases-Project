import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";
import Slider from "@react-native-community/slider";
import * as geolib from "geolib";
import { useDispatch, useSelector } from "react-redux";
import { getAgencyData, getOne } from "../store/agencySlice";
import ItineraryModal from "../components/ItinerairyModal.jsx";
import { useNavigation } from "@react-navigation/native";
import Loc from "../assets/Svg/loc.svg";
import Sat from "../assets/Svg/satellite-dish-solid.svg";
import Carte from "../assets/Svg/map-solid.svg";
import HouCar from "../assets/Svg/houcar.svg";
// import { Audio } from 'expo-av';
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";

const MapForUser = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [getLocation, setGetLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 50.842278,
    longitude: 30.187765,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  });
  const [itineraryMode, setItineraryMode] = useState(false);
  const [filterRadius, setFilterRadius] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const agencies = useSelector((state) => state.agency.list);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentAgencyIndex, setCurrentAgencyIndex] = useState(0);

  const mapRef = useRef(null);
  // useEffect(() => {
  //   const loadFonts = async () => {
  //     await Font.loadAsync({
  //       "FiraMono-Bold": FiraMonoBold,
  //       "FiraMono-Medium": FiraMonoMedium,
  //     });
  //   };

  //   loadFonts();
  // }, []);
  const agen = `<?xml version="1.0" encoding="utf-8"?>
  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg fill="#DC143C"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 256 253" enable-background="new 0 0 256 253" xml:space="preserve">
  <path d="M99.195,210.962c0,9.141-7.397,16.537-16.537,16.537s-16.537-7.397-16.537-16.537c0-9.141,7.397-16.537,16.537-16.537
    S99.195,201.821,99.195,210.962z M89.253,210.962c0-3.615-2.98-6.595-6.595-6.595s-6.595,2.98-6.595,6.595
    c0,3.615,2.98,6.595,6.595,6.595S89.253,214.577,89.253,210.962z M190.059,210.962c0,9.141-7.397,16.537-16.537,16.537
    c-9.141,0-16.537-7.397-16.537-16.537c0-9.141,7.397-16.537,16.537-16.537C182.663,194.425,190.059,201.821,190.059,210.962z
     M179.857,210.962c0-3.472-2.862-6.334-6.334-6.334s-6.334,2.862-6.334,6.334s2.862,6.334,6.334,6.334
    S179.857,214.434,179.857,210.962z M203.65,196.229h-3.488l0,0v-16.898c0-5.292-4.27-9.561-9.622-9.561h-23.453
    c-0.361,0-0.722-0.18-0.962-0.421l-26.76-28.865c-1.203-1.203-2.886-1.924-4.63-1.984H82.718c-4.51,0-8.359,3.067-9.381,7.457
    l-5.232,22.791c-0.12,0.601-0.661,1.022-1.323,1.022l0,0c-6.014,0-10.945,4.871-10.945,10.945v14.132
    c0,0.722-0.601,1.323-1.323,1.323H52.35c-0.722,0-1.323,0.601-1.323,1.323v4.51c0,3.368,2.766,6.134,6.134,6.134h2.466
    c0.661,0,1.203-0.481,1.323-1.082c1.804-10.343,10.884-18.281,21.769-18.281s19.905,7.878,21.709,18.221
    c0.12,0.661,0.661,1.082,1.323,1.082h44.741c0.661,0,1.203-0.481,1.323-1.082c1.804-10.343,10.824-18.221,21.709-18.221
    c10.884,0,19.905,7.878,21.709,18.221c0.12,0.661,0.661,1.082,1.323,1.082h2.285c3.428,0,6.134-2.766,6.134-6.134v-4.45
    C204.973,196.83,204.372,196.229,203.65,196.229z M106.351,168.386c0,0.722-0.601,1.323-1.323,1.323H76.765
    c-0.842,0-1.503-0.782-1.323-1.624l4.63-20.566c0.241-1.082,1.082-1.864,2.225-1.864h22.731c0.722,0,1.323,0.601,1.323,1.323
    V168.386z M153.257,169.769h-38.366c-0.722,0-1.323-0.601-1.323-1.323v-21.408c0-0.722,0.601-1.323,1.323-1.323h19.003
    c0.361,0,0.722,0.18,1.022,0.421l19.364,21.348C155.001,168.386,154.399,169.769,153.257,169.769z M2,69
    c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346
    c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447
    c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346
    z M222.832,22H223V2H34v20L2,54h252L222.832,22z"/>
  </svg>`;

  const Person = `<svg xmlns="http://www.w3.org/2000/svg" fill=#001170 viewBox="0 0 320 512"><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>`;

  const customMapStyle = [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.province",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#a9afd1",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station.bus",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station.rail",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#89bdd7",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  useEffect(() => {
    dispatch(getAgencyData());
  }, [dispatch]);

  // useEffect(() => {
  //   // Load the sound file
  //   const playSound = async () => {
  //     const { sound } = await Audio.Sound.createAsync(
  //       require('./assets/welcome.mp3')
  //     );
  //     await sound.playAsync();
  //   };

  //   // Play the sound when the component mounts
  //   playSound();

  //   // Unload the sound when the component unmounts
  //   return async () => {
  //     await sound.unloadAsync();
  //   };
  // }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGetLocation(userLocation);
      setMapRegion({
        ...mapRegion,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    })();
  }, [estimatedDuration, mapRegion]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setFilterRadius(value);
  };

  const handleSetItinerary = (agency) => {
    setSelectedAgency(agency);
    setTimeout(() => setModalVisible(true), 1500);
    getTime();

    const agencyLocation = {
      latitude: JSON.parse(agency.address).latitude,
      longitude: JSON.parse(agency.address).longitude,
    };
    mapRef.current.fitToCoordinates([agencyLocation], {
      animated: true,
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  const handleStartItinerary = () => {
    handleToggleItineraryMode();
    setModalVisible(false);

    setMapRegion({
      latitude: getLocation.latitude,
      longitude: getLocation.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.001,
    });
  };

  const handleToggleItineraryMode = () => {
    setItineraryMode(!itineraryMode);
  };

  const handleToggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "standard" ? "satellite" : "standard"
    );
  };

  const handleZoomToUser = () => {
    if (getLocation && getLocation.latitude && getLocation.longitude) {
      mapRef.current.animateToRegion({
        latitude: getLocation.latitude,
        longitude: getLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      });
    } else {
      Alert.alert("Location not available", "Please enable location services.");
    }
  };

  const getTime = async () => {
    if (
      getLocation &&
      getLocation.latitude &&
      getLocation.longitude &&
      selectedAgency
    ) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${
            getLocation.latitude
          },${getLocation.longitude}&destination=${
            JSON.parse(selectedAgency.address).latitude
          },${JSON.parse(selectedAgency.address).longitude}&key=${google_api}`
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
  const handleNavigateToProfile = () => {
    // Add logic to navigate to the agency's profile screen
    if (selectedAgency) {
      navigation.navigate("AgencyProfileUser", { agencyId: selectedAgency.id });
    }
  };
  const handleNextAgency = () => {
    if (agencies.data && agencies.data.length > 0) {
      const nextIndex = (currentAgencyIndex + 1) % agencies.data.length;
      setCurrentAgencyIndex(nextIndex);

      const nextAgency = agencies.data[nextIndex];
      const nextAgencyLocation = {
        latitude: JSON.parse(nextAgency.address).latitude,
        longitude: JSON.parse(nextAgency.address).longitude,
      };

      mapRef.current.animateToRegion({
        latitude: nextAgencyLocation.latitude,
        longitude: nextAgencyLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={mapRegion}
        customMapStyle={customMapStyle}
        mapType={mapType}
        onLayout={() => {
          mapRef.current.setCamera({
            center: {
              latitude: getLocation?.latitude,
              longitude: getLocation?.longitude,
            },
            pitch: 45,
            zoom: mapRegion.latitudeDelta,
          });
        }}
      >
        {getLocation && getLocation?.latitude && getLocation?.longitude && (
          <Marker
            coordinate={{
              latitude: getLocation?.latitude,
              longitude: getLocation?.longitude,
            }}
            title="Your location"
          >
            <SvgXml xml={Person} width="30" height="30" />
          </Marker>
        )}

        {agencies?.data?.map((agency) => {
          const agencyLocation = {
            latitude: JSON.parse(agency.address).latitude,
            longitude: JSON.parse(agency.address).longitude,
          };

          if (getLocation && getLocation?.latitude && getLocation?.longitude) {
            const distance = geolib.getDistance(
              {
                latitude: getLocation.latitude,
                longitude: getLocation.longitude,
              },
              agencyLocation
            );

            if (distance <= filterRadius * 1000) {
              return (
                <Marker
                  coordinate={agencyLocation}
                  description={agency.address.city}
                  key={agency.id}
                  title={agency.name}
                  onPress={() => handleSetItinerary(agency)}
                >
                  <SvgXml xml={agen} width="30" height="30" />
                </Marker>
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        })}
        {getLocation && getLocation?.latitude && getLocation?.longitude && (
          <Circle
            center={{
              latitude: getLocation.latitude,
              longitude: getLocation.longitude,
            }}
            radius={filterRadius * 1000}
            fillColor="rgba(255, 0, 0, 0.1)"
            strokeWidth={1}
            strokeColor="rgba(255, 0, 0, 0.3)"
          />
        )}
        {itineraryMode && selectedAgency && (
          <MapViewDirections
            origin={{
              latitude: getLocation.latitude,
              longitude: getLocation.longitude,
            }}
            destination={{
              latitude: JSON.parse(selectedAgency.address).latitude,
              longitude: JSON.parse(selectedAgency.address).longitude,
            }}
            apikey={google_api}
            strokeWidth={5}
            strokeColor="green"
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleToggleMapType}
          style={styles.changeView}
        >
          {mapType === "satellite" ? <Carte /> : <Sat />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.zoomButton} onPress={handleNextAgency}>
          <HouCar />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomToUser} style={styles.locsvg}>
          <Loc />
        </TouchableOpacity>
      </View>
      <View style={styles.locslide}>
        <View style={styles.sliderContainer}>
          <Text>Filter Radius: {sliderValue} km</Text>
          <Slider
            style={{ width: "80%", height: 40 }}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
        </View>
      </View>
      <ItineraryModal
        isVisible={isModalVisible}
        handleNavigateToProfile={handleNavigateToProfile}
        estimatedDuration={estimatedDuration}
        agency={selectedAgency}
        closeModal={() => setModalVisible(false)}
        startItinerary={() => handleStartItinerary(selectedAgency)}
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
    // bottom: 300,
    // height:800,
    // width:'50%',

    // left:200,
    borderRadius: 5,
  },
  changeView: {
    paddingLeft: 40,
  },
  locsvg: {
    paddingLeft: 40,
    // margin: 5,
  },
  sliderContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapForUser;
