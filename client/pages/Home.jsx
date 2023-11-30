import React, { useState, useRef, useEffect } from "react";
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
  Alert,
} from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";
import NavBarAgency from "../components/NavBarAgency.jsx";
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
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
import { Animated } from "react-native";
const { height, width } = Dimensions.get("screen");
import CarDetails from "./carDetails.jsx";
const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
import { selectUser, setUser, logUserOut } from "../store/userSlice";
import io from "socket.io-client";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// ***********************************************
import { autoLogin } from "../store/userSlice";
// ***********************************************

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
async function schedulePushNotification(notification) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification,
    },
    trigger: { seconds: 1 },
  });
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
function Home({ navigation }) {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allCars = useSelector((state) => state.car.allCars);
  console.log(
    allCars,
    "------------------------------------------------------------------"
  );
  const fixedData = useSelector((state) => state.car.fixedData);
  const loading = useSelector((state) => state.car.loading);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [nothing, setNothing] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const swipeUpDownRef = useRef();
  const [messages, setMessages] = useState([]);
  const handlePress = () => {
    if (swipeUpDownRef.current) {
      swipeUpDownRef.current.showFull();
      setShowNav(false);
    }
  };
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  console.log(activeUser, "acitveUser");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const navigateToTransportationMap = () => {
    navigation.navigate("TransportationMap", {
      userId: "your_user_id_here",
      agencyId: "your_agency_id_here",
    });
  };
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
  // useEffect(()=>{
  //   dispatch(getAllCars())
  // },[])
  useEffect(() => {
    if (!loading && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: scrollPosition,
        animated: true,
      });
    }
  }, [loading]);

  useEffect(() => {
    // dispatch(autoLogin());
    if (activeUser?.stateBlocked === true) {
      alert(
        "Sorry, your account is banned. Please contact  costumer support for assistance."
      );
      setUser(null);
      dispatch(logUserOut());

      navigation.navigate("Login");
    }
    if (activeUser?.id) {
      socket.emit("login", { userId: activeUser?.id });

      socket.on("receive-notification", (notification) => {
        schedulePushNotification(notification.title);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: notification.id,
            text: notification.message,
            createdAt: new Date(),
            user: {
              _id: notification.senderId,
              name: "Services",
            },
          },
        ]);
      });
    } else {
      return () => {
        socket.disconnect();
      };
    }
  }, [socket, expoPushToken, activeUser?.id, activeUser?.stateBlocked]);
  const [fontsLoaded] = Font.useFonts({
    "FiraMono-Bold": FiraMonoBold,
    "FiraMono-Medium": FiraMonoMedium,
  });
  if (!fontsLoaded) {
    return null;
  } else {
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
          <BrandBar
            onFilterByBrand={updateFilteredCars}
            resetData={resetData}
          />
          {!loading ? (
            allCars
              ?.slice()
              ?.reverse()
              ?.map((element, i) => (
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>
              Title: {notification && notification.request.content.title}{" "}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:{" "}
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text>
          </View>
        </View>

        {/* <SwipeUpDown
        itemFull={<CarDetails />}
        ref={swipeUpDownRef}
        extraMarginTop={140}
        // scrollEnabled={false}
        nestedScrollEnabled={false}
        animation="easeInEaseOut"
        style={{
          height: "100%",
          width: "100%",
          borderTopEndRadius: 50,
          backgroundColor: "lightgrey",
        }}
      /> */}

        {/* <Text
        onPress={() => {
          navigation.navigate("TransportationMap", {
            agencyId:
              activeUser?.type === "agency" ? activeUser?.Agency.UserId : null,
            UserId: activeUser?.type === "client" ? activeUser?.id : null,
            userType: activeUser?.type,
          });
        }}
      >
        map transportation{" "}
      </Text> */}

        {activeUser?.type === "agency" ? <NavBarAgency /> : <NavBar />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {},
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
export default Home;
