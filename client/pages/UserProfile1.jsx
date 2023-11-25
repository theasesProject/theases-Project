import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import Notification from "../assets/Svg/notification.svg";
import Booking from "../assets/Svg/booking.svg";
import Change from "../assets/Svg/change.svg";
import * as Font from "expo-font";
const { height, width } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import stg from "../assets/settings.png";
import Edit from "../assets/Svg/edit.svg";
import Logout from "../assets/Svg/logout.svg";
import Flech from "../assets/Svg/rightFlech.svg";
// import Lgt from "../assets/Svg/logout.svg";
import { useSelector } from "react-redux";
import { getAllBoolMarks, removedBookMark } from "../store/carFetch.js";

import { logUserOut, selectUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import change from "../assets/change.png";
import CarIcon from "../assets/Svg/car-side-solid";
import NavBar from "../components/NavBar";
import user from "../assets/profile.png";
import NavBarAgency from "../components/NavBarAgency";
import { allServiceForUser, deletedServiceByUser } from "../store/bookingSlice";

const UsersProfile = ({ navigation }) => {
  const bookMarks = useSelector((state) => state.car.bookMarks);

  const activeUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.booking.allServiceUser);
  const [numberOfBooking, setNumberOfBooking] = useState(userBookings.length);
  const [favoryNumber, setFavory] = useState(bookMarks.length);
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logUserOut());
    navigation.navigate("Home");
  };
  useEffect(() => {
    dispatch(allServiceForUser(activeUser.id));
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.AllPage}>
      <View style={styles.userContainer}>
        <View style={styles.UserDetails}>
          <Image style={styles.UserImage} src={activeUser.avatar}></Image>
          <Text style={styles.userName}>{activeUser.userName}</Text>
          <View style={styles.statistique}>
            <View style={styles.statistiqueDetails}>
              <Text style={styles.statistiqueText}>{numberOfBooking}</Text>
              <Text style={styles.statistiqueText1}>Car booked</Text>
            </View>
            <View style={styles.statistiqueDetails}>
              <Text style={styles.statistiqueText}>
                {activeUser.createdAt.split("T")[0]}
              </Text>
              <Text style={styles.statistiqueText1}>Join At</Text>
            </View>
            <View style={styles.statistiqueDetails}>
              <Text style={styles.statistiqueText}>
                {favoryNumber ? favoryNumber : 0}
              </Text>
              <Text style={styles.statistiqueText1}>Favourite</Text>
            </View>
          </View>
        </View>
        <View style={styles.setting}>
          <View style={styles.bottomSection}>
            <View>
              {activeUser?.type === "client" ? (
                <View style={styles.profile}>
                  <TouchableOpacity
                    style={styles.profileOption}
                    onPress={() => navigation.navigate("AllBookings")}
                  >
                    <Booking style={styles.icon} />

                    <Text
                      style={{
                        fontFamily: "FiraMono-Medium",
                        color: "grey",
                        fontSize: 14,
                      }}
                    >
                      My bookings
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.flesh}>
                    <Flech />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.profileOption}
                  onPress={() => navigation.navigate("MyCars")}
                >
                  <CarIcon style={styles.icon} />

                  <Text
                    style={{
                      fontFamily: "FiraMono-Medium",
                      color: "grey",
                      fontSize: 14,
                    }}
                  >
                    My Cars
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.profile}>
                <TouchableOpacity
                  style={styles.profileOption}
                  onPress={() => navigation.navigate("editProfile")}
                >
                  <Edit style={styles.icon} />
                  {/* <Image source={stg} style={styles.icon} /> */}
                  <Text
                    style={{
                      fontFamily: "FiraMono-Medium",
                      color: "grey",
                      fontSize: 14,
                    }}
                  >
                    Edit profile
                  </Text>
                </TouchableOpacity>
                <View style={styles.flesh}>
                  <Flech />
                </View>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity
                  style={styles.profileOption}
                  onPress={() => {
                    if (activeUser?.type !== "client") {
                      navigation.navigate("AddAgencyCar");
                    } else {
                      navigation.navigate("changeRole");
                    }
                  }}
                >
                  <Change style={styles.icon} />

                  {activeUser?.type === "client" ? (
                    <Text
                      style={{
                        fontFamily: "FiraMono-Medium",
                        color: "grey",
                        fontSize: 14,
                      }}
                    >
                      Become an Agency
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "FiraMono-Medium",
                        color: "grey",
                        fontSize: 14,
                      }}
                    >
                      Add Cars For Rent
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={styles.flesh}>
                  <Flech />
                </View>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity
                  style={styles.profileOption}
                  onPress={() => navigation.navigate("Notification")}
                >
                  <Notification style={styles.icon} />
                  {/* <Image source={stg} style={styles.icon} /> */}
                  <Text
                    style={{
                      fontFamily: "FiraMono-Medium",
                      color: "grey",
                      fontSize: 14,
                    }}
                  >
                    Notification{" "}
                  </Text>
                </TouchableOpacity>
                <View style={styles.flesh}>
                  <Flech />
                </View>
              </View>
              <TouchableOpacity
                style={styles.profileOption}
                onPress={handleLogout}
              >
                <Logout style={styles.icon} />

                <Text
                  style={{
                    fontFamily: "FiraMono-Medium",
                    color: "grey",
                    fontSize: 14,
                  }}
                >
                  Logout{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.navBar}>
        {activeUser?.type === "agency" ? <NavBarAgency /> : <NavBar />}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  AllPage: {
    backgroundColor: "#EEF5FF",
    width: width,
    height: height,
    // paddingHorizontal: width * 0.02,
    // paddingVertical: height * 0.01,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.015,
  },
  userContainer: {
    flex: 1,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.2,
    backgroundColor: "white",
    paddingTop: height * 0.05,
    width: width * 0.94,
    height: height * 0.9,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 30,
    gap: height * 0.03,
    // backgroundColor: "red",
  },
  UserImage: {
    width: width * 0.3,
    height: height * 0.135,
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  UserDetails: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    width: width * 0.98,
    height: height * 0.35,
    flexDirection: "column",

    // backgroundColor: "red",
  },
  statistique: {
    // backgroundColor: "green",
    width: width * 0.98,
    height: height * 0.12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.1,
    padding: 10,
  },
  statistiqueDetails: {
    // backgroundColor: "grey",
    width: 85,
    height: 85,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
    borderWidth: 0.5,
    padding: 1,
  },
  statistiqueText: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },
  statistiqueText1: {
    fontSize: 16,
    color: "grey",
  },
  setting: {
    // backgroundColor: "red",
    width: width * 0.98,
    height: height * 0.5,
  },
  bottomSection: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  profileOption: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: width * 0.7,
    // borderBottomWidth: 0.3,
    // backgroundColor: "green",
    // borderBottomColor: "lightgrey",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-Between",
    // backgroundColor: "red",
    gap: width * 0.18,
  },

  icon: {
    width: 20,
    height: 20,
  },
  flesh: {
    width: width * 0.1,
    // backgroundColor: "yellow",
    height: height * 0.06,
    paddingVertical: 15,
    paddingHorizontal: 1,
  },
  navBar: {
    position: "absolute",
    bottom: height * 0.06,
    left: 0,
    right: 0,
    height: height * 0.05,
  },
});

export default UsersProfile;
