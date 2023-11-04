import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";
import { filterCars, getAllCars } from "../store/carFetch";
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar.jsx";
const { height, width } = Dimensions.get("screen");
function Home({ navigation }) {
  const dispatch = useDispatch();

  const allCars = useSelector((state) => state.car.allCars);
  const fixedData = useSelector((state) => state.car.fixedData);
  const loading = useSelector((state) => state.car.loading);
  // const viewAllCars = allCars;

  // console.log("allCars", allCars);

  // console.log("car", allCars);
  const updateFilteredCars = (filteredCarData) => {
    dispatch(filterCars(filteredCarData));
    // dispatch({ type: 'filterCars', payload: filteredCarData });
  };
  const resetData = () => {
    dispatch(filterCars(fixedData));
    // dispatch({ type: 'filterCars', payload: filteredCarData });
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
    // retrieveToken();
    dispatch(getAllCars());
    // .then(
    //   setFilteredCars(allCars)
    //   )
  }, [dispatch]);

  // useEffect(() => {

  // }, []);
  return (
    <View style={styles.homePage}>
      <ScrollView>
        <ProfileLandingPage style={styles.header} />
        {/* <View style={styles.searchContainer}> */}
        <SearchBar onSearch={updateFilteredCars} />
        {/* </View> */}
        <BrandBar onFilterByBrand={updateFilteredCars} resetData={resetData} />
        {!loading ? (
          allCars?.map((element, i) => (
            <View style={styles.allcars} key={i}>
              <CardCar key={i} oneCar={element} />
            </View>
          ))
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </ScrollView>
      {/* <View style={styles.NavBar}> */}
      <NavBar />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  SearchBar: {},
  NavBar: {
    height: height * 0.05,
  },
  homePage: {
    flex: 1,
    backgroundColor: "rgb(233, 231, 238)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  searchContainer: {
    // paddingTop: 15,
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  allcars: {
    padding: 20,
    paddingBottom: 20,
  },
});

export default Home;
