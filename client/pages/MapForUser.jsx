import React, { useState, useEffect } from "react";
import { View,  Text, Button, StyleSheet, TouchableOpacity, Linking, Pressable,} from "react-native";
import MapView, { Marker,Callout  } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
// import { google_api } from '../env';
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { List, getAgencyData } from "../store/agencySlice";
import { useNavigation } from "@react-navigation/native";

const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";


const MapForUser = ({}) => {
  const navigation = useNavigation();

    const agencies = useSelector((state) => state.agency.list);
   
    const dispatch = useDispatch();
    const [getLocation, setGetLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState({
      latitude: 50.842278, // You can replace these with your default values
      longitude: 30.187765,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  
    useEffect(() => {
      dispatch(getAgencyData());
    }, [dispatch]);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // Handle denied permission
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
    }, []);
    const agen=`<?xml version="1.0" encoding="utf-8"?>
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
    </svg>`
    const handleZoomIn = () => {
      const newLatitudeDelta = mapRegion.latitudeDelta / 2;
      const newLongitudeDelta = mapRegion.longitudeDelta / 2;
      setMapRegion({
        ...mapRegion,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      });
    };
    const Person=`<svg xmlns="http://www.w3.org/2000/svg" fill=#A9A9A9 viewBox="0 0 320 512"><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>`
  
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
          {/* Sample Marker */}
          {getLocation && (
             <Marker   coordinate={{ latitude: getLocation.latitude, longitude: getLocation.longitude }}            title="Your location">
         
             <SvgXml xml={Person} width="30" height="30" />
              </Marker>
          )}
  
  {agencies?.data?.map((agency) => (
  <Marker
    coordinate={{
      latitude: JSON.parse(agency.address).latitude,
      longitude: JSON.parse(agency.address).longitude,
    }}
    description={agency.address.city}
    key={agency.id}
    title={agency.name}
  >
    <SvgXml xml={agen} width="30" height="30" />

    {/* Custom Callout */}
    
    
         <Callout style={styles.calloutContainer} onPress={() => {
            navigation.navigate('AgencyProfileUser', { agencyId: agency.id });
          }}>
       
       
         <View>
            <Text  style={styles.agencyName}>{agency.name}</Text>
          <Text  >Check the Agency's Page</Text>  
        

             </View>
    
     </Callout>
   
  </Marker>
))}

        </MapView>
  
        {/* Zoom In and Zoom Out buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
            <Text>-</Text>
          </TouchableOpacity>
        </View>
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
  
        calloutContainer: {
          width: 200,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 5,
        },
        agencyName: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        },
        button: {
          backgroundColor: "#3498db",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        },
        buttonText: {
          color: "#fff",
          fontWeight: "bold",
        },

  });
  
  export default MapForUser;
  