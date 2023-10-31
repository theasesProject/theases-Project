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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import profil from "../assets/profile.png";
import React, { useEffect, useState } from "react";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";
import lgt from "../assets/logout.png";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import UserProfileMain from "../components/UserProfileMain.jsx";

function Userprofile({ navigation }) {
  const activeUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.userProfilePage}>
      <View style={styles.topSection}>
        <View style={styles.userInfo}>
          <Image source={activeUser?.avatar} style={styles.profilePic} />
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

      {/*  */}

      <UserProfileMain />

      {/*  */}

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
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
    bottom: 10,
    left: 20,
    width: "100%",
    borderTopColor: "#e5e6e8",
    borderTopWidth: 1,
    paddingTop: 20,
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
});
export default Userprofile;
