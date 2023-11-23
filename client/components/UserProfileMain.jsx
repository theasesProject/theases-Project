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
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function Userprofile({ navigation }) {
  const [view, setView] = useState("main");

  return render();
}

const styles = StyleSheet.create({});
export default Userprofile;
