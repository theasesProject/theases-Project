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
  Modal,
} from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";
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
import io from "socket.io-client";
const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
import { selectUser, setUser } from "../store/userSlice";
import registerNNPushToken from "native-notify";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
function Home({ navigation }) {
  registerNNPushToken(14608, "0IjK45dvxv48dlwYcWDWTR");
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allCars = useSelector((state) => state.car.allCars);
  const fixedData = useSelector((state) => state.car.fixedData);
  const loading = useSelector((state) => state.car.loading);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [nothing, setNothing] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const swipeUpDownRef = useRef();
  const handlePress = () => {
    if (swipeUpDownRef.current) {
      swipeUpDownRef.current.showFull();
      // setIsVisibleSwipe(true)
    }
  };
  const [notifications, setNotifications] = useState([]);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);

  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    socket.emit("newUser", activeUser.id);
    console.log("newUser", activeUser.id);
    socket.on("serviceAccepted", ({ senderId, message }) => {
      console.log(
        `Received service acceptance from ${senderId}. Message: ${message}`
      );
      // Handle the service acceptance on the React Native side as needed
    });

    socket.on("serviceRejected", ({ senderId, message }) => {
      console.log(
        `Received service rejection from ${senderId}. Message: ${message}`
      );
      // Handle the service rejection on the React Native side as needed
    });

    return () => {
      socket.off("serviceAccepted");
      socket.off("serviceRejected");
    };
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllCars()).then(() => setRefreshing(false));
  });

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

  // useEffect(() => {
  //   if (!loading && scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({
  //       x: 0,
  //       y: scrollPosition,
  //       animated: true,
  //     });
  //   }
  // }, [loading]);
  return (
    <View style={styles.homePage}>
      <ScrollView
        ref={scrollViewRef}
        // onScroll={(event) => {
        //   setScrollPosition(event.nativeEvent.contentOffset.y);
        // }}
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
            <View style={styles.allcars} key={i}>
              <CardCar
                setNothing={setNothing}
                key={i}
                oneCar={element}
                handlePress={handlePress}
              />
            </View>
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
      </ScrollView>
      {/* <Swipeable
  friction={2}
  leftThreshold={100}
  rightThreshold={100}
  overshootFriction={2}
  overshootLeft={false}
  overshootRight={false}
  onSwipeableLeftOpen={() => {}}
  onSwipeableRightOpen={() => {}}
> */}
      <SwipeUpDown
        itemFull={<CarDetails />}
        ref={swipeUpDownRef}
        extraMarginTop={140}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        animation="easeInEaseOut"
        style={{
          height: "100%",
          width: "100%",
          borderTopEndRadius: 50,
          backgroundColor: "lightgrey",
          //  backgroundColor: 'transparent'
        }}
      />
      {/* </Swipeable> */}

      {activeUser?.type === "agency" ? <NavBarAgency /> : <NavBar />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationModalVisible}
        onRequestClose={() => {
          setNotificationModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{notificationText}</Text>
          <TouchableOpacity
            onPress={() => setNotificationModalVisible(false)}
            style={styles.modalCloseButton}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
  },
  notificationsContainer: {
    flex: 1,
    // margin: 10,
    // padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationText: {
    fontSize: 14,
    // marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
export default Home;
