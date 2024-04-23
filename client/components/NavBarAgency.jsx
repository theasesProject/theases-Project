import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import SignUp from ".././assets/Svg/signUpNav.svg";
import Hm from ".././assets/Svg/house-solid.svg";
import Ms from ".././assets/Svg/envelope-solid.svg";
import Fa from ".././assets/Svg/heart-solid.svg";
import Pr from ".././assets/Svg/user-nav.svg";
import Bell from "../assets/Svg/bell-notification.svg"
import Plus from ".././assets/Svg/plus-solid.svg";
import Car from ".././assets/Svg/car-side-solid.svg";

import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("screen");
function NavBarAgency({ style }) {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const navigation = useNavigation();
  const route = useRoute();

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
            style={{ color: isActive("Home"),}}
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
            
            }}
          >
            Messeges
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.quarter}
        onPress={() => navigation.navigate("AddAgencyCar")}
      >
        <View style={styles.hm}>
          <Plus fill={isActive("AddAgencyCar")} />
          <Text
            style={{
              color: isActive("AddAgencyCar"),
         
            }}
          >
            Add Car
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
            

            }}
          >
            {loggedIn ? "Notifs" : "SignUp"}
          </Text>
          
      </Pressable>
      <Pressable
        style={styles.quarter}
        onPress={() => {
          navigation.navigate("AgencyService");
        }}
      >
        <View style={styles.hm}>
          <Pr fill={isActive("AgencyService")} />
          <Text
            style={{
              color: isActive("AgencyService"),
       
            }}
          >
            Requests
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    borderTopColor: "#6C77BF",
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

export default NavBarAgency;
