import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";
import { getAllCars } from "../store/carFetch";
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import Animated, { Easing } from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler";

function Home({ navigation }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const allCars = useSelector((state) => state.car.allCars);
  // const loading = useSelector((state) => state.car.loading);
  const [filteredCars, setFilteredCars] = useState(allCars);
  console.log("allCars", allCars);
  console.log("car", allCars);
  const updateFilteredCars = (filteredCarData) => {
    setFilteredCars(filteredCarData);
  };
  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("UserToken");
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.error("error coming from home", e);
    }
  };
  
  useEffect(() => {
    retrieveToken();
  }, []);
  
  const translateY = new Animated.Value(100);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );
  
  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }
  
  return (
    <View style={styles.homePage}>
      <ScrollView>
        <ProfileLandingPage />
        <View style={styles.searchContainer}>
          <SearchBar onSearch={updateFilteredCars} />
        </View>
        <BrandBar onFilterByBrand={updateFilteredCars} />
        {filteredCars?.map((element, i) => (
          <View style={styles.allcars} key={i}>
            <CardCar key={i} oneCar={element} onPress={() => {
              setSelectedCar(element);
              setIsOpen(true);
            }} />
          </View>
        ))}
      </ScrollView>
      {isOpen && (
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Animated.View
            style={{
              ...styles.panel,
              transform: [{ translateY: translateY }],
            }}
          >
            {/* Display the data from the selected car here */}
            <Text>{selectedCar?.name}</Text>
            <Button title="Close" onPress={() => setIsOpen(false)} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  
  searchContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  
  allcars: {
    paddingBottom: 20,
  },
  
   panel: {
     position: 'absolute',
     height: '50%',
     width: '100%',
     bottom:0,
     backgroundColor:'#fff',
   },
});

export default Home;
