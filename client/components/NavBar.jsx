import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SignUp from ".././assets/Svg/signUpNav.svg";
import Bell from "../assets/Svg/bell-notification.svg"
import Hm from ".././assets/Svg/house-solid.svg";
import Ms from ".././assets/Svg/envelope-solid.svg";
import Fa from ".././assets/Svg/heart-solid.svg";
import Pr from ".././assets/Svg/user-nav.svg";
import { useSelector } from "react-redux";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const { height } = Dimensions.get("screen");
function NavBar({ style }) {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const navigation = useNavigation();
  const route = useRoute();
  // useEffect(() => {
  //   const loadFonts = async () => {
  //     await Font.loadAsync({
  //       "FiraMono-Bold": FiraMonoBold,
  //       "FiraMono-Medium": FiraMonoMedium,
  //     });
  //   };
  //   loadFonts();
  // }, []);
  const isActive = (routeName) =>
    route.name === routeName ? "#6C77BF" : "grey";
  return (
    <View style={[styles.navBar, style]}>
      <Pressable
        style={styles.quarter}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={styles.hm}>
          <Hm fill={isActive("Home")} />
          <Text
            style={{ color: isActive("Home"), fontFamily: "FiraMono-Medium" }}
          >
            Home
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.quarter}
        onPress={() => navigation.navigate("Messages")}
      >
        <View style={styles.hm}>
          <Ms fill={isActive("Messages")} />
          <Text
            style={{
              color: isActive("Messages"),
              fontFamily: "FiraMono-Medium",
            }}
          >
            Messeges
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.quarter}
        onPress={() => {
          loggedIn
            ? navigation.navigate("Favorites")
            : navigation.navigate("SignUp");
        }}
      >
        <View style={styles.hm}>
          {!loggedIn ? (
            <SignUp fill={isActive("Favorites")} />
          ) : (
            <Fa fill={isActive("Favorites")} />
          )}
          <Text
            style={{
              color: isActive("Favorites"),
              fontFamily: "FiraMono-Medium",
              fontSize:13
            }}
          >
            {loggedIn ? "Favorites" : "SignUp"}
          </Text>
        </View>
      </Pressable>

      <Pressable
      style={styles.quarter}
      onPress={() => {
        loggedIn
          ? navigation.navigate("Notification")
          : navigation.navigate("SignUp");
      }}
      >
            <Bell fill={isActive("Notification")} />

            <Text
            style={{
              color: isActive("Notification"),
              fontFamily: "FiraMono-Medium",

            }}
          >
            {loggedIn ? "Notifs" : "SignUp"}
          </Text>
          
      </Pressable>
      <Pressable
        style={styles.quarter}
        onPress={() => {
          if (loggedIn) {
            navigation.navigate("UsersProfile");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        <View style={styles.hm}>
          <Pr fill={isActive("Userprofile")} />
          <Text
            style={{
              color: isActive("Userprofile"),
              fontFamily: "FiraMono-Medium",
            }}
          >
            {loggedIn ? "Profile" : "Login"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

// ... rest of your code
// ... rest of your code

const styles = StyleSheet.create({
  navBar: {
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
    backgroundColor: "white",
    height: height * 0.07,
    flexDirection: "row",
    justifyContent: "space-around", // Distribute items evenly along the row
    alignItems: "center", // Center items vertically
  },
  quarter: {
    flex: 1,
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  hm: {
    alignItems: "center", // Center items horizontally
  },
});

export default NavBar;
