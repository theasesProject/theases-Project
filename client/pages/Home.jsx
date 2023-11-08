import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";
import axios from "axios";
import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";
import { filterCars, getAllCars } from "../store/carFetch";
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar.jsx";
import { Animated } from "react-native";
const { height, width } = Dimensions.get("screen");
import CarDetails from "./carDetails.jsx";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function Home({ navigation }) {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.car.allCars);
  const fixedData = useSelector((state) => state.car.fixedData);
  const loading = useSelector((state) => state.car.loading);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [nothing, setNothing] = useState("");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllCars()).then(() => setRefreshing(false));
  }, [dispatch]);

  const updateFilteredCars = (filteredCarData) => {
    dispatch(filterCars(filteredCarData));
  };

  const resetData = () => {
    dispatch(filterCars(fixedData));
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
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: scrollPosition,
        animated: true,
      });
    }
  }, [loading]);

  return (
    <View style={styles.homePage}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <ProfileLandingPage style={styles.header} />
        <View style={{ width: "100%" }}>
          <SearchBar onSearch={updateFilteredCars} />
        </View>
        <BrandBar onFilterByBrand={updateFilteredCars} resetData={resetData} />
        {!loading ? (
          allCars?.map((element, i) => (
            <CardCar setNothing={setNothing} key={i} oneCar={element} />
          ))
        ) : (
          <>
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <View
                style={{
                  width: width * 0.9,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "white",
                  padding: 10,
                }}
              >
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.374,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "white", "#f3f3f3"]}
                />
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.15,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "white", "#f3f3f3"]}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <View
                style={{
                  width: width * 0.9,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "white",
                  padding: 10,
                }}
              >
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.374,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "#e6e6e6", "#f3f3f3"]}
                />
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.15,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "#e6e6e6", "#f3f3f3"]}
                />
              </View>
            </View>
          </>
        )}
        <CarDetails />
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // paddingBottom: 10,
    // paddingTop: 20,
  },
  SearchBar: {},
  NavBar: {
    height: height * 0.05,
  },
  homePage: {
    width: width,
    flex: 1,
    backgroundColor: "rgb(233, 231, 238)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {},
  allcars: {
    // padding: 20,
    // paddingBottom: 20,
  },
});

export default Home;
