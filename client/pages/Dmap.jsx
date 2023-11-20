// 2.5DMap.js
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const DMap = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     const getLocationAsync = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
        
//         if (status !== 'granted') {
//           console.log('Permission to access location was denied');
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         const { latitude, longitude } = location.coords;
//         setUserLocation({ latitude, longitude });
//       } catch (error) {
//         console.error('Error getting location:', error);
//       }
//     };

//     getLocationAsync();
//   }, []);

//   return (
//     <MapView
//       style={{ flex: 1 }}
//       initialRegion={{
//         latitude: userLocation ? userLocation.latitude : YOUR_INITIAL_LATITUDE,
//         longitude: userLocation ? userLocation.longitude : YOUR_INITIAL_LONGITUDE,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}
//     >
//       {userLocation && (
//         <Marker
//           coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
//           title="Your Location"
//           pinColor="blue" // Customize the pin color
//         />
    //   )
    // }
//       <Marker
//         coordinate={{ latitude: YOUR_MARKER_LATITUDE, longitude: YOUR_MARKER_LONGITUDE }}
//         title="Your Marker Title"
//         description="Your Marker Description"
//       />
//       {/* Add extruded buildings or other features to achieve the 2.5D effect */}
//       {/* For example, you can use Polygons to represent buildings */}
//       <MapView.Polygon
//         coordinates={[
//           { latitude: LAT1, longitude: LON1 },
//           { latitude: LAT2, longitude: LON2 },
//           { latitude: LAT3, longitude: LON3 },
//           // Add more coordinates as needed
//         ]}
//         strokeWidth={0}
//         fillColor="rgba(0, 0, 255, 0.5)" // Adjust color and opacity as needed
//       />
//     </MapView>
//   );
};

export default DMap;
