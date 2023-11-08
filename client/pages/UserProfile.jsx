import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";
import lgt from "../assets/logout.png";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import change from "../assets/change.png";

// import { useNavigation } from "@react-navigation/native";

import NavBar from "../components/NavBar";

function Userprofile({ navigation }) {
  // const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser());
    dispatch(logUserOut());
    navigation.navigate("Home");
  };
  console.log("active User Profileeeeeeeeee", activeUser);
  return (
    <View style={styles.userProfilePage}>
      <View style={styles.topSection}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: activeUser?.avatar,
            }}
            style={styles.profilePic}
          />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{activeUser?.userName}</Text>
          </View>
        </View>
        <Pressable
          style={styles.editProfileContainer}
          onPress={() => navigation.navigate("editProfile")}
        >
          <Text style={styles.editProfile}>Edit Profile</Text>
        </Pressable>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.profileOptions}>
          <TouchableOpacity
            style={styles.profileOption}
            onPress={() => navigation.navigate("Bookings")}
          >
            <Image style={styles.icon} source={bkg} />
            {activeUser?.type === "client" ? (
              <Text>My bookings</Text>
            ) : (
              <Text>My Cars</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileOption}
            onPress={() => console.log("settings")}
          >
            <Image source={stg} style={styles.icon} />
            <Text>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileOption}
            onPress={() => {
              if (activeUser.type !== "client") {
                navigation.navigate("AddAgencyCar");
              } else {
                navigation.navigate("changeRole");
              }
            }}
          >
            <Image source={change} style={styles.icon} />
            {activeUser.type === "client" ? (
              <Text>Become an Agency</Text>
            ) : (
              <Text>Add Cars For Rent</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logoutBtnContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <LinearGradient
            colors={["#6C77BF", "#4485C5"]}
            locations={[0, 1]}
            style={styles.logoutBtn}
          >
            <Image source={lgt} style={styles.icon} />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <NavBar style={styles.navBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  userProfilePage: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e6e8",
    height: "15%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 10,
    gap: 10,
  },
  profilePic: {
    // paddingTop:height*0.1,
    width: width * 0.18,
    height: height * 0.085,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editProfileContainer: {
    justifyContent: "center",
  },
  editProfile: {
    fontSize: 12,
    color: "#6C77BF",
  },
  bottomSection: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileOptions: {},
  profileOption: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e6e8",
  },
  logoutBtnContainer: {
    position: "absolute",
    bottom: 70, // adjust this value as needed
    left: 20,
    width: "100%",
    borderTopColor: "#e5e6e8",
    borderTopWidth: 1,
    paddingTop: 20,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // ... rest of your styles
  },
  logoutBtn: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  logoutText: {
    color: "white",
  },
  //
  bottomSection: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileOptions: {},
  profileOption: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e6e8",
  },

  icon: {
    width: 20,
    height: 20,
  },
});
export default Userprofile;
