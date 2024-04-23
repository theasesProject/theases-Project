import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import io from "socket.io-client";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";

const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";

const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);

const TransportationMap = () => {
  const mapRef = useRef(null);
  const [pitch, setPitch] = useState(70); 
  const [userLocation, setUserLocation] = useState(null);
  const [agencyLocation, setAgencyLocation] = useState(null);
  const route = useRoute();
  const userId = route.params.userId;
  const agencyId = route.params.agencyId;

  useEffect(() => {
    const startLocationUpdates = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 5,
          },
          (location) => {
            const newLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            if (userId && location.userId === userId) {
              setUserLocation(newLocation);
            } else if (agencyId && location.agencyId === agencyId) {
              setAgencyLocation(newLocation);
            }

            // Emit the user's location and type to the server
            const userType = agencyId ? "agency" : "user";
            socket.emit("updateLocation", {
              location: newLocation,
              userType,
              userId,
              agencyId,
            });
          }
        );

        return () => {
          locationSubscription.remove();
        };
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    startLocationUpdates();
  }, [userId, agencyId]);
  const Person = `<svg xmlns="http://www.w3.org/2000/svg" fill=#001170 viewBox="0 0 320 512"><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>`;

  useEffect(() => {
    // Listen for location updates from other users
    socket.on("locationUpdated", (data) => {
      // Update the location for the other user or agency
      if (data.userType === "user") {
        setUserLocation(data.location);
      } else if (data.userType === "agency") {
        setAgencyLocation(data.location);
      }
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [socket]);

  const handleStartItinerary = () => {
    // console.log("Starting itinerary to user location");
  };
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
  const carIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" height='10' width='10' viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
  `;
  return (
    <>
      <MapView
       style={{ flex: 1 }}
       loadingEnabled={true}
       onLayout={() => {
        if (mapRef.current) {
          mapRef.current.setCamera({
            center: {
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
            },
            pitch: pitch,
            zoom: mapRegion.latitudeDelta,
          });
        }
       }}
       customMapStyle={customMapStyle}
       showsCompass={true}
       rotateEnabled={true}
       userInterfaceStyle="light"
       initialRegion={{
         latitude: userLocation?.latitude || 13.86,
         longitude: userLocation?.longitude || 11.69,
         latitudeDelta: 0.22,
         longitudeDelta: 0.21,
       }}
       pitchEnabled={true}
       pitch={pitch} // use the pitch state variable
       showsUserLocation={true}
     >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="User Location"
            description="Current location"
          >
            <SvgXml xml={Person} width="30" height="30" />
          </Marker>
        )}
        {agencyLocation && (
          <Marker
            coordinate={{
              latitude: agencyLocation.latitude,
              longitude: agencyLocation.longitude,
            }}
            title="Agency Location"
            description="Current location"
          >
            <SvgXml xml={carIconSvg} width="30" height="30" />
          </Marker>
        )}
        {userLocation && agencyLocation && (
          <MapViewDirections
            origin={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            destination={{
              latitude: agencyLocation.latitude,
              longitude: agencyLocation.longitude,
            }}
            apikey={google_api}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>

      {route.params.userType === "agency" && agencyLocation && (
        <Button title="Start Itinerary" onPress={handleStartItinerary} />
      )}
    </>
  );
};

export default TransportationMap;
