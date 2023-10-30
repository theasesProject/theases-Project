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
import profil from "../assets/profile.png";
import React, { useState } from "react";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";

function Userprofile({ navigation }) {
  return (
    <View style={styles.bottomSection}>
      <View style={styles.profileOptions}>
        <TouchableOpacity
          style={styles.profileOption}
          onPress={() => console.log("profile")}
        >
          <Image source={profil} style={styles.icon} />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileOption}
          onPress={() => console.log("my bookings")}
        >
          <Image style={styles.icon} source={bkg} />
          <Text>My bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileOption}
          onPress={() => console.log("settings")}
        >
          <Image source={stg} style={styles.icon} />
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userProfilePage: {
    flex: 1,
    padding: 20,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "black",
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
    borderBottomColor: "black",
  },
  logoutBtnContainer: {
    borderTopColor: "black",
    borderTopWidth: 1,
    paddingTop: 20,
  },
  logoutBtn: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
export default Userprofile;
