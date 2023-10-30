import React, { useEffect, useState } from "react";

<<<<<<< HEAD
import React, { useEffect,useState } from "react";

import { View, Text, StyleSheet, ScrollView, Button ,TouchableOpacity} from 'react-native';
import CardCar from "../components/cardCar.jsx"
=======
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import CardCar from "../components/CardCar.jsx";
>>>>>>> c4655a8c35a9356457899ff89d54775badf33fd5
import BrandBar from "../components/brandBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../store/carFetch";
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";

function Home({ navigation }) {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.car.allCars);
  const loading = useSelector((state) => state.car.loading);
  const [filteredCars, setFilteredCars] = useState(allCars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const updateFilteredCars = (filteredCarData) => {
    setFilteredCars(filteredCarData);
  };

  return (
    <View style={styles.homePage}>
      <ScrollView>
        <ProfileLandingPage />
        <SearchBar onSearch={updateFilteredCars} />
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
  allcars: {
    paddingBottom: 20,
  },
});

export default Home;
