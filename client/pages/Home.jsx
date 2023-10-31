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
import { useDispatch, useSelector } from "react-redux";

function Home({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const allCars = useSelector((state) => state.car.allCars);
  const loading = useSelector((state) => state.car.loading);
  const [filteredCars, setFilteredCars] = useState(allCars);

  console.log("car", allCars);
  const updateFilteredCars = (filteredCarData) => {
    setFilteredCars(filteredCarData);
  };
  console.log(allCars, "allCars");
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
