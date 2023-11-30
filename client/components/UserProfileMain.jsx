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
import React, { useEffect, useState } from "react";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";
import UserRentHistory from "../components/UserRentHistory.jsx";
import UserProfileSettings from "../components/UserProfileSettings.jsx";

function Userprofile({ navigation }) {
  const [view, setView] = useState("main");

  return render();
}

const styles = StyleSheet.create({});
export default Userprofile;
