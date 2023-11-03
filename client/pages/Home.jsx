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
import NavBar from "../components/NavBar.jsx";

function Home({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const allCars = useSelector((state) => state.car.allCars);
  const loading = useSelector((state) => state.car.loading);
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
  return (
    <View style={styles.homePage}>
      <ScrollView>
        <ProfileLandingPage />
        <View style={styles.searchContainer}>
          <SearchBar onSearch={updateFilteredCars} />
        </View>
        <BrandBar onFilterByBrand={updateFilteredCars} />
        {filteredCars.map((element, i) => (
          <View style={styles.allcars}>
            <CardCar key={i} oneCar={element} />
          </View>
        ))}
        
      </ScrollView>
      <NavBar/>
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
});

export default Home;
